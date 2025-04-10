const Product = require('../models/product.model');

{/* get all */}
exports.getAll = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
{/* get by id */}
exports.getOne = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};
{/* create */}
exports.create = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: 'Có lỗi xảy ra khi tạo sản phẩm.' });
  }
};

{/* update */}
exports.update = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};
{/* remove */}
exports.remove = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};
