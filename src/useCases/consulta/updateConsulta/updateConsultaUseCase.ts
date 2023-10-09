import { Prisma } from "@prisma/client"
import { client } from "../../../prisma/client"
import { profissionalExist } from "../../../utils/profissionalExist"
import * as yup from 'yup';

interface IupdateConsulta {
    appointment: Date,
    descricao : string,
    status : string,
    profissionalId : string,
    idConsulta : string
}

class updateConsultaUseCase {  

    async execute({appointment, descricao , status , profissionalId, idConsulta}){        

        const existProfissional = await  profissionalExist(profissionalId)
        
        if(status){
            const idStatus = await client.statusconsulta.findUnique({
                where: {
                    id: status
                }
            })
    
            if(!idStatus){
                throw new Error("Status inválido")
            }
        }        

        if(!existProfissional){
            throw new Error("Profissional não existe.")
        }

        const consulta = await client.consulta.findUnique({
            where: {
                id: idConsulta                
            }
        })

        if(!consulta){
            throw new Error("Consulta não existe.")
        }

        if(consulta.profissionalId != profissionalId) {
            throw new Error("Essa consulta não pertence a esse profissional.")
        }       


        // Obtém a data atual
        const currentDate = new Date();

        // Compara a data fornecida com a data atual
        if (appointment <= currentDate) {
        throw new Error("A data da consulta não pode ser menor ou igual à data atual.");
        }

        const dadosAtualizacao: Prisma.consultaUpdateInput = {}

        if(descricao){
            dadosAtualizacao.descricao = descricao
        }

        if(appointment){
            dadosAtualizacao.appointment = appointment
        }

        if(status){
            dadosAtualizacao.status = {
                connect: { id: status }
              }
            
        }

        if(Object.keys(dadosAtualizacao).length > 0){
            const updateConsulta = await client.consulta.update({
                where : {
                    id: idConsulta
                },
                include: {
                    status : true
                },
                data: dadosAtualizacao
            })

            const { status, ...formatConsulta } = updateConsulta

            return {...formatConsulta, status: updateConsulta.status.nome}
        }
        
    }
}

export { updateConsultaUseCase}