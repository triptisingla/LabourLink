// models/Cart.js
const mongoose = require('mongoose');
// const Users =require('Users')
// const Labours=require('Labours')

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    labours: [//items:labours
        {
            //productId
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Labours',
                // required: true
            
        }
    ],
});

module.exports = mongoose.model('Carts', cartSchema);
