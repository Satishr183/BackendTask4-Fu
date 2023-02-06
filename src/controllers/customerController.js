const customerModel = require('../models/customerModel')
const jwt = require('jsonwebtoken')

const newCustomer = async function(req, res){   
    try{
        //Validation for Customer
        const {fname, lname, mobileNumber, DOB, emailID, address, status } = req.body

        let PHONE_REGEX = /^[7-9][0-9]{9}$/;
        let CHAR_REGEX = /^\w+( \w+)*$/;
        let EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let DATE_REGEX = /(((0[1-9])|([12][0-9])|(3[01]))-((0[0-9])|(1[012]))-((20[012]\d|19\d\d)|(1\d|2[0123])))/;

        if(!CHAR_REGEX.test(fname)) return res.status(400).send({status:false, message:'Provide Valid Fname'})
        if(!CHAR_REGEX.test(lname)) return res.status(400).send({status:false, message:'Provide Valid lname'})

        if(!PHONE_REGEX.test(mobileNumber)) return res.status(400).send({status:false, message:'Provide Valid MobileNumber'})
        
        if(!DATE_REGEX.test(DOB)) return res.status(400).send({status:false, message:'Provide Valid Date [xx-xx-xxxx]'})

        if(!EMAIL_REGEX.test(emailID)) return res.status(400).send({status:false, message:'Provide Valid Email ID'})
    

        if(!["ACTIVE", "INACTIVE"].includes(status)) return res.status(400).send({status:false, message:'Provide Valid Status "ACTIVE", "INACTIVE"'})

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
    try{

    const getAll = await customerModel.find({status:"ACTIVE"})

    res.status(200).send({status:true , data:getAll})

    }catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}

const deleteByID = async function(req,res){
    try{

    const customerId= req.params.customerID
    deleteCustomer = await customerModel.findOneAndUpdate({_id:customerId},{$set:{status:"INACTIVE"}},{new:true})
   
    res.status(200).send({status:true, message:'Deleted successfully'})

    }catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}

module.exports = {newCustomer, customerLogin, getAllCustomers, deleteByID}