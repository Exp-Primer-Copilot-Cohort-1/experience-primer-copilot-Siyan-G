// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        const comments = JSON.parse(data);
        const comment = comments.find(comment => comment.id === req.params.id);
        res.send(comment);
    });
});

// Create new comment
app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            res.send('Comment created');
        });
    });
});

// Update comment by id
app.put('/comments/:id', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        const comments = JSON.parse(data);
        const commentIndex = comments.findIndex(comment => comment.id === req.params.id);
        comments[commentIndex] = req.body;
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            res.send('Comment updated');
        });
    });
});

// Delete comment by id
app.delete('/comments/:id', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        const comments = JSON.parse(data);
        const commentIndex = comments.findIndex(comment => comment.id === req.params.id);
        comments.splice(commentIndex, 1);
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            res.send('Comment deleted');
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});