import { client } from "../../prisma/client"
import { GenerateRefreshToken } from "../../provider/generateRefreshToken";
import { generateToken } from "../../provider/generateToken";

interface GetRefreshToken {
    refreshToken: string,
    token : string
}

class refreshTokenUseCase {
    
    async execute(refreshToken : string) {

        
        const refreshTokenExist = await client.refresh_tokens.findFirst({
            where:{
                id : refreshToken
            }
        })

        
        if(!refreshTokenExist){
            throw new Error("Refresh Token invalido.")
        }

        let pacienteId = null;
        let profissionalId  = null;
        let user;


        if(refreshTokenExist.paciente_id){
            pacienteId = refreshTokenExist.paciente_id

            const paciente = await client.paciente.findFirst({
                where : {
                    id: pacienteId
                }
            })

            user = paciente
        }

        if(refreshTokenExist.professional_id){
            profissionalId = refreshTokenExist.professional_id

            const profissional = await client.professional.findFirst({
                where : {
                    id: profissionalId
                }
            })

            user = profissional
        }

        const payload = { user }

        const dataAtualEmMilissegundos = new Date().getTime();        

        if (Number(refreshTokenExist.expire_in) < dataAtualEmMilissegundos) {

            await client.refresh_tokens.deleteMany({
                where: {
                    paciente_id: pacienteId,
                    professional_id: profissionalId
                }
            })

            throw new Error("Refresh Token Expirado.")
        } 

        const generateTokenClass = new generateToken()
        const token = await generateTokenClass.execute(payload)


        const generateRefreshTokenClass = new GenerateRefreshToken
        const newRefreshToken = await generateRefreshTokenClass.execute(pacienteId,profissionalId)

        const {password: userPassword,deleted_at : userDeleted_at ,  ...userWithoutPasswrod} = user

        await client.refresh_tokens.delete({
            where: {
                id: refreshTokenExist.id
            }
        })

        return { token, refreshToken: newRefreshToken.id , user : userWithoutPasswrod }
    }
}

export { refreshTokenUseCase }