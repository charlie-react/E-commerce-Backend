const SelfApiError = require("./custom-api")
const {StatusCodes} = require("http-status-codes")

class Unauthenticated extends SelfApiError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = Unauthenticated