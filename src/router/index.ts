import { Router } from "express";
import { createPacientController } from "../useCases/paciente/createPaciente/createPacientController";
import { createdProfissionalController } from "../useCases/profissional/createProfissional/createdProfissionalController";
import { getAllPacientControlle } from "../useCases/paciente/getPaciente/getAllPacientController";
import { createConsultaController } from "../useCases/consulta/createConsulta/createConsultaController";
import { getAllConsultaProfissionalController } from "../useCases/consulta/getConsulta/getAllConsultaProfissionalController";
import { updateConsultaController } from "../useCases/consulta/updateConsulta/updateConsultaController";
import { resetPasswordController } from "../useCases/profissional/resetPassword/resetPasswordController";
import { requestResetPasswordController } from "../useCases/profissional/resetPassword/requestResetPasswordControlle";
import {LoginUseCase} from "../useCases/login/loginUseCase";
import {LoginController} from "../useCases/login/loginController";
import {loginRoutes} from "./login.routes";
import { authMiddleware } from "../middlewares/authMiddelewares";
import { refreshToken } from "./refreshToken.routes";
import { MeController } from "../useCases/me/meControlller";
import { prontuarioRouter } from "./prontuario.routes";

const router = Router()

const createdPacientControle = new createPacientController()
const createdProfissional = new createdProfissionalController()
const getAllpacientController = new getAllPacientControlle()
const createdConsulta = new createConsultaController()
const getAllconsultaProfissional = new getAllConsultaProfissionalController()
const updateConsulta = new updateConsultaController()
const requestResetPassword = new requestResetPasswordController()
const resetPasswordProfissional = new resetPasswordController()
const meController = new MeController()

router.use('/login', loginRoutes)
router.use('/refreshToken', refreshToken)
router.get('/me', meController.handle)

// router.post('/users', createUserController.handle)
router.post('/profissional', createdProfissional.handle)
router.post('/profissional/request_reset_password', requestResetPassword.handle)
router.post('/profissional/reset_password', resetPasswordProfissional.handle)

router.use(authMiddleware(['P']))
router.use('/prontuario', prontuarioRouter)
router.post('/paciente', createdPacientControle.handle)
router.get('/profissional/pacientes', getAllpacientController.handle)
router.post('/consulta/profissional/nova-consulta', createdConsulta.handle)
router.get('/consulta/profissional/consultas', getAllconsultaProfissional.handle)
router.post('/consulta/profissional/update', updateConsulta.handle)


export { router}