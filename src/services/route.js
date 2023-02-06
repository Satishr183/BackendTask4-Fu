const express = require('express')
const router = express.Router()
const {createCard, cardList, deleteCardrByID} = require('../controllers/cardController')
const {newCustomer, customerLogin, getAllCustomers, deleteByID} = require('../controllers/customerController')
const {authentication, authorization} = require('../middleware/auth')


router.get('/',function(req,res){
    res.send("API IS WORKING")
})

//customer API
router.post('/newCustomer',newCustomer)
router.post('/newCustomerLogin',customerLogin)
router.get('/getAllCustomer', authentication, getAllCustomers)
router.delete('/deleteCustomerByID/:customerID', authentication, authorization, deleteByID)

//card API
router.post('/newCard', authentication, createCard)
router.get('/getAllList', authentication, cardList)
router.delete('/deleteCardrByID/:customerID/:cardID', authentication, authorization, deleteCardrByID)


module.exports = router;