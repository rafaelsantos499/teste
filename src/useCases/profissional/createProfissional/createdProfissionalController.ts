import { Request, Response } from "express";
import { compare, hash } from 'bcryptjs';
import { createProfissionalUseCase } from "./createProfissionalUseCase";
import * as yup from 'yup';
class createdProfissionalController {

    private static schema = yup.object().shape({
        nome: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
    })

    async handle(request: Request, response: Response){

        const {nome, email, password} = request.body

        await createdProfissionalController.schema.validate({
            nome,
            email,
            password
        })
        
        const profissinal = new createProfissionalUseCase()

        const hashedPassword = await hash(password, 8);

        const user = await profissinal.execute({
            nome,
            email,
            password : hashedPassword
        })

        // Gerar hash da senha

        return response.json(user)
    }
}

export {createdProfissionalController}