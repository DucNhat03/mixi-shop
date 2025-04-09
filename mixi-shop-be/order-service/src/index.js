const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

const orderRoutes = require('./routes/order.routes');
app.use('/orders', orderRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Order DB connected'))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
