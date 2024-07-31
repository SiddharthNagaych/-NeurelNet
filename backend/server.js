const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data'); // Assuming you have dataRoutes for your data endpoints

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/data', dataRoutes);

// Handle preflight requests
app.options('*', cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5001, () => {
      console.log(`Server is running on port ${process.env.PORT || 5001}`);
    });
  })
  .catch((error) => console.log(error));
