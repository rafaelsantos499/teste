import { Request, Response } from "express";
import { CreateProntuarioUseCase } from "./createProtuarioUseCase";
import { ProfissionalGet } from "../../../models/User";

class CreateProntuarioController {
    async handle(request : Request, response: Response){
        const {idPaciente} = request.body

        const professional = request.user as ProfissionalGet
        const createProntuarioUseCase = await new CreateProntuarioUseCase
        const prontuario = await createProntuarioUseCase.execute(idPaciente,professional.id)

        return response.json({
            message : 'prontuario criado com sucesso.',
            prontuario
        })
    }
}

export { CreateProntuarioController }