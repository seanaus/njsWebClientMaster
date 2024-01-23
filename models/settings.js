class Settings {
    constructor(
        id,
        projectName,
        production,
        authLifeSpanMetric,
        authLifeSpanValue

    ) 
    {
        this.id = id;
        this.projectName = projectName;
        this.production = production;
        this.authLifeSpanMetric = authLifeSpanMetric;
        this.authLifeSpanValue = authLifeSpanValue;
    }
}
module.exports = Settings