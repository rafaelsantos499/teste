import { Request , Response } from "express";
import { client } from "../../prisma/client";
import { verify } from "jsonwebtoken";
import { ProfissionalGet } from "../../models/User";
import { MeUseCase } from "./meUseCase";

class MeController {
    async handle(request : Request , response : Response){
        const authHeader = request.headers.authorization;
        
        if (!authHeader) {
            return response.status(401).json({message: 'Token n�o fornecido.'});
        }

        const [, token] = authHeader.split(' ');
        const meUseCase = await new MeUseCase()

        const user = await meUseCase.execute(token)

        return response.status(200).json(user);
    }
}

export { MeController }