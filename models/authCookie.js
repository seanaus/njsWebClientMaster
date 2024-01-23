class AuthCookie {
    constructor(
        token,
        timestamp,
        timedOut
    ) 
    {
        this.token = token,
        this.timestamp = timestamp,
        this.timedOut = timedOut
    }
}
module.exports = AuthCookie