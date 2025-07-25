const express = require('express')
const router = express.Router();
const {handleGenUrl, handleGetAnalytics} = require('../controllers/url')

router.route('/').post(handleGenUrl)
router.route('/analytics/:shortId').get(handleGetAnalytics)

module.exports = router