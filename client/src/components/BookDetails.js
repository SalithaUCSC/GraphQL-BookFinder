import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery} from '../queries/queries';

class BookDetails extends Component {

    viewBookDetails(){
        const { book } = this.props.data;
        if (book) {
            return (
                <div>
                    <h2>{book.title}</h2>
                    <p>{book.category}</p>
                    <p>{book.author.name}</p>
                    <p>all books</p>
                    <ul>
                    {
                        book.author.books.map(item => {
                            return (
                                <li key={item.id}>{item.title}</li>
                            );
                        })
                    }
                    </ul>
                </div>
            );
        }
        else {
            return (<div>no book</div>);
        }
    }
    
    render() {
        return (
            <div>
                {this.viewBookDetails()}
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);