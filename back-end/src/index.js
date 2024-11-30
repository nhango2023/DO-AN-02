import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./configs/Cors";
require('dotenv').config();
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

configCors(app);

configViewEngine(app);

initWebRoutes(app);

initApiRoutes(app);



app.listen(PORT, () => {
    console.log("backend is listening in port ", PORT);
})
