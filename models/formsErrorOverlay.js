class FormsErrorOverlay {
    constructor(
        name,
        value,
        message
    ) {
        this.name = name ?? "",
        this.value = value ?? "",
        this.message = message ?? ""
    }
}
module.exports = FormsErrorOverlay