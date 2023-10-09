import { Request, Response, response } from "express";
import { getAllConsultaUseCase } from "./getAllConsultaUseCase";
import { ProfissionalGet } from "../../../models/User";


class getAllConsultaProfissionalController {

    async handle(request : Request, response: Response){

        const getConsultas = new getAllConsultaUseCase()

        const professional = request.user as ProfissionalGet

        const consultas = await getConsultas.execute(professional.id)
        
        return response.json(consultas)
    }
}

export { getAllConsultaProfissionalController }