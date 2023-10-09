import { Request, Response } from "express";
import { updateConsultaUseCase } from "../../consulta/updateConsulta/updateConsultaUseCase";
import { UpdateQuestionUseCase } from "./updateQuestionUseCase";

class UpdateQuestionController{

    async handle(request : Request,response : Response){
        const {prontuarioId,questionId,question, responseQuestion} = request.body

        try{
            const updateQuestionUseCase = await new UpdateQuestionUseCase
            const newQuestion = await updateQuestionUseCase.execute(prontuarioId,questionId,question,responseQuestion)
            return response.json(newQuestion)
        }catch (error){
            return response.status(400).json({ error: error.message })
        }       
    }
}

export { UpdateQuestionController }