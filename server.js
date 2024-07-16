import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './configs/dbConfig.js'
import router from './routes/routes.js'
import pkg from 'body-parser';

const { urlencoded } = pkg;
const app = express()
dotenv.config();
app.use(cors());
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use("/api", router)

const PORT = process.env.PORT 
const MONGO_URI = process.env.MONGO_URI

const start = async () => {
    try {
        await connectDB(MONGO_URI)
        console.log("Conectado a MongoDB");
        app.listen(PORT, ()=>{
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
};

start();