
const mongoose = require("mongoose");

var CheckConnectDatabase = false;
const connectDatabase = async() =>{
    await mongoose.connect('mongodb+srv://ygkr6BO6fVbM0jLD:ygkr6BO6fVbM0jLD@cluster0.22ansxj.mongodb.net/?retryWrites=true&w=majority',{
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