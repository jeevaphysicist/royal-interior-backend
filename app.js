const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
 
const YoutubeRoutes = require('./routes/Youtube');
const ContactRoutes = require('./routes/Contact');
const GallertyRoutes = require('./routes/Gallery');

 
const app = express(); 
const PORT = process.env.PORT || 7878 ;
// const allowedOrigins = ['http://localhost:3000'];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit:"50mb"}));
// app.use(cors({ origin: allowedOrigins , credentials: true}));
app.use(cors());


// Database connection 
mongoose.connect(process.env.MONGOURI);

mongoose.connection.once("open", () => {
  console.log("database connected successfully");
});

mongoose.connection.on("connected", () => {
  console.log("mongodb connected");
}); 

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

app.get('/',(req,res)=>{
  res.status(200).json({ message : 'Server Running Successfully on Port :7878 ' });
}) 

// Initiate Routes
app.use('/api/youtube',YoutubeRoutes);
app.use('/api/contact',ContactRoutes);
app.use('/api/gallery',GallertyRoutes); 
  
app.listen(PORT,()=>{
   console.log("server running on port : ",PORT);
})
  