"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const entities_1 = require("../db/entities");
const dbConfig = () => {
    return {
        type: "mysql",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: "root",
        password: "root",
        database: "AdminConsole",
        synchronize: false,
        logging: true,
        entities: entities_1.dbEntities,
        connectTimeout: 1500000,
        extra: {
            connectionLimit: 100,
        }
    };
};
exports.dbConfig = dbConfig;
//# sourceMappingURL=db.config.js.map