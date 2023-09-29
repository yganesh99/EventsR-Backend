// index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3001;
const dbConnectionString = process.env.DB_CONNECTION_STRING;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Database connection
mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
const userRoutes = require('./routes/userRoutes');
const userAddressRoutes = require('./routes/userAddressRoutes');
const productCategoryRoutes = require('./routes/productCategoryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
// const supplierRoutes = require('./routes/supplierRoutes');

app.use('/api', userRoutes);
app.use('/api', userAddressRoutes);
app.use('/api', productCategoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
// app.use('/api', supplierRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});