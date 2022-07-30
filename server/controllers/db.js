const mongoose = require('mongoose')

const connect = async () => {
    try {
    mongoose.Promise = global.Promise;
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB connected : ${con.connection.host+':'+con.connection.port+'/'+con.connection.name}`);
    }
    catch (err) {
        console.log('MongoDB Error: ', err)
        process.exit(1)
    }
}

const disconnect = async () => {
    try {
        const con = await mongoose.disconnect();
        console.log(`MongoDB disconnected`);
    }
    catch (err) {
        console.log('MongoDB Error: ', err)
        process.exit(1)
    }
}

module.exports = {connect}