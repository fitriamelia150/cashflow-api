const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const walletsRoutes = require('./src/routes/wallets');
const transactionsRoutes = require('./src/routes/transactions');

app.use(bodyParser.json());
// Body Parser merupakan library yang berisi middleware untuk membaca sebuah data yang dikirimkan oleh HTTP POST 
//dan menyimpannya sebagai objek JavaScript yang dapat di akses melalui req.body .

//handle error CORS Origin agar API bisa diakses oleh browser
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/v1', walletsRoutes);
app.use('/v1', transactionsRoutes);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message: message, data: data})
})

mongoose.connect('mongodb+srv://fitriamelia000111:PopFWdCZFQVF790g@cluster0.ypld6dd.mongodb.net/cashflow-app?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    app.listen(4000, () => console.log('connected to db'));
})
.catch(err => console.log(err))