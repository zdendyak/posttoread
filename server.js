const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const config = require('./config');
const db = require('./database');

const app = express();
db(mongoose);



app.use('*', cors());



app.listen(config.port, () => {
    console.log('Express GraphQL API server running on port ', config.port);
});