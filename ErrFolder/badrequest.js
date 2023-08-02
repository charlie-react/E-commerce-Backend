const SelfApiError = require("./custom-api")
const {StatusCodes} = require("http-status-codes")

class BadRequest extends SelfApiError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequest