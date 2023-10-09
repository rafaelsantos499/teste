import { client } from "../../../prisma/client"
import {  hash } from 'bcryptjs';
import { sendEmail } from "../../../utils/nodeMailer/nodeMailer";
import { htmlResetPassword } from "../../../utils/nodeMailer/templatesEmail";
import * as crypto from 'crypto';

interface IrequestResetPassword{
    email: string,
}

class requestResetPasswordUseCase {

    async generateRandomHash(length) {
        const randomBytes = crypto.randomBytes(length);
        return randomBytes.toString('hex');
    }

    async execute({ email} : IrequestResetPassword){

        //logica para usuario mudar apenas duas vezes por dia

        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

        const numberOfResetsToday = await client.reset_password_professional.count({
            where: {
                created_at: {
                    gte: startOfDay,
                    lt: endOfDay,
                },
            },
        });

        if (numberOfResetsToday > 2) {
            throw new Error("Limite diário de redefinição de senhas excedido.");
          }
        
        const professional = await client.professional.findFirst({
            where: {
                email : email
            }
        })

        const paciente = await client.paciente.findFirst({
            where: {
                email : email
            }
        })

        if(!professional && !paciente){
            throw new Error('Não encontramos na nossa base de dados.')
        }

        let pacienteId = null
        let proficionalId = null

        if(professional){
            proficionalId = professional.id
        }else if(paciente){
            pacienteId = paciente.id
        }       

        const existTokenResetPassoword = await client.reset_password_professional.findFirst({
            where: {
                professionalId : proficionalId,
                pacienteId : pacienteId
            },
            orderBy:{
                created_at: 'desc'
            },
            take: 1
        })

        const today = new Date().getTime();
        
        //se existe token e se ja foi usado
        if(existTokenResetPassoword && !existTokenResetPassoword.used){
            
            if(!(today > Number(existTokenResetPassoword.expiration_data))){
                throw new Error('Link de redefinição em andamento.')
            }
        }        
        
        const token = await  this.generateRandomHash(36)
        const oneMinuteLater = new Date().getTime() + 60 * 1000; // um minuto a validade do token

         await client.reset_password_professional.create({
            data:{
                token: token,
                expiration_data: oneMinuteLater.toString(),
                professionalId: proficionalId ,
                pacienteId: pacienteId 
            }
        })   
             
       await sendEmail({
        destinatario: email,
        assunto: 'Requimento de recupereção de email',
        html: htmlResetPassword(token),
       })        

        return {
            "messagem" : 'O email de redefinição foi enviado com sucesso.',
            "email" : email,
        }
    }
}

export { requestResetPasswordUseCase }