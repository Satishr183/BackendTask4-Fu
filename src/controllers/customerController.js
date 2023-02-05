const customerModel = require('../models/customerModel')
const jwt = require('jsonwebtoken')

const newCustomer = async function(req, res){   
    try{
        const {fname, lname, mobileNumber, DOB, emailID, address, status } = req.body

        const createCustomer = await customerModel.create(req.body)
        res.status(201).send({status:true, data:createCustomer})

    }catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}

const customerLogin = async function(req, res){
    try{
       const emailID = req.body.emailID

        if (!emailID) {
            return res
              .status(400)
              .send({ status: false, message: "please provide an Email !" });
          }

          let email = await customerModel.findOne({ emailID: emailID })

          if (!email) {
            return res.status(400).send({ status: false, message: "emailID  is not corerct" })
          } 

          
    let token = jwt.sign(
        {
          customerID: email._id.toString()
        },
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
      );
      let Token = {
        customerID: email._id.toString(),
        token: token
       }
      res.setHeader("Authorization", token);
      res.status(200).send({ status: true, message: "Success" });
    
    }catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}

const getAllCustomers = async function(req,res){
    const getAll = await customerModel.find({status:"ACTIVE"})
    res.status(200).send({status:true , data:getAll})
}

const deleteByID = async function(req,res){
    const customerId= req.params.customerID
    console.log(customerId)
    deleteCustomer = await customerModel.findOneAndUpdate({_id:customerId},{$set:{status:"INACTIVE"}},{new:true})
    console.log(deleteCustomer)
    res.status(200).send({status:true, message:'Deleted successfully'})
}

module.exports = {newCustomer, customerLogin, getAllCustomers, deleteByID}