// models/Cart.js
const mongoose = require('mongoose');
// const Users =require('./Users')
// const Labours=require('./Labours');
// const contractor = require('./contractor');

const receivedSchema = new mongoose.Schema({
    userId: {//labour
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    contractors: [//items:labours
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contractors',
        }
    ],
});

module.exports = mongoose.model('Receiveds', receivedSchema);
