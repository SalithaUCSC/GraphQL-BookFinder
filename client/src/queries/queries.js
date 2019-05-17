import { gql } from 'apollo-boost';

const getBooksQuery = gql`
    {
        books {
            id
            title
            category
        }
    }
`

const getAuthorsQuery = gql`
    {
        authors {
            id
            name
        }
    }
`

const addBookMutation = gql`
    mutation($title: String!, $category: String!, $authorId: ID!){
        addBook(title: $title, category: $category, authorId: $authorId) {
            title
            id
        }
    }
`
const addAuthorMutation = gql`
    mutation($name: String!, $age: String!){
        addAuthor(name: $name, age: $age) {
            name
            age
        }
    }
`

const getBookQuery = gql`
    query($id: ID){
        book(id: $id){
            id
            title
            category
            author{
                name
                age
                id
                books{
                    title
                    id    
                }
            }
        }
    }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation, addAuthorMutation, getBookQuery };