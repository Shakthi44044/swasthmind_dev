const express = require('express');
const bodyParser = require('body-parser');
const { createcomment, updatecomment, deletecomment, getcomment } = require('./post_comments_api');

const app = express();
app.use(bodyParser.json());

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, welcome to the API post_comments!');
});


app.get('/post_comments/:id', getcomment);


app.post('/post_comments', createcomment);


app.put('/post_comments/:id', updatecomment);


app.delete('/post_comments/:id', deletecomment);

// Start the server
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});