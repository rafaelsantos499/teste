import { hash } from "bcryptjs";
import { client } from "../../../prisma/client"
import { pacientExist } from '../../../utils/pacientExist';
import { profissionalExist } from '../../../utils/profissionalExist';

interface IresetPassword{
    token : string,
    password: string,
}

class resetPasswordUseCase {

    async execute({ token , password } : IresetPassword ){

        const existToken = await client.reset_password_professional.findFirst({
            where: {
                token: token,
            },
        });
        
        if (!existToken) {
            throw new Error("Invalid token.");
        }
        
        if (existToken.used) {
            throw new Error("Token already used.");
        }
        
        const today = new Date().getTime();
        
        if (existToken.expiration_data && Number(existToken.expiration_data) < today) {
            throw new Error("Expired token");
        }
        
        let pacienteId = null;
        let professionalId = null;
        
        //verifica de quem e o token 
        if (existToken.pacienteId) {
            pacienteId = existToken.pacienteId;
        } else if (existToken.professionalId) {
            professionalId = existToken.professionalId;
        } else {
            throw new Error("Usuario não existe na base de dados.");
        }
        
        const hashedPassword = await hash(password, 8);
        
        if (professionalId) {
            await client.professional.update({
                where: {
                    id: professionalId,
                },
                data: {
                    password: hashedPassword,
                },
            });
        } else if (pacienteId) {
            await client.paciente.update({
                where: {
                    id: pacienteId,
                },
                data: {
                    password: hashedPassword,
                },
            });
        }
        
        await client.reset_password_professional.update({
            where: {
                id: existToken.id,
            },
            data: {
                used: true,
            },
        });
        
        return {
            message: 'Successfully changed password',
        };
    }
} 

export { resetPasswordUseCase }