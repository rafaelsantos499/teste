import {TokenExpiredError, verify} from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
import { profissionalExist } from "../utils/profissionalExist";
import { pacientExist } from "../utils/pacientExist";



function authMiddleware(requiredRole: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response.status(401).json({message: 'Token n�o fornecido.'});
        }

        const [, token] = authHeader.split(' ');

        try {
            const decoded: any = verify(token, process.env.SECRET_KEY);

            const profissional = await profissionalExist(decoded.id)
            const paciente = await pacientExist(decoded.id)
            console.log('profissional',paciente)
            const user = profissional ?? paciente
            
            request.user = decoded;

            if (!requiredRole.includes(user.role)) {
                return response.status(403).json({message: 'Acesso n�o autorizado.'});
            }

            next();

        } catch (err) {
            if (err instanceof TokenExpiredError) {
                return response.status(401).json({ message: 'Token expirado.' });
            }

            return response.status(401).json({ message: 'Token inv�lido.' });
        }
    };
}

export {authMiddleware}