const mongoose = require("mongoose");

const listing = new mongoose.Schema({
    category: {
        type: String,
    },
    locationValue: {
        type: String,
    },
    totalPrice: {
        type: String,
    },
    userId : {
        type: mongoose.Types.ObjectId,
    },
    location: {
        value: { type: String },
        label: { type: String },
        flag: { type: String },
        latlng: { type: Array },
        region: { type: String },
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    imageSrc: {
        type: String,
    },
    roomCount: {
        type: String,
    },
    bathroomCount: {
        type: String,
    }, 
    guestCount: {
        type: String,
    },
    price: {
        type: String,
    },
});

module.exports = mongoose.model("Listing", listing);
