const express = require('express');
const graphQLHttp = require('express-graphql');
const app = express();
const port = process.env.PORT || 5000;
const schema = require('./schema/schema');
const cors = require('cors');
const path = require('path');
// const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const mongoose = require('mongoose');
const keys = require('./config/credentials');

//connect to mongoDB
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true }, () => {
    console.log('Connected to bookhub DB');
});

//enable cors
app.use(cors());

//setup graphql middleware
app.use('/graphql', graphQLHttp({
    schema,
    graphiql: true
}));

// app.get('/', (req,res) => {
//     res.send("hello");
// });

app.use(express.static('public'));

app.get('*', (req,res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// app.use('/', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(port, () => {
    console.log('Server Started at port',port);
})
