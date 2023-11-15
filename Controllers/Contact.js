const Contact = require('../Models/Contact');

exports.RegisterContact = (req,res)=>{
          let data = {
              Name:req.body.Name,
              Email:req.body.Email,
              MobileNo : req.body.MobileNo
          };
    Contact.create(data).then(result=>{
          res.status(201).json({ message:"Successfully registered , we will contact you soon !!!", data:data, isRegistered :true })
    })
    .catch(err=>{
        res.status(500).json({ message:"Error in Database !!!", error:err, isRegistered :false })
    })
}