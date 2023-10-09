import * as crypto from 'crypto';
import { client } from "../prisma/client";

interface RefreshToken {
    id: string,
    token: string,
    paciente_id: string | null,
    professional_id: string | null,
    expire_in : string
}

class GenerateRefreshToken {   

    async generateRandomHash(length) {
        const randomBytes = crypto.randomBytes(length);
        return randomBytes.toString('hex');
    }
    async execute(pacienteId: string | null , professionalId : string | null) : Promise<RefreshToken> {
      

        const today = new Date();
        const oneWeekLater = today.getTime() + 7 * 24 * 60 * 60 * 1000;
        // const oneWeekLater = today.getTime() + 20 * 1000;

        const hash = await this.generateRandomHash(36)
        console.log(hash)
        
        const generateRefreshToken = await client.refresh_tokens.create({
            data:{
                token: hash,
                paciente_id: pacienteId,
                professional_id: professionalId,
                expire_in : oneWeekLater.toString()
            }
        })

        return generateRefreshToken
       
    }
}


export  {GenerateRefreshToken }