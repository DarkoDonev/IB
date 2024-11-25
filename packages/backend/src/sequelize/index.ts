import {Sequelize} from "sequelize-typescript";
import User from "./models/User";


const sequelizeConnection = new Sequelize({
    dialect: 'mysql',
    database: 'ib',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Darko123',
    models: [
        User
    ],
    dialectOptions: {
        connectTimeout: 15000
    },
    pool: {
        max: 30,
        min: 0,
        idle: 200000,
        // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
        acquire: 30000,
    },
    query: {
        logging: false,
    },
    logging: false,
});

export default sequelizeConnection;
