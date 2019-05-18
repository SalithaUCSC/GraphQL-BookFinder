import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery} from '../queries/queries';

class BookDetails extends Component {

    viewBookDetails(){
        const { book } = this.props.data;
        if (book) {
            return (
                <div>
                    <h2>{book.title}</h2><hr/>
                    <p><b>Category : </b>{book.category}</p>
                    <p><b>Author : </b>{book.author.name}</p>
                    <p><b>All books written by the author</b></p>
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
            return (<div>No book selected</div>);
        }
    }
    
    render() {
        return (
            <div className="bookDetails">
                <br/>{this.viewBookDetails()}
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