const express = require('express')
const router = express.Router()
const {createCard,cardList} = require('../controllers/cardController')
const {newCustomer,getAllCustomers, deleteByID} = require('../controllers/customerController')

router.get('/api-test',function(req,res){
    res.send("Testing")
})

router.post('/newCustomer',newCustomer)
router.get('/getAll',getAllCustomers)
router.delete('/deleteByID',deleteByID)
router.post('/newCard',createCard)
router.get('/getAllList',cardList)
module.exports = router;