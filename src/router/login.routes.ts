import {Router} from "express";
import {LoginController} from "../useCases/login/loginController";
import {LogginGoogleController} from "../useCases/login/google/LogginGoogleController";
import passport from "passport";

const loginRoutes = Router()

loginRoutes.post('/',(request, response)=> {
    const loginController = new LoginController()
    return loginController.handle(request,response)
})

loginRoutes.post('/google',(request, response) => {
    const loginGoogleController = new LogginGoogleController()
    return loginGoogleController.handle(request,response)
})

// Rota para autenticar com o Google
loginRoutes.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Rota de retorno ap�s autentica��o com o Google
loginRoutes.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    // Ap�s a autentica��o bem-sucedida, gere um token JWT
    // const token = jwt.sign({ id: req.user.id }, jwtSecret, { expiresIn: '1h' });
    res.json('teste');
})


export  {loginRoutes}