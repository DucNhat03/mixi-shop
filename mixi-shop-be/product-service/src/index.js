const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/product.routes');
app.use('/products', productRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Product DB connected'))
.catch(err => console.error(err));

app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
