const express = require('express');
const bodyParser = require('body-parser');
const { createpost_like, updatepost_like, deletepost_like, getpost_like } = require('./daily_post_like');

const app = express();
app.use(bodyParser.json());

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, welcome to the API post_likes!');
});


app.get('/post_likes/:id', getpost_like);
app.post('/post_likes', createpost_like);
app.put('/post_likes/:id', updatepost_like);
app.delete('/post_likes/:id', deletepost_like);


// Start the server

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


