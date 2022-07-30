
var mongoose = require('mongoose');
var new_db = "mongodb://localhost:27017/aicilian";

mongoose.connect(new_db , function(error, db){
	if (error){
		throw error;
	}
	
	id = mongoose.Types.ObjectId("62e14087550b6c768f16a846")
	
	var data = {
		"_id": id,
		"email": "admin@aicilian.nooraiman.xyz",
		"password": "$2b$05$glKc0N50OMcxZHKUjnGrbuEbUDMAPRr46SjK9hL03z.WCg48tzWQm",
		"role": "admin",
		"__v": 0,
		"name": "Admin"
	  }
	
	db.collection("staffs").insertOne(data, (err , collection) => {
		if(err) throw err;
		console.log("Record inserted successfully");
		mongoose.disconnect();
	});
});