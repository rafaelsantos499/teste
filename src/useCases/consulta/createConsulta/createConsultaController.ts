import { Request, Response, response } from "express";
import { createConsultaUseCase } from "./createConsultaUseCase";
import * as yup from 'yup'
import { ProfissionalGet } from "../../../models/User";



class createConsultaController {

    private static schema = yup.object().shape({
        descricao: yup.string(),
        pacienteId: yup.string().required(),
        // profissionalId: yup.string().required(),
    })

    async handle(request: Request, response: Response){
        const {descricao ,  pacienteId } = request.body

        await createConsultaController.schema.validate({           
            descricao,
            pacienteId,
        })

        const professional = request.user as ProfissionalGet
        
        const createdConsulta = new createConsultaUseCase()

        const consulte = await createdConsulta.execute(           
            descricao,
            pacienteId,
            professional.id
        )

        return response.json(consulte)
    }
}

export { createConsultaController }