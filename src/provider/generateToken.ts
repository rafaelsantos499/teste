import { sign } from "jsonwebtoken";

class generateToken {
    async execute(payload){

        const token = sign(payload, process.env.SECRET_KEY, {
            expiresIn: '999999s'
        });

        return token
    }

}

export { generateToken }