const mongoose = require("mongoose");

const trip = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
    },
    listingId: {
        type: mongoose.Types.ObjectId,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    imageSrc: {
        type: String,
    },
    totalPrice: {
        type: Number,
    },
  
    
    createAt : {
        type: Date
    }
});

module.exports = mongoose.model("Trip", trip);
