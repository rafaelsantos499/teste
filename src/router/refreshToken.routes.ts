import { Router } from "express";
import { refreshTokenController } from "../useCases/refreshToken/refreshTokenController";

const refreshToken = Router()

refreshToken.post('/',(request, response)=> {
   const refreshToken = new refreshTokenController()
   return refreshToken.handle(request,response)
})

export {refreshToken}