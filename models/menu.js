const { Schema } = require("mongoose");

var MenuSchema = new Schema({
    name: String,
    category: { type: Schema.Types.ObjectId, ref: 'menu_category'}
})

var MenuDetailSchema = new Schema({
    menu: { type: Schema.Types.ObjectId, ref: 'menu'},
    category: { type: Schema.Types.ObjectId, ref: 'menu_category'},
    status: { type: Schema.Types.ObjectId, ref: 'menu_status'},
    price: { type: Schema.Types.ObjectId, ref: 'menu_price'}
})

var MenuCategorySchema = new Schema({
    name: String
})

var MenuStatusSchema = new Schema({
    name: String
})

var MenuPriceSchema = new Schema({
    price: Double
})


// Create Model Objects
const Menu = mongoose.model('menu', MenuSchema)
const MenuDetail = mongoose.model('menu_detail', MenuDetailSchema)
const MenuCategory =  mongoose.model('menu_category', MenuCategorySchema)
const MenuStatus = mongoose.model('menu_status', MenuStatusSchema)
const MenuPrice = mongoose.model('menu_price', MenuPriceSchema)

// Export Model Objects
module.exports = { Menu, MenuDetail, MenuCategory, MenuStatus, MenuPrice }
