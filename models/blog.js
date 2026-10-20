const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    preview: {
        type: String,
        required: true
    },
    mainTitle: {
        type: String,
        required: true
    },
    mainBody: {
        type: String,
        required: true
    },
    whatsNext: {
        type: String,
        required: true
    },
    whatsNextBody: {
        type: String,
        required: true
    },
    verse: {
        type: String,
        required: true
    },
    verseText: {
        type: String,
        required: true
    },
    verseBody: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;