class FormsModel {
    constructor
    (
        name,
        title,
        isValid,
        errorOverlay
    ) 
    {
        this.name = name;
        this.title = title;
        this.fields = [];
        this.isValid = isValid;
        this.errorOverlay = errorOverlay
    }
}
module.exports = FormsModel