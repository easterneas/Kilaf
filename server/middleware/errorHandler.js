
const errorHandler = (err, req, res, next) => {
    let { code, name, message, errors } = err
    console.log(err, 'dari error handler')
    if (code) {
        message = [message]
    } else {
        code = 500
        message = []

        switch(name){
            case 'SequelizeValidationError':
                code = 400
            case 'SequelizeUniqueConstraintError':
                code = 400
                errors.forEach(err => message.push(`${err.type}: ${err.message}`))
                break
            case 'JsonWebTokenError':
            default:
                message.push("Whoops, something happened on our end!")
                break
        }
    }
    res.status(code).json(message)
}

module.exports = { errorHandler }