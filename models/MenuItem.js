const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'savory', 'bitter', 'sour'],
        required: true,
    },
    is_drink: {
        type: Boolean,
        default: false,
    },
    ingredients: {
        type: [String],
        default: [],
        required: true,
    },
    num_sales: {
        type: Number,
        default: 0,
    },

});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);


module.exports = MenuItem;