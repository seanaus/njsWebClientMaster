class Component {
    constructor
        (
            id
        )
        {
            this.id = id;
            this.items = [];
            this.add = (field, value) => {
                this[field] = value
            };
            this.addItem = (item) => {
                this.items = [...this.items, item];
            };
        }
}
module.exports = Component