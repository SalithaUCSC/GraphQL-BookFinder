const express = require('express');
const graphQLHttp = require('express-graphql');
const app = express();
const port = 4000;
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const keys = require('./config/credentials');

//connect to mongoDB
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, () => {
    console.log('Connected to bookhub DB');
});

//setup graphql middleware
app.use('/graphql', graphQLHttp({
    schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log('Server Started');
})
