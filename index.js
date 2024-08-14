const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const walletsRoutes = require('../src/routes/wallets');
const transactionsRoutes = require('../src/routes/transactions');
const banksRoutes = require('../src/routes/banks');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/v1', walletsRoutes);
app.use('/v1', transactionsRoutes);
app.use('/v1', banksRoutes);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
});

// Handler function for Vercel
module.exports = async (req, res) => {
  await mongoose.connect('mongodb+srv://fitriamelia000111:PopFWdCZFQVF790g@cluster0.ypld6dd.mongodb.net/cashflow-app?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
      return new Promise((resolve, reject) => {
          const server = app.listen(0, () => {
              const { port } = server.address();
              console.log(`Server listening on port ${port}`);
              resolve();
          });
          server.on('error', reject);
      });
  })
  .catch(err => console.log(err));
  
  app(req, res); // Handle the request using express app
};