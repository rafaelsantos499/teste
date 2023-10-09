import { Request, Response, response } from "express";
import { client } from "../../../prisma/client";
import { profissionalExist } from "../../../utils/profissionalExist";


class getAllConsultaUseCase {

   async execute(idProfissional){

    const exist = await profissionalExist(idProfissional)

    if(!exist) {
        throw new Error('Profisional não existe')
    }

    const consultas = await client.consulta.findMany({
      where: {
        profissionalId: idProfissional,
      },
      select: {
        id: true,
        descricao: true,
        created_at: true,
        updated_at: true,
        appointment: true,
        paciente: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
        profissional: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
        status: {
          select: {
            nome: true,
          },
        },
      },
    });

    const consultaFormat = consultas.map(consulta => {

      return {
         ...consulta,
         status : consulta.status.nome
      }
    })

    if(consultas.length == 0){
        throw new Error("Sem  consultas")
    }

    return consultaFormat
   }
}

export { getAllConsultaUseCase}