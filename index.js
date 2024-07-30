const express = require('express');

const app = express();

app.use(() => {
    console.log('hello there')
})
app.listen(4000);