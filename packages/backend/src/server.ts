import {useExpressServer} from 'routing-controllers';
import 'reflect-metadata';
import express from 'express';

import sequelizeConnection from "./sequelize";
import responseTime from "response-time";
import helmet from 'helmet';
import bodyParser from "body-parser";


const app = express();

app.use(express.json({limit: '50mb'})); // Setting body size limit
app.use(responseTime());

// Body Parser
app.use(bodyParser.json());

// Helmet
app.use(helmet.hidePoweredBy());


useExpressServer(app, {
    cors: true,
    controllers: [__dirname + "/routes/controllers/*.ts"],
    middlewares: [__dirname + "/routes/middlewares/*.ts"],
    interceptors: [__dirname + "/routes/interceptors/*.ts"]
});

const PORT = 3500;


app.use(bodyParser.json());

sequelizeConnection.authenticate().then(() => {
    console.debug('Sequelize connection has been established successfully.')
}).catch((error) => {
    console.error("Unable to connect to the database:", error)
})

sequelizeConnection.sync().then(() => {
    console.debug("Synced")
}).catch((error) => {
    console.error("Unable to sync");
})

app.listen(PORT, () => {
    console.info(`Server is running on http://localhost:${PORT}`);
})
