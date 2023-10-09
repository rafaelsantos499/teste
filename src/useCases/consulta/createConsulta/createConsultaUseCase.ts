import { client } from "../../../prisma/client"
import { criarConsulta } from "./createConsulta"
class createConsultaUseCase {
    
    async execute(descricao : string,pacienteId : string,profissionalId : string){       
        try {
            const [pacienteExist, proffessionalExist] = await Promise.all([
              client.paciente.findUnique({
                where: {
                  id: pacienteId,
                },
              }),
              client.professional.findUnique({
                where: {
                  id: profissionalId,
                },
              }),
            ]);
        
            if (!pacienteExist || !proffessionalExist) {
              throw new Error('Profissional ou Paciente não existe');
            }
        
            const PacienteProfissional = await client.professionalpaciente.findFirst({
              where: {
                pacienteId: pacienteId,
                profissionalId: profissionalId,
              },
            });
        
            if (!PacienteProfissional) {
              throw new Error('Relacionamento entre paciente e profissional não existe.');
            }
        
            const consulta = await criarConsulta(descricao, pacienteId, profissionalId);
        
            return consulta;
          } catch (error) {
            // Tratar erros aqui
            throw error;
          }
    }
    
}

export { createConsultaUseCase }