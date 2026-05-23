const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());


// Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


// Test Route
app.get('/', (req, res) => {

  res.json({
    message: 'Todo API is running!'
  });

});


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log('MongoDB Connected');

  app.listen(process.env.PORT, () => {

    console.log(`Server running on port ${process.env.PORT}`);

  });

})

.catch((err) => {

  console.log(err);

});