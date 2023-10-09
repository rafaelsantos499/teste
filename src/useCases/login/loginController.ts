import {Request, Response} from "express";
import {LoginUseCase} from "./loginUseCase";

class LoginController {

    async handle(request: Request,response:Response){
        const  {email, password} = request.body

        const login = await new LoginUseCase()
        const user = await login.execute(email,password)

        return response.status(200).json(user)
    }
}

export  { LoginController }