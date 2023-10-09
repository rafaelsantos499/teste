import { Request, Response, response } from "express";
import { createPacienteUseCase } from "./createPacienteUseCase";
import * as yup from 'yup';
import { ProfissionalGet } from "../../../models/User";

class createPacientController {

    private static schema = yup.object().shape({
        nome: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        // profissional_id: yup.string().required()
    });    

    async handle(request: Request, response: Response){

     
        const {nome , email, password} = request.body

        const professional = request.user as ProfissionalGet

        await createPacientController.schema.validate({
            nome,
            email,
            password,
          });

        const createPacientUseCase = new createPacienteUseCase()

        const paciente = await createPacientUseCase.execute({
            nome,
            email,
            password,
            profissional_id : professional.id  
        })
          

        return response.json(paciente)
    }    
}

export {createPacientController}