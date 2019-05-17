import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

class BookList extends Component {

    viewBooks() {
        var data = this.props.getBooksQuery;
        if (data.loading) {
            return (<div>loading...</div>);
        }
        else {
            return data.books.map(book => {
                return (
                    <li key={book.id}>{book.title}</li>
                );
            })
        }
    }

    render() {
        return (
            <div className="BookList">
                <ul>
                    { this.viewBooks() }
                </ul>
            </div>
        );
    }
}


export default compose(
    graphql(getBooksQuery, {name: 'getBooksQuery'})
)(BookList);
