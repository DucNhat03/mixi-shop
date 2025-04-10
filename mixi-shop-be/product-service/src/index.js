const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/product.routes');
app.use('/products', productRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Customer DB connected'))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Products Service running on port ${PORT}`));
