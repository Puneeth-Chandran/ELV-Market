import express from 'express';
import dotenv from 'dotenv'
const app = express();
import { connectDatabase } from './config/dbConnect.js';
import errorMiddleware from './middlewares/errors.js';
import cookieParser from 'cookie-parser';

//Handle Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err}`);
    console.log(`Stack: ${err.stack}`);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
});


dotenv.config({path: 'backend/config/config.env'});

//Connecting to database
connectDatabase()

app.use(express.json());

app.use(cookieParser());

//import all routes
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";

app.use("/api/v1",productRoutes);
app.use("/api/v1",authRoutes);  

//Middleware for errors
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

//Handle unhandled promise rejections.
process.on("unhandledRejection", (err, promise) => {
    console.log(`ERROR: ${err}`);
    console.log(`Stack: ${err.stack}`);
    console.log("Shutting donw server due to Unhandled Promise Rejection");
    server.close(()=>{
        process.exit(1);
    })
});

