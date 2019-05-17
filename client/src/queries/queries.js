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

export { getAuthorsQuery, getBooksQuery, addBookMutation };