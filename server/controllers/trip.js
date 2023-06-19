const Trip = require('../models/trip');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sendToken = require('../utils/jwtToken');
const ErrorHandler = require('../utils/errorHandler');
const SuccessHandler = require('../utils/successHandler');

exports.register = async function(req,res,next){
    const {userId,listingId,startDate,endDate,totalPrice,imageSrc} = req.body;
    const trip = await Trip.create({
        userId,listingId,startDate,endDate,totalPrice,imageSrc
    });
    res.status(200).send({
        trip
    })
};

exports.getAllOfUser = async function (req, res, next) {
    const trips = await Trip.find({});
    const youTrip = [];
    trips.forEach((trip) => {
      if (trip.userId == req.params.id) {
        youTrip.push(trip);
      }
    });
    res.status(200).json({
      success: true,
      trips: youTrip,
    });
  };

  exports.deleteTrip = async function(req, res, next) {
    const trip = await Trip.findByIdAndRemove(req.params.id);
    if (!trip) {
        ErrorHandler(res,404,"Not found trip");
    };
    res.status(200).json({
        success: true,
        trip
    });
}