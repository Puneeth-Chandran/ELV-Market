import { Error } from "mongoose";
import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
    let error ={
        statusCode: err?.statusCode || 500,
        message: err?.message || "Internal Server Error",

    };

    //Handle invalid mongoose ID errors.
    if(err.name==='CastError'){
        const message = `Resource not found. Invalid: ${err?.path}`
        error = new ErrorHandler(message,400)
    }

    //Handle validation errors.
    if(err.name==='ValidationError'){
        const message = Object.values(err.errors).map((value)=> value.message);
        error = new ErrorHandler(message,400)
    }

    //Handle Mongoose Duplicate Key Error
    if(err.code===11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
        error = new ErrorHandler(message, 400);
    }

    //Handle Wrong JWT Error
    if(err.name==='JsonWebTokenError'){
        const message = 'Your token is invalid. Please log in again.';
        error = new ErrorHandler(message, 400);
    }

    //Handle Expired JWT Error
    if(err.name==='JsonWebTokenError'){
        const message = 'Your token is expired. Please try again.';
        error = new ErrorHandler(message,400);
    }

    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(error.statusCode).json({
            message:error.message,
            error:err,
            stack:err?.stack,
        });
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        res.status(error.statusCode).json({
            message:error.message
        });
    }

    
};

