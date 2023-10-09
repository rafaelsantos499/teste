import { Request,Response } from 'express'
import { updateConsultaUseCase } from './updateConsultaUseCase'
import  *  as yup from 'yup'
import { ProfissionalGet } from '../../../models/User'

class updateConsultaController {

  
    private static schema = yup.object().shape({
        appointment: yup.date(),
        descricao: yup.string(),
        status: yup.string(),
        // profissionalId: yup.string().required(),
        idConsulta: yup.string().required(),
    })

    async handle(request: Request, response: Response){
        const {appointment,status , descricao , idConsulta} = request.body

        await updateConsultaController.schema.validate({
            appointment,
            status,
            descricao,
            idConsulta,            
        })
        
        const professional = request.user as ProfissionalGet

        const updateConsulta = new updateConsultaUseCase()

        const consulta = await updateConsulta.execute(
            {  appointment,
                status,
                descricao,
                idConsulta,
                profissionalId : professional.id
            }
        )

        return response.json({
            'messagem' : 'Atualizado com sucesso',
            'consulta' : consulta
        })
    }
}

export { updateConsultaController }