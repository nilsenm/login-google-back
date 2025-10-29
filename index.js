const express = require('express');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken'); 

require('dotenv').config();

const app = express();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});