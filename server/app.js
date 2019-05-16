const express = require('express');
const graphQLHttp = require('express-graphql');
const app = express();
const port = 4000;
const schema = require('./schema/schema');

//setup graphql middleware
app.use('/graphql', graphQLHttp({
    schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log('Server Started');
})
