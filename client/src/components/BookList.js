import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null
        }
    }
    viewBooks() {
        var data = this.props.getBooksQuery;
        if (data.loading) {
            return (<div>loading...</div>);
        }
        else {
            return data.books.map(book => {
                return (
                    <li key={book.id} onClick={(e) => this.setState({selected: book.id})}>{book.title}</li>
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
                <BookDetails bookId={this.state.selected}/>
            </div>
        );
    }
}


export default compose(
    graphql(getBooksQuery, {name: 'getBooksQuery'})
)(BookList);
