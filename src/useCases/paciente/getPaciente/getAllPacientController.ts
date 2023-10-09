import { response } from 'express';
import { Request, Response} from 'express'
import {  getAllPacientUseCase } from './getAllPacientUseCase';
import { ProfissionalGet } from '../../../models/User';

class getAllPacientControlle {

    async handle(request: Request, response: Response){        
        const getAllPacientUserCase = new getAllPacientUseCase()

        const professional = request.user as ProfissionalGet

        const pacients = await getAllPacientUserCase.execute(professional.id)

        return response.json(pacients)
    }
}

export {getAllPacientControlle}