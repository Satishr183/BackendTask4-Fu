const { set } = require("mongoose")
const cardModel = require("../models/cardModel")
const counterModel = require("../models/counterModel")

const createCard = async function(req, res){
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
                cardType:req.body.cardType,
                customerName:req.body.customerName,
                status:req.body.status,
                vision:req.body.vision,
                customerID:req.body.customerID
            })
            cardData.save()
        }
    )

    res.status(201).send({status:true, message:'Success'})

}

const cardList = async function(req, res){
    const getAllCard = await cardModel.find({status:"ACTIVE"}).populate("customerID")
    res.status(200).send({status:true, data:getAllCard})
}

const deleteCardrByID = async function(req, res){
    const cardID = req.params.cardID
    const customerID = req.params.customerID
    const deleteCard = await cardModel.findByIdAndUpdate({_id:cardID,customerID:customerID},{status:"INACTIVE"},{new:true})
}

module.exports = {createCard, cardList, deleteCardrByID}