import { client } from "../prisma/client";
import { Prisma, professional } from "@prisma/client"

async function profissionalExist(id : string) : Promise<professional | null>{   
    const  profissionalExist = await client.professional.findUnique({
        where: {
            id: id
        }
    })    

    return profissionalExist
}

export { profissionalExist }