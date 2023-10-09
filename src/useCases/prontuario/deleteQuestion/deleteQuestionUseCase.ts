import { client } from "../../../prisma/client";

class DeleteQuestionUseCase {
    async execute(prontuarioId : string ,questionId : number){
        const prontuario = await client.prontuario.findUnique({
            where: {
              id: prontuarioId,
            }            
          });
    
        if (!prontuario) {
            return {
                status: 404,
                message: 'Prontuário não encontrado',
            };
        }
        
        const existQuestion = await client.prontuario_question.findFirst({
            where: {
                id: questionId,
                prontuario_id: prontuarioId,
            }
        })

        if (!existQuestion) {
            return {
                status: 404,
                message: 'Pergunta não encontrada na base de dados',
            };
        }

        await client.prontuario_question.delete({
            where: {
                id: questionId
            }
        })

        return {
            status: 200,
            message: 'Pergunta apagada com sucesso',
        };
        
    }
}

export { DeleteQuestionUseCase }