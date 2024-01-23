const ProviderData = require("./providerData");
const StsTokenManager = require("./stsTokenManager"); 
class User {
    constructor(data)
    {
        this.id = data['uid'];
        this.email = data['email'];
        this.emailVerified = data['emailVerified'];
        this.isAnonymous = data['isAnonymous'];
        this.createdAt = data['createdAt'];
        this.lastLoginAt = data['lastLoginAt'];
        this.apiKey = data['apiKey'];
        this.appName = data['appName'];
        this.providerData = [];
        data['providerData'].forEach((providerData)=> {
            this.providerData = [...this.providerData, new ProviderData(providerData)]
        });
        this.stsTokenManager = new StsTokenManager(data['stsTokenManager']);

        this.setDisplayName = (_name) => {
            if (Array.isArray(this.providerData)) {
                this.providerData.forEach((data,idx) => { 
                    this.providerData[idx] = { ...this.providerData[idx], displayName: `${_name}` } 
                })
            }
        }
        this.addProviderData = (data)=> {
            this.providerData = [...this.providerData, data]
        }
    }
}
module.exports = User