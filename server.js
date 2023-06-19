
const app = require('./app');
const connectDatabase = require('./server/config/database');

//Connect database
connectDatabase();



app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});

app.get('/', (req, res) =>{
    res.send('Hello world')
})