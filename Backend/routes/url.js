const express = require("express");
const { handleGenerateNewShortURL, handleGetURL } = require("../controllers/url.js");

const router = express.Router();

router.post('/', handleGenerateNewShortURL);
router.get('/:shortId', handleGetURL);

module.exports = router;