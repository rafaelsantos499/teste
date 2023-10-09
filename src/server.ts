import "express-async-errors"
import express, { NextFunction, Request, Response } from "express"
import { router } from "./router"
import passport from "passport";
const app = express();

require('./useCases/login/google/auth');
app.use(express.json())

app.use(router)

passport.serializeUser((user : any, done) => {
    done(null, user.id);
});

// Deserialize o usu�rio a partir do ID para verificar o token JWT
passport.deserializeUser((id, done) => {
    done(null, { id });
});


app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
      return response.status(500).json({
        status: "Error",
        message: error.message,
      })
    }
  );
app.listen(21071, () => console.log("Serve is running on port 3000"))