import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
    {
        books {
            id
            title
            category
        }
    }
`

class BookList extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="BookList">
                <ul>
                    <li>book name</li>
                </ul>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);