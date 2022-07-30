
module.exports = function Cart(oldCart) {

    this.menus = oldCart.menus || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(menu, id, tmpQty) {
        var storedItem = this.menus[id];
        if (!storedItem) {
            storedItem = this.menus[id] = {menu: menu, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.menu.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.menu.price;

    }

    this.reduceByOne = function(id) {
        this.menus[id].qty--;
        this.menus[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.removeItem = function(id) {
        this.totalQty -= Number(this.menus[id].qty);
        this.totalPrice = (this.totalPrice - this.menus[id].price);
        delete this.menus[id];
    };
    

    this.generateArray = function() {
        var arr = [];
        for (var id in this.menus) {
            arr.push(this.menus[id]);
        }
        return arr;
    }
}