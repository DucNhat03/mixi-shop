const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: String,
  products: [
    {
      productId: String,
      quantity: Number
    }
  ],
  totalPrice: Number,
  status: {
    type: String,
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
