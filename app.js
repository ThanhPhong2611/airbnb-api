const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const path = require('path');
app.use(express.json());
app.use(cors());


dotenv.config({ path : ".env"});


// Routes
const user = require('./server/routes/user');
const listing = require('./server/routes/listing');
const trip = require('./server/routes/trip');


//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    next();
  });
  
app.use("/api/v1",user);
app.use("/api/v1/listing",listing);
app.use("/api/v1/trip",trip);



module.exports = app;