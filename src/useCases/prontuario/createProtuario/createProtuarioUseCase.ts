import { client } from "../../../prisma/client";

class CreateProntuarioUseCase {
    async execute(idPaciente : string , idProfissional : string){

        const existPaciente = await client.paciente.findFirst({
          where: {
            id: idPaciente
          }
        })

        if(!existPaciente){
          throw new Error('paciente não encontrado.')
        }

        const pacientAndProfissional = client.professionalpaciente.findFirst({
          where: {
            pacienteId: idPaciente,
            profissionalId: idProfissional
          }
        })

        if(!pacientAndProfissional){
          throw new Error('paciente não pertence ao Profissional.')
        }

        const existProntuario = await client.prontuario.findFirst({
            where: {
                paciente_Id : idPaciente
            }
        })

        if(existProntuario){
            throw new Error('já existe prontuario para esse paciente.')
        }

        const prontuario = await client.prontuario.create({
            data: {
              paciente: {
                connect: { id: idPaciente },
              },              
            },
            include: {            
              paciente: true,
            },
          });

          return prontuario
    }
}

export { CreateProntuarioUseCase }