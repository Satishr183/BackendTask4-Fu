const cardModel = require("../models/cardModel")
const counterModel = require("../models/counterModel")

const createCard = async function(req, res){

    try{
        let CHAR_REGEX = /^\w+( \w+)*$/;

        const {cardType, customerName, customerID, vision, status } = req.body

        if(!["REGULAR", "SPECIAL"].includes(cardType)) return res.status(400).send({status:false, message:'Provide Valid Status REGULAR, SPECIAL'})


        if(!CHAR_REGEX.test(customerName)) return res.status(400).send({status:false, message:'Provide Valid CustomerName'})

        if(!(customerID.match(/^[0-9a-fA-F]{24}$/))) return res.status(400).send({status:false,message:"Invalid customerID given"})

        if(!CHAR_REGEX.test(vision)) return res.status(400).send({status:false, message:'Provide Valid Vision'})


        // if(["ACTIVE", "INACTIVE"].includes(status)) return res.status(400).send({status:false, message:'Provide Valid Status ACTIVE, "INACTIVE'})

         counterModel.findOneAndUpdate(
            {id:"autoval"},
            {"$inc":{"seq":1}},
            {new:true},(err,cd)=>{
                let seqId
                if(cd == null){
                    const newVal=new counterModel({id:"autoval",seq:1})
                    newVal.save()
                    seqId=1
                }else{
                    seqId=cd.seq
                }
               
    
                const cardData =  new cardModel({
                    cardNumber:`CX00D${seqId}`,
                    cardType:cardType,
                    customerName:customerName,
                    status:status,
                    vision:vision,
                    customerID:customerID
                })
                cardData.save()
            }
        )
    
        res.status(201).send({status:true, message:'Success'})
    
    }catch(err){
        res.status(500).send({status:false, message:err.message})
    }

 
}

const cardList = async function(req, res){
    try{

    const getAllCard = await cardModel.find({status:"ACTIVE"}).populate("customerID")
    res.status(200).send({status:true, data:getAllCard})

    }catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}

const deleteCardrByID = async function(req, res){
    try{
    const cardID = req.params.cardID
    const customerID = req.params.customerID
    const deleteCard = await cardModel.findByIdAndUpdate({_id:cardID,customerID:customerID},{status:"INACTIVE"},{new:true})

    res.status(200).send({status:false, message:'Deleted Successfully'})
}
catch(err){
    res.status(500).send({status:false, message:err.message})
}
}
module.exports = {createCard, cardList, deleteCardrByID}