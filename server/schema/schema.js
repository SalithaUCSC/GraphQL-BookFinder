const graphql = require('graphql');
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;
const lodash = require('lodash');
const Book = require('../models/Book');
const Author = require('../models/Author');
//dummy data
var books = [
    { title: 'Book 1', category: 'Romance', id: '1', authorId: '1' },
    { title: 'Book 2', category: 'Science', id: '2', authorId: '2' },
    { title: 'Book 3', category: 'Fantasy', id: '3', authorId: '3' },
    { title: 'Book 4', category: 'Maths', id: '4', authorId: '2' },
    { title: 'Book 5', category: 'Science', id: '5', authorId: '1' },
    { title: 'Book 6', category: 'Fantasy', id: '6', authorId: '2' }
]

var authors = [
    { name: 'Peter Johnson', age: 35, id: '1' },
    { name: 'Andrew Simpson', age: 43, id: '2' },
    { name: 'Michael Peterson', age: 29, id: '3' }
]

//declare object types
const BookType = new  GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        category: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                // return lodash.find(authors, {id: parent.authorId});
                return Author.findById({id: parent.authorId});
            }
        }
    })
});

const AuthorType = new  GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return lodash.filter(books, {authorId: parent.id});
                return Book.find({authorId: parent.id});
            }
        }
    })
});

// root query for entering into the graph
const RootQuery = new  GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // get book by ID
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                // return lodash.find(books, {id: args.id});
                return Book.findById(args.id);
            }
        },
        // get author by ID
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                // return lodash.find(authors, {id: args.id});
                return Author.findById(args.id);
            }
        },
        // get all books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return books
                return Book.find({});
            }
        },
        // get all authors
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors
                return Author.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});