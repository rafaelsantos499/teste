import { PacienteGet } from "../../../models/User";
import { client } from "../../../prisma/client";


type PacienteOmitPassowrd = Omit<PacienteGet, 'password' | 'deleted_at'>
class getAllPacientUseCase {

    async execute(idProfissional : string) : Promise<PacienteOmitPassowrd[]>{

        const profissionalId = idProfissional;
        const proficionalExist = await client.professional.findFirst({
            where:{
                id: profissionalId
            }
        })

        
        if(!proficionalExist){
            throw new Error("Esse Profissional não existe")
          }
          
          const pacientesDoProfissional = await client.professionalpaciente.findMany({
            where: { profissionalId },
            include: {
              paciente: {
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    role: true,
                    created_at: true,
                    updated_at: true,
                  },
              } 
            },
            
          });

          const pacientes = pacientesDoProfissional.map(relacionamento => relacionamento.paciente)
          
          return pacientes
    }
}

export {getAllPacientUseCase}