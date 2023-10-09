import { verify } from "jsonwebtoken";
import { client } from "../../prisma/client";
import { PacienteGet, ProfissionalGet } from "../../models/User";

type ProfissionalGetWithoutPassword = Omit<ProfissionalGet, 'password' | 'deleted_at'>;
type PacienteGetWithoutPassword = Omit<PacienteGet, 'password' | 'deleted_at'>;


class MeUseCase{
    async execute(token : string) : Promise<ProfissionalGetWithoutPassword | PacienteGetWithoutPassword>{        

        const decoded: any = verify(token, process.env.SECRET_KEY);        
        const [paciente, proffessional] = await Promise.all([
            client.paciente.findUnique({
              where: {
                id: decoded.id,
              },
            }),
            client.professional.findUnique({
              where: {
                id: decoded.id,
              },
            }),
          ]);
          
          if(!paciente && !proffessional){
            throw new Error('Usuario não existe.')
          }

          const {password ,deleted_at, ...user } = paciente ?? proffessional 

          return  user 

    }
}

export { MeUseCase }