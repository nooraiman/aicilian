var Table = require('./models/table')
const dotenv = require('dotenv')
const connectDB = require('./controllers/connection');
dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT

connectDB()


for(var i=1; i < 10;i++) {
    var table = new Table({
        number: i,
        size: "3"
    }).save()
}