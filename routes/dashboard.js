const express = require('express');
const { getdashboard } = require('../controllers/dashboard/script');
const router = express.Router();

router.get('/',getdashboard)

module.exports = router;