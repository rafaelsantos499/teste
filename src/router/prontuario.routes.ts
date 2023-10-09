import { Router } from "express";
import { CreateProntuarioController } from "../useCases/prontuario/createProtuario/createProtuarioController";
import { CreateQuestionController } from "../useCases/prontuario/createQuestion/createQuestionController";
import { UpdateQuestionController } from "../useCases/prontuario/updateQuestion/updateQuestionController";
import { DeleteQuestionController } from "../useCases/prontuario/deleteQuestion/deleteQuestionController";

const prontuarioRouter = Router()

prontuarioRouter.post('/',(request, response)=> {
    const createProntuarioController = new CreateProntuarioController
    return createProntuarioController.handle(request,response)
})

prontuarioRouter.post('/question',(request, response)=> {
    const createQuestionController = new CreateQuestionController
    return createQuestionController.handle(request,response)
})

prontuarioRouter.put('/question/update',(request, response)=> {
    const updateQuestionController = new UpdateQuestionController
    return updateQuestionController.handle(request,response)
})

prontuarioRouter.delete('/question/delete',(request, response)=> {
    const deleteQuestionController = new DeleteQuestionController
    return deleteQuestionController.handle(request,response)
})

export { prontuarioRouter }