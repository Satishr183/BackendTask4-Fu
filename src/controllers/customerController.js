const customerModel = require('../models/customerModel')




const newCustomer = async function(req, res){   
    try{
        const {fname, lname, mobileNumber, DOB, emailID, address, status } = req.body

        const createCustomer = await customerModel.create(req.body)
        res.status(201).send({status:true, data:createCustomer})

    }catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}


const getAllCustomers = async function(req,res){
    const getAll = await customerModel.find({status:"ACTIVE"})
    res.status(200).send({status:true , data:getAll})
}

const deleteByID = async function(req,res){
    const customerId=req.params.customerId
    const status = req.body.status
    deleteCustomer = await customerModel.findByIdAndUpdate({_id:customerId},status,{new:true})
}

module.exports = {newCustomer,getAllCustomers,deleteByID}