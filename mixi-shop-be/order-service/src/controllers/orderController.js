const Order = require('../models/order.model');

{/* get all */}
exports.getAll = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};
{/* get by id */}
exports.getOne = async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
};
{/* create order */}
exports.create = async (req, res) => {
  const newOrder = new Order(req.body);
  const saved = await newOrder.save();
  res.status(201).json(saved);
};
{/* update order */}
exports.update = async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};
{/* delete order */}
exports.remove = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
