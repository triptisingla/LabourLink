const Cart = require('../../models/Carts');
const Received = require('../../models/Receiveds');
const Users = require('../../models/Users');
const Contractor = require('../../models/Contractors')

module.exports.getContractors = async (req, res) => {
    let contractors = await Contractor.find({})
    res.render('contractor/contractor', {
        contractors
    })
};

module.exports.postAddToCart = async (req, res) => {
    try {
        const productId = req.body.productId;
        const userId = req.user._id;

        console.log(productId)
        let cart = await Cart.findOne({ userId });
        console.log("here 2")
        let received = await Received.findOne({ userId: productId });

        if (!cart) {
            cart = new Cart({ userId, labours: [] });
        }
        if (!received) {
            received = new Received({ userId: productId, contractors: [] });
        }

        let existingItem = cart.labours.find(labour => labour == productId);
        console.log("existing = ",existingItem)
        if (existingItem) {
            cart.labours.pull(productId);
            console.log("inside if")
            received.contractors.pull(userId);
            
        } else {
            cart.labours.push(productId);
            received.contractors.push(userId);
        }

        await cart.save();
        await received.save();
        res.status(200).json({ message: 'Request sent' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.getAddToCart = async (req, res) => {
    try {
        let userId = req.user._id;
        console.log(userId)

        let cart = await Cart.findOne({ userId })
            .populate({ path: 'labours' });
        let labours = cart.labours;

        // let received = await Received.findOne({ userId })
        //     .populate({ path: 'contractors' });
        // let contractors = received.contractors;
        // console.log(received)

        return res.render('shop/addToCart', { labours })
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

// module.exports.getReceivedRequests = async (req, res) => {
//     try {
//         let userId = req.user._id;
//         // console.log(userId)

//         let received = await Received.findOne({ userId })
//             .populate({ path: 'contractors' });
//         let contractors = received.contractors;
//         console.log(received)

//         return res.render('shop/receivedRequests', { contractors })
//     }
//     catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }
