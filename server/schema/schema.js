const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const lodash = require('lodash');

//dummy data
var books = [
    { title: 'Book 1', category: 'Romance', id: '1' },
    { title: 'Book 2', category: 'Science', id: '2' },
    { title: 'Book 3', category: 'Fantasy', id: '3' }
]

//declare object types
const BookType = new  GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        title: {type: GraphQLString},
        category: {type: GraphQLString}
    })
});

// root query for entering into the graph
const RootQuery = new  GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // get book by ID
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent,args){
                return lodash.find(books, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});