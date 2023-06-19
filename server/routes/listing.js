const express = require("express");
const router = express.Router();

const {register, getAll, getOne,getAllOfUser, deleteList} = require('../controllers/listing');

router.route('/register').post(register);
router.route('/getAll').get(getAll);
router.route('/getAllOfUser/:id').get(getAllOfUser);
router.route('/delete/:id').delete(deleteList);

router.route('/getOne/:id').get(getOne);

module.exports = router;
