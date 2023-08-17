const express = require('express');
const router = express.Router();
const labourcontractorController=require('../controllers/labourcontractor/script')
router.get('/',labourcontractorController.getlabourcontractor)

module.exports=router;