import {StatusCodes} from 'http-status-codes'

const errorHandlerMidleware = (err,req, res, next) => {
    const defautError = {
        statusCode:  err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later'
    }
    if(err.name === 'ValidationError'){
        defautError.statusCode = StatusCodes.BAD_REQUEST
        defautError.msg = Object.values(err.errors).map((item) => item.message).join(',')
    }
    if(err.code && err.code === 11000){
        defautError.statusCode = StatusCodes.BAD_REQUEST
        defautError.msg = `${Object.keys(err.keyValue)} field has to be unique`

    }
    res.status(defautError.statusCode).json({msg: defautError.msg})

}

export default errorHandlerMidleware