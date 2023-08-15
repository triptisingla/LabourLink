const cloudinary = require('cloudinary').v2
const DatauriParser = require('datauri/parser');
const Products = require('../../models/Labours');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.getAddProduct = (req, res, next) => {
    res.render('addproduct', {
        isAdmin: req.user.isAdmin
    });
}

module.exports.postAddProduct = async (req, res, next) => {
    console.log(req.files);
    const { Labour_name,Labour_profession,Labour_wages} = req.body;
    const { Labour_image } = req.files
    cloudinary.uploader.upload(Labour_image.tempFilePath, async (err, result) => {
        try {
            const addproduct=await Products.create({
                Labour_name,
                Labour_profession,
                Labour_wages,
                imageUrl:result.url,
                labourId:req.user._id
            })
            req.flash('msg', 'Labour is added succesfully👍')
           return res.render('addproduct',{
                msg:req.flash('msg')
           })
        }
        catch (err) {
           return  res.send(err)
        }
    }
)}

module.exports.getProducts = async (req, res, next) => {
    try {
        let products = await Products.find({
            labourId: req.user._id
        })
        res.render('admin/products', {
            products,
            isAdmin: req.user.isAdmin
        })
    }
    catch (err) {

    }
}



// try {
//     const parser = new DatauriParser();

//     cloudinary.uploader.upload(parser.format('.png', req.file.buffer).content, async (error, result) => {
//         // console.log(result, error);
//         try {
//             await Products.create({
//                Labour_name,
//                 Labour_profession,
//                 Labour_wages,
//                 imageUrl: result.url,
//                 labourId: req.user._id
//             })
//             return res.redirect('/admin/products');
//         }
//         catch (err) {
//             return next(err);
//         }
//     });
// } catch (err) {
//     return next(err);
// }