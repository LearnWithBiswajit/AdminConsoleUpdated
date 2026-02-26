import { dbEntities } from "src/db/entities";
import { DataSourceOptions } from "typeorm";

export const dbConfig = ():DataSourceOptions => {
    return {
        type:"mysql",
        host:process.env.DB_HOST,
        // port:Number(process.env.DB_PORT),
        // host:"10.10.85.32",
        port:Number(process.env.DB_PORT),
        username:"root",
        password:"root",
        database:"AdminConsole",
        synchronize:false,
        logging:true,
        entities:dbEntities,
        connectTimeout:1500000,
        extra:{
            connectionLimit:100,
        }
    }
}