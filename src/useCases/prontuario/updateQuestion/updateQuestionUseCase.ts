import { client } from "../../../prisma/client"
import { Prisma } from "@prisma/client"

class UpdateQuestionUseCase{

    async execute(prontuarioId: string,questionId : number,question: string,responseQuestion: string){
        
        const prontuarioExist = await client.prontuario.findFirst({
            where:{
                id: prontuarioId
            }
        })

        if(!prontuarioExist){
            throw new Error('Prontuario não encontrado')
        }

        const questionExist = await client.prontuario_question.findFirst({
            where: {
                id: questionId,
                prontuario_id : prontuarioId
            }
        })

        if(!questionExist){
            throw new Error('pergunta não encontrada')
        }        

        const dataUpdate : Prisma.prontuario_questionUpdateInput = {}

        if(question){
            dataUpdate.question = question
        }

        if(responseQuestion){
            dataUpdate.response = responseQuestion
        }

        if(Object.keys(dataUpdate).length > 0){
            const updateQuestion = await client.prontuario_question.update({
                where: {
                    id : questionId
                },
                data: dataUpdate
            })

            return {
                message : 'Pergunta atualizada com sucesso.',
                updateQuestion
            }
        }

        return {
            message : 'Nenhuma alteração necessária. Os campos fornecidos estão vazios.',
        }              
    }
}

export {UpdateQuestionUseCase}