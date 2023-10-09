import { Request, Response } from "express";
import { DeleteQuestionUseCase } from "./deleteQuestionUseCase";

class DeleteQuestionController {
    async handle(request : Request, response : Response){
        const {prontuarioId,questionId} = request.body
       
        const deleteQuestionUseCase = await new DeleteQuestionUseCase
        const responseDeleteUseCase = await deleteQuestionUseCase.execute(prontuarioId,questionId)

        if (responseDeleteUseCase.status === 200) {
            return response.json(responseDeleteUseCase);
        } else {
            return response.status(responseDeleteUseCase.status).json({
                error: responseDeleteUseCase.message,
            });
        }     
    }
}

export { DeleteQuestionController }