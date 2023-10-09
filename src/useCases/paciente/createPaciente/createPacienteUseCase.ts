import { Prisma } from "@prisma/client"
import { client } from "../../../prisma/client"
import { compare, hash } from 'bcryptjs';

interface IpacienteRequest {
    nome: string,
    email: string,
    password: string
    profissional_id : string
}

class createPacienteUseCase {

    async execute({nome,email,password,profissional_id} : IpacienteRequest){

        const pacientExist = await client.paciente.findFirst({
            where:{
                email
            }
        })        

        if(pacientExist){
            throw new Error("existe")
        }

        const hashedPassword = await hash(password, 8);

        await client.paciente.create({
            data:{
                nome,
                email,
                password : hashedPassword,
                role: 'C'
            }
        })

        const datePacient = await client.paciente.findFirst({
            where:{
                email
            }
        })

         await client.professionalpaciente.create({
            data: {
              profissionalId: profissional_id,
              pacienteId: datePacient.id,
            },
          });

        return datePacient
    }
}

export {createPacienteUseCase}