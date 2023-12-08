//Create Web Server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const { check, validationResult } = require('express-validator');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Read Comments
app.get('/comments', (req, res) => {
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

//Create Comment
app.post('/comments', [
    check('comment').isLength({ min: 1 }).withMessage('Comment is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors : errors.array() });
    }
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const comments = JSON.parse(data);
        const newComment = {
            id: uuidv4(),
            comment: req.body.comment,
            date: moment().format('MMMM Do YYYY, h:mm:ss a')
        };
        comments.push(newComment);
        fs.writeFile('./data/comments.json', JSON.stringify(comments), (err) => {
            if (err) throw err;
            res.send(newComment);
        });
    });
});

//Delete Comment
app.delete('/comments/:id', (req, res) => {
    fs.readFile('./data/comments.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const comments = JSON.parse(data);
        const filteredComments = comments.filter(comment => comment.id !== req.params.id);
        fs.writeFile('./data/comments.json', JSON.stringify(filteredComments), (err) => {
            if (err) throw err;
            res.send('Comment deleted');
        });
    });
});

//Update Comment
app.put('/comments/:id', [
    check('comment').isLength({ min: 1 }).withMessage('Comment is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).

