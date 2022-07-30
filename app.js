const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const bodyparser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport')
const flash = require('connect-flash')
dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT
const app = express()

const db = require('./server/controllers/db').connect();
const sessionStore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
})

sessionStore.on('error', function(error) {
    console.log(error);
  });

app.use(cors());
// parse request to body-parser
// app.use(express.json());
// app.use(bodyparser.urlencoded({ extended : true}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
      secret: 'aicilian2022',
      resave: false,
      saveUninitialized: true,
      store: sessionStore,
      cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1day
}));

app.use(flash());
app.use(passport.initialize())
app.use(passport.session())


// Set view engine
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "client/views"))

// Load assets
app.use('/css', express.static(path.resolve(__dirname, "client/public/assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "client/public/assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "client/public/assets/js")))
app.use('/scss', express.static(path.resolve(__dirname, "client/public/assets/scss")))
app.use('/vendor', express.static(path.resolve(__dirname, "client/public/assets/vendor")))


// Load Routes
const routes = require('./server/routes/router')
app.use(routes)


app.listen(PORT, () => {
    console.log("Server is running on http://localhost:"+PORT)
})