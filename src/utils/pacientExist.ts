import { client } from "../prisma/client";
import { Prisma, professional } from "@prisma/client"

async function pacientExist(id : string) {   
    const  pacientExist = await client.paciente.findUnique({
        where: {
            id: id
        }
    })    

    return pacientExist
}

export { pacientExist }