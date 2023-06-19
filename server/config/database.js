
const mongoose = require("mongoose");

var CheckConnectDatabase = false;
const connectDatabase = async() =>{
    await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    }).then((res)=>{
        CheckConnectDatabase = true;
        console.log(`Connected to MongoDB : ${res.connection.host}`);
    }).catch((err)=>{
        console.log(err);
    });
}

module.exports = connectDatabase;