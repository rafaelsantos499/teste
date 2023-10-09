import { Request, Response } from "express";
import { refreshTokenUseCase } from "./refreshTokenUseCase";

class refreshTokenController {
    async handle(request : Request, response : Response){
        const { refreshToken } = request.body

        const refreshTokenClass = new refreshTokenUseCase()
        const newToken = await refreshTokenClass.execute(refreshToken)

        return response.json(newToken)
    }
}

export { refreshTokenController }