import {ProfissionalGet} from "../../models/User";
import {client} from "../../prisma/client";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";
import { GenerateRefreshToken } from "../../provider/generateRefreshToken";

type ProfissionalGetWithoutPassword = Omit<ProfissionalGet, 'password'>;

type ProfissionalGetWithoutPasswordAndToken = {
    user: ProfissionalGetWithoutPassword,
    refreshToken: string
    token: string;
};
class LoginUseCase {

    async execute(email : string,password: string) : Promise<ProfissionalGetWithoutPasswordAndToken>{

        const [professional, paciente] = await Promise.all([
            client.paciente.findUnique({
              where: {
                email: email,
              },
            }),
            client.professional.findUnique({
              where: {
                email: email,
              },
            }),
        ]);

        const user = professional ?? paciente       

        if (!professional && !paciente) {
            throw new Error('User not found'); // Nenhum usuário encontrado
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('User or password incorrect');
        }

        let pacienteId = null
        let profissionalId = null

        if(paciente){
            pacienteId = paciente.id
        }

        if(professional){
            profissionalId = professional.id
        }        

        const {password: userPassword, ...userWithoutPasswrod} = user

        const token = sign(userWithoutPasswrod, process.env.SECRET_KEY, {
            expiresIn: '999999s'
        });

        const generateRefreshToken = await  new GenerateRefreshToken()
        const refreshToken = await generateRefreshToken.execute(pacienteId,profissionalId)

        return { token , refreshToken : refreshToken.id  ,user : userWithoutPasswrod };
    }
}

export  { LoginUseCase }