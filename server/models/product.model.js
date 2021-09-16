const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true, "Title is required!"],
        minlength: [2, "Title must be at least 2 characters long"]
    },
    price: {
        type: Number,
        required:[true, "Price is required!"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    }

})

//register the above code at a table in mongodb
const Product = mongoose.model("Product", ProductSchema )

module.exports = Product;