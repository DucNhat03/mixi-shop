const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

const customerRoutes = require('./routes/customer.routes');
app.use('/customers', customerRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Customer DB connected'))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Customer Service running on port ${PORT}`));
