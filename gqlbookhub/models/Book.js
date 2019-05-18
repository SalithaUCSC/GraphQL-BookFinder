const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    category: String,
    authorId: String
});

module.exports = mongoose.model('Book', bookSchema);