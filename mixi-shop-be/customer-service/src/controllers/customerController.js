const Customer = require('../models/customer.model');

{/* get all */}
exports.getAll = async (req, res) => {
  const customer = await Customer.find();
  res.json(customer);
};
{/* get by id */}
exports.getOne = async (req, res) => {
  const order = await Customer.findById(req.params.id);
  res.json(order);
};
{/* create Customer */}
exports.create = async (req, res) => {
  const newCustomer = new Customer(req.body);
  const saved = await newCustomer.save();
  res.status(201).json(saved);
};
{/* update Customer */}
exports.update = async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};
{/* delete Customer */}
exports.remove = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
