import { Request, Response} from "express"
import * as yup from 'yup'
import { requestResetPasswordUseCase } from "./requestResetPasswordUseCase"

class requestResetPasswordController {

    private static shema = yup.object().shape({
        email: yup.string().email().required(),
    })

    async handle(request: Request, response: Response){
        const { email } = request.body

        await  requestResetPasswordController.shema.validate({
            email,
        })

        const requesResetPassword = new requestResetPasswordUseCase()

        const emailExist = await requesResetPassword.execute({
            email
        })

        return response.json(emailExist)        
    }
}

export { requestResetPasswordController }