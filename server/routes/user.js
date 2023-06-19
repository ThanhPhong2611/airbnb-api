const express = require("express");
const router = express.Router();

const {register, login, logout,updateInfo,getUser} = require('../controllers/user');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route("/update").put(updateInfo);
router.route("/getUser/:id").get(getUser);

module.exports = router;
