const express = require('express');
const connectdb = require('./config/connect');
const path = require('path');
const app = express();
require('dotenv').config(); 
const PORT=process.env.PORT


connectdb();
app.use(express.json());

//app.use(cors(corsOptions))=> dev phase
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')))=> dev phase

// prod =>
app.use(express.static(path.join(__dirname, '../client/build')))

// Routes
app.use('/api/offer', require('./routes/offerRoutes'));
app.use('/api/user', require('./routes/userRoutes'));



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error: ${err}`);
  } else {
    console.log(`App listening on port ${PORT}!`);
  }
});
