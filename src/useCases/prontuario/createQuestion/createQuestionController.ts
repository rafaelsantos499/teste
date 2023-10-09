import { Request, Response } from "express";
import { CreateQuestionUseCase } from "./createQuestionUseCase";
import { ProfissionalGet } from "../../../models/User";

class CreateQuestionController {
    async handle(request : Request, response : Response){
        const {  prontuarioId ,question, responseQuestion} = request.body

        const createQuestionUseCase = new CreateQuestionUseCase
        const createdQuestion = await createQuestionUseCase.execute(prontuarioId,question,responseQuestion) 
        
        return response.json(createdQuestion)
    }
}

export {CreateQuestionController}