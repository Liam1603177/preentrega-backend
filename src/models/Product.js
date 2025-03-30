const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    stock: Number,
    category: String,
    thumbnails: [String],
    status: { type: Boolean, default: true }
});

// Agregar paginación
productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
