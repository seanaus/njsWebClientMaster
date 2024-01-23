class StsTokenManager {
    constructor(data) {
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.expirationTime = data.expirationTime;
    }
}
module.exports = StsTokenManager
