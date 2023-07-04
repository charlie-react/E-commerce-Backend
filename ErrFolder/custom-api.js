class SelfApiError extends Error{
    constructor(message){
        super(message)
    }
}

module.exports = SelfApiError