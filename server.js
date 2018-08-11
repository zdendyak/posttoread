const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const logger = require('morgan');
const config = require('./config');
const db = require('./database');
const qraphqlSchema = require('./graphql/schema'); 


const app = express();
db(mongoose);


app.use(logger('dev'));
app.use('*', cors());

app.use('/graphql', graphqlHTTP({
    schema: qraphqlSchema,
    graphiql: true
}));

app.listen(config.port, () => {
    console.log('Express GraphQL API server running on port ', config.port);
});