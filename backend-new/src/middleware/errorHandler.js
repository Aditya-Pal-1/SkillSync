export const errorHandler = (err, req, res, next) => {
    // console.log(err.stack);
    let statusCode = res.statusCode || 500;
    let message = err.message || "Internal server error";
    if(message == "ValidationError"){
        statusCode = 400;
        message = "Bad request Validation Error" + err.message;
    }
    if(message == "CastError"){
        statusCode = 400;
        message = "Bad request Cast Error" + err.message;
    }
    res.status(statusCode).json({
        success : false,
        error : message,
        stack : process.env.ENVIRONMENT === "production" ? null : err.stack
    });
}
