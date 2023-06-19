const Listing = require('../models/listing');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sendToken = require('../utils/jwtToken');
const ErrorHandler = require('../utils/errorHandler');
const SuccessHandler = require('../utils/successHandler');
const ApiFeatures = require('../utils/listingFeature');
exports.register = async function (req, res, next) {
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    userId,
    price,
  
  } = req.body;
  const listing = await Listing.create({
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    totalPrice : price,
    location,
    price,
    userId,
    locationValue : location.value
  });
  res.status(200).send({
    listing
  })
};

exports.getAll = async function (req, res, next) {
  const { roomCount,
    guestCount,
    bathroomCount,
    locationValue,
    startDate,
    endDate,
    category } = req.params;
  const resultPerPage = 7;
  const ListingCount = await Listing.countDocuments();
  const allListing = await Listing.find();
  const apiFeature = new ApiFeatures(Listing.find(), req.query)
    .filter()
  var listings = null;
  if (roomCount || guestCount || bathroomCount || locationValue || startDate || endDate || category) {
    let newArrListings = [];
   
    newArrListings = Listing.filter(function (item) {
      return item.roomCount >= roomCount 
      || item.bathroomCount >= bathroomCount 
      || item.guestCount >= guestCount 
      || item.category === category 
      || item.locationValue === locationValue
    });
    listings = newArrListings;
  } else {
    listings = await apiFeature.query;
  };
  listings.sort(() => Math.random() - 0.5);
  res.status(200).json({
    success: true,
    listings,
    ListingCount,
    resultPerPage
  });
};

exports.getOne = async function (req, res, next) {
  const list = await Listing.findOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    list,
  });
};

exports.getAllOfUser = async function (req, res, next) {
  const list = await Listing.find({});
  const youList = [];
  list.forEach((post) => {
    if (post.userId == req.params.id) {
      youList.push(post);
    }
  });
  res.status(200).json({
    success: true,
    list: youList,
  });
};

exports.deleteList = async function(req, res, next) {
  const list = await Listing.findByIdAndRemove(req.params.id);
  if (!list) {
      ErrorHandler(res,404,"Not found list");
  };
  res.status(200).json({
      success: true,
      list
  });
}