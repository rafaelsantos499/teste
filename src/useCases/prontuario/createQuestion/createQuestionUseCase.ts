import { client } from "../../../prisma/client"

class CreateQuestionUseCase {
    async execute(prontuarioId : string ,question : string ,responseQuestion : string){
      
        const prontuario = await client.prontuario.findUnique({
            where: {
              id: prontuarioId,
            },
          });
    
          if (!prontuario) {
            throw new Error('Prontuário não encontrado');
          }
    
          // Agora, crie a nova pergunta associada ao prontuário
          const createdQuestion = await client.prontuario_question.create({
            data: {
                question: question,
                response: responseQuestion,
                input: 'Texto', // Defina o tipo de entrada conforme necessário
                prontuario: {
                  connect: {
                    id: prontuarioId, // Conecte a pergunta ao prontuário existente
                  },
                },
              },
          });
    
          return createdQuestion;
    }
}

export { CreateQuestionUseCase }