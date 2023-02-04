const mongoose = require('mongoose')
//========counter for auto-increment=============
const counterSchema = {
    id: String,
    seq:{
        type: Number
    }
}
module.exports = mongoose.model('Counter',counterSchema)