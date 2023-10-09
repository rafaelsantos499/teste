import {Response, Request} from "express";

class LogginGoogleController {
    async handle(request: Request, response: Response) {
            return response.json('teste')

    }
}

export {LogginGoogleController}