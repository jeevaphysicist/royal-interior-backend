const express = require('express');
const router = express.Router();
const { YoutubeIDExcrator  ,createYoutubeVideo ,GetVideoData } = require('../Controllers/Youtube');

router.post('/GetVideoID',YoutubeIDExcrator);
router.post('/createvideo',createYoutubeVideo);
router.get('/getvideodata',GetVideoData);

module.exports = router;