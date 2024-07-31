const express = require('express');
const bodyParser = require('body-parser');

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

app.listen(4000);