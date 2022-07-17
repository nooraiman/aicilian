const express = require('express')
const path = require('path')
const bodyparser = require("body-parser");
const cors = require('cors');
const dotenv = require('dotenv')

const connectDB = require('./controllers/connection');
const routes = require('./routes/router')
dotenv.config( { path : 'config.env'} )


const PORT = process.env.PORT
const app = express()
//MongoDB Connection
connectDB()

app.use(cors());
// parse request to body-parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : true}))

// Set view engine
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "views"))

// Load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
app.use('/scss', express.static(path.resolve(__dirname, "assets/scss")))
app.use('/vendor', express.static(path.resolve(__dirname, "assets/vendor")))

app.use(routes)

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})