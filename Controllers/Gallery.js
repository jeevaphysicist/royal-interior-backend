const { bucket } = require('../Config/firebase');
const Gallery = require('../Models/Gallery');

exports.uploadImage = async (req, res) => {

  // console.log("Number of files:", req.files.length);

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded.');
    }

    const uploadPromises = req.files.map((file, index) => {
      return new Promise((resolve, reject) => {
        const fileName = file.originalname;
        const fileUpload = bucket.file(fileName);

        const stream = fileUpload.createWriteStream({
          metadata: {
            contentType: file.mimetype, 
          },
        });

        stream.on('error', (err) => {
          reject(`Error uploading file ${index + 1}: ${err}`);
        });

        stream.on('finish', () => {
          fileUpload.getMetadata()
            .then((metadata) => {
              const Url = "https://firebasestorage.googleapis.com/v0/b/contentcreator-ddc7a.appspot.com/o/Photoname?alt=media&token=220e59bd-0243-4c14-b8a5-63b6687ea539";

              //  console.log("Meta Data",metadata);
              const Filename = metadata[0].name;
              const bucket = metadata[0].bucket;
              const generation = metadata[0].generation ;
              const updatedImageUrl = Url.replace(/\/o\/([^?]+)\?/, `/o/${Filename}?`);
              // console.log(`File ${index + 1} uploaded successfully. URL: ${updatedImageUrl}`);
              resolve({Filename ,Bucket:bucket ,Generation:generation ,URL:updatedImageUrl});
            })
            .catch((error) => {
              reject(`Error getting image URL for file ${index + 1}: ${error.message}`);
            });
        });

        stream.end(file.buffer);
      });
    });

    Promise.all(uploadPromises)
      .then((imageUrls) => {
        return res.status(200).json({ message: 'Files uploaded successfully.', imageUrls });
      })
      .catch((error) => {
        return res.status(500).send(`Error uploading files: ${error}`);
      });
  } catch (error) {
    return res.status(500).send(`Error uploading files: ${error.message}`);
  }
};
 
exports.CreatePost = async (req,res)=>{
  // console.log("req.body",req.body);
  Gallery.create(req.body).then(result=>{
       res.status(201).json({
        message:"Post Published Successfully!!!",
        data:result
       })
  })
  .catch(err=>{
    res.status(500).json({
        message:"Error in database",
        error:err
    })
  })
}

exports.GetAllPhotos = async (req,res)=>{
  
     Gallery.find().then(result=>{
        res.status(200).json({
          message:"Get data successfully",
          data:result
        })
     })
     .catch(err=>{
         res.status(500).json({
           message:"Error in  Database",
           error:err
         })
     })
}


exports.DeletePhoto = async (req,res)=>{
  
  const fileDetails = {
    name: req.body.filename,
    bucket: req.body.bucket,
    generation: req.body.generation
  };

  console.log("filedetails",fileDetails);

  // Delete the file
bucket.file(fileDetails.name).delete({ generation: fileDetails.generation })
.then(() => {
  console.log(`File ${fileDetails.name} deleted successfully.`);
})
.catch((error) => {
  console.error('Error deleting file:', error); 
});
}
