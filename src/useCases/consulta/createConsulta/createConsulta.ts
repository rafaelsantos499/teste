import { client } from "../../../prisma/client"


async function criarConsulta(descricao: string, pacienteId: string, profissionalId: string) {
  try {
   
    const consulta = await client.consulta.create({
      data: {
        descricao: descricao,
        statusId: '1',
        pacienteId: pacienteId, // Converta pacienteId para um número
        profissionalId: profissionalId
      },
      include: {
              status: true // Inclui as informações do status na resposta
            }
    }); 

    const { statusId, ...consultaSemStatusId } = consulta; // Remove o campo statusId

    return {
      ...consultaSemStatusId,
      status: consulta.status.nome // Inclui o nome do status no retorno
    };

  } catch (error) {
    console.error('Erro ao criar consulta:', error);
  }
}

export { criarConsulta }
