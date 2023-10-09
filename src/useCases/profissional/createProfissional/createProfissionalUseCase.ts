import { client } from "../../../prisma/client"
import { sendEmail } from "../../../utils/nodeMailer/nodeMailer";
import { htmlWelcome } from "../../../utils/nodeMailer/templatesEmail";

interface IprofissionalRequest {
    nome: string,
    email: string,
    password: string
}

class  createProfissionalUseCase {

    async execute({nome,email,password} : IprofissionalRequest) {
        
       
            const proficionalExist = await client.professional.findUnique({
                where:{
                    email
                }
            })

    
            if (proficionalExist) {
                throw new Error("Profissional já existe");
            }
    
            const profissional = await client.professional.create({
                data:{
                    nome,
                    email,
                    password,
                    role : 'P'
                }
            })

            await sendEmail({
                destinatario: email,
                assunto: 'Bem vindo a nossa plataforma.',
                html: htmlWelcome(nome)
            })
    
            return profissional
        
    }
}

export {createProfissionalUseCase}