// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require('../Controllers/Gallery');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.array('files',10) , imageController.uploadImage); 
router.post('/create-post' , imageController.CreatePost);
router.get('/get-all-post' , imageController.GetAllPhotos);
router.post('/delete-photo' , imageController.DeletePhoto);

module.exports = router;
