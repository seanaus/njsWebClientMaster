class ProviderData {
    constructor(data) {
        this.providerId = data.providerId;
        this.uid = data.uid;
        this.displayName = data.displayName;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.photoURL = data.photoURL; 
    }
}
module.exports = ProviderData
