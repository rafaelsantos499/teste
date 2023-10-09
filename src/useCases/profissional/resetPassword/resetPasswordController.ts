import { Request,Response} from "express"
import * as yup from 'yup'
import { resetPasswordUseCase } from "./resetPasswordUseCase"

class resetPasswordController {
    private static shema = yup.object().shape({
        token : yup.string().required(),
        password: yup.string().min(6).matches(/[A-Z]/,'must contain a capital letter').required()
    })

    async handle(request: Request, response: Response){
        const { token , password } = request.body

        await resetPasswordController.shema.validate({
            token,
            password
        })

        const resetPassword = new resetPasswordUseCase()

        const passwordResset = await resetPassword.execute({
            token,
            password
        })
        return response.json(passwordResset)
    }
}

export { resetPasswordController}