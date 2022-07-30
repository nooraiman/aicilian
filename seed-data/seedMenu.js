var mongoose = require('mongoose');
var new_db = "mongodb://localhost:27017/aicilian";


mongoose.connect(new_db , function(error, db){
	if (error){
		throw error;
	}
	
  dataTemp = [{
    "_id": "62e4a5f9c6c6327d0782018c",
    "name": "Beef Burger",
    "image": "/img/2a5a67a8cfe922a24eebb7e86d9c4c50ad9c.png",
    "type": "Main-Dish",
    "status": "Available",
    "price": 19,
    "detail": "Homemade juicy beef patty, imported from Australia. 100% fresh and Halal. Served with cheese, salad, tomato, special sauce and pickles.",
    "__v": 0
  },{
    "_id": "62e4a60fc6c6327d078201a6",
    "name": "Chicken Burger",
    "image": "/img/078c265088bb3d03d604871d4e9cc21d0a71.png",
    "type": "Main-Dish",
    "status": "Available",
    "price": 19,
    "detail": "Homemade crispy chicken patty, marinated a night before. 100% freshly fried and juicy. Served with salad, tomato, mayonnaise and egg.",
    "__v": 0
  },{
    "_id": "62e4a62dc6c6327d078201c0",
    "name": "French Fries",
    "image": "/img/564960ce5c358baa06476cdf7be5d94bb971.png",
    "type": "Side-Dish",
    "status": "Available",
    "price": 4,
    "detail": "Fresh potato imported from United States, freshly cut and fried in a deep fryer. Crispy outside and soft inside, sprinkling with salt and freshly ground black pepper.",
    "__v": 0
  },{
    "_id": "62e4a645c6c6327d078201da",
    "name": "Curly Fries",
    "image": "/img/3ecf5b9e6c91c6abd11b43878e88fa64a1b5.png",
    "type": "Side-Dish",
    "price": 5,
    "detail": " Fresh potato imported from United States, freshly cut using a special homemade machine, ensuring the curly shape. Crispy outside and and soft inside, sprinkling with salt and special homemade spices.",
    "__v": 0,
    "status": "Available"
  },{
    "_id": "62e4a676c6c6327d078201f4",
    "name": "Chicken Set",
    "image": "/img/7a455760bb8f5c06277e52170a20033c51c9.png",
    "status": "Available",
    "price": 25,
    "detail": " 3 Dish served, Chicken Burger, French Fries and Coca Cola. The best value meal to get, without keeping you wallet empty.",
    "__v": 0,
    "type": "Set-Menu"
  },{
    "_id": "62e4a690c6c6327d0782020e",
    "name": "Beef set",
    "image": "/img/70d9698f205d4b64dae77cd571f31ef398f6.png",
    "type": "Set-Menu",
    "status": "Available",
    "price": 25,
    "detail": " 3 Dish served, Beef Burger, French Fries and Coca Cola. The best value meal to get, without keeping you wallet empty.",
    "__v": 0
  },{
    "_id": "62e4a6aac6c6327d07820228",
    "name": "Coca Cola",
    "image": "/img/7b2d6f5b7e8a7360f0bd08154efcc8f36a86.png",
    "type": "Drinks",
    "status": "Available",
    "price": 4,
    "detail": "One of the most famous and well known soft drinks in the world, great to overcome your thirst on a hot afternoon day.",
    "__v": 0
  },{
    "_id": "62e4a6c3c6c6327d07820242",
    "name": "Milo",
    "image": "/img/df23c413493ed64f63de775d5a00bdd02d28.png",
    "type": "Drinks",
    "status": "Available",
    "price": 4,
    "detail": " Best chocolate flavored malted by Nestle, keeps you energized for the whole day.",
    "__v": 0
  },{
    "_id": "62e4a6dfc6c6327d0782025c",
    "name": "Vanilla Ice Cream",
    "image": "/img/f11cf1fd064598d4ebeb0cb430d031807d3a.png",
    "type": "Desserts",
    "price": 4,
    "detail": "Super-smooth and creamy. Spot-on vanilla flavor. Oh-so cold and refreshing. Basically EVERYTHING a classic vanilla ice cream should be.",
    "__v": 0,
    "status": "Available"
  },{
    "_id": "62e4a6f2c6c6327d07820276",
    "name": "Chocolate Ice Cream",
    "image": "/img/e0d3dc89814f997a72c571fe98fb562ed728.png",
    "type": "Desserts",
    "status": "Available",
    "price": 4,
    "detail": "A rich, sweet, creamy frozen food made from variously flavored cream and milk products churned or stirred to a smooth consistency",
    "__v": 0
  }]

	db.collection("menus").deleteMany({}, (err , collection) => {
    if(err) throw err;
		console.log("Record deleted successfully");
  })

  for(var i = 0; i <dataTemp.length; i++) {
    dataTemp[i]._id = mongoose.Types.ObjectId(dataTemp[i]._id)
  }
	db.collection("menus").insertMany(dataTemp, (err , collection) => {
		if(err) throw err;
		console.log("Record inserted successfully");
		mongoose.disconnect();
	});
});