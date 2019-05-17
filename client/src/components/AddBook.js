import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            category: '',
            authorId: ''
        }
    }
    viewAuthors() {
        var data = this.props.getAuthorsQuery;
        if (data.loading) {
            return (<option>loading authors...</option>);
        }
        else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                );
            })
        }
    }

    submitBookForm(e) {
        e.preventDefault();
        // console.log(this.state)
        this.props.addBookMutation({
            variables: {
                title: this.state.title,
                category: this.state.category,
                authorId: this.state.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitBookForm.bind(this)}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="title" id="title" 
                           onChange={(e) => this.setState({title: e.target.value})} placeholder="Book Title"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Category</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="category" id="category" 
                            onChange={(e) => this.setState({category: e.target.value})} placeholder="Book Category"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Author</label>
                        <div className="col-sm-10">
                            <select id="author" className="form-control"
                            onChange={(e) => this.setState({authorId: e.target.value})}>
                                <option>Select Author</option>
                                { this.viewAuthors() }
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-primary">add</button>
                </form>
            </div>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
    graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook);