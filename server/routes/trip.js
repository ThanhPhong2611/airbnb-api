const express = require("express");
const router = express.Router();

const {register, getAllOfUser,deleteTrip} = require('../controllers/trip');

router.route('/register').post(register);
router.route('/getAllTripOfUser/:id').get(getAllOfUser);
router.route('/delete/:id').delete(deleteTrip);

module.exports = router;
