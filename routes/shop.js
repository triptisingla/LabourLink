const path = require('path');
const express = require('express');
const router = express.Router();
const {getProducts,getProfile} = require('../controllers/shop/labours');
const shopController = require('../controllers/shop/contractors');


// router for getting the labours
router.get('/profile',getProfile);
router.get('/labours',getProducts);

// router for getting the contractors
router.get('/contractors',shopController.getContractors)
router.post('/addToCart', shopController.postAddToCart);
router.get('/addToCart', shopController.getAddToCart);

module.exports=router;