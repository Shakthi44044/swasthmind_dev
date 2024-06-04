const express = require('express');
const bodyParser = require('body-parser');
const { createpostsaved, updatepostsaved, deletepostsaved,getpostsaved } = require('./daily_post_saved.js');

const app = express();
const port = process.env.PORT || 3009;

app.use(bodyParser.json());

app.post('/daily_posts_saved', createpostsaved);
app.put('/daily_posts_saved/:id', updatepostsaved);
app.delete('/daily_posts_saved/:id', deletepostsaved);
app.get('/daily_posts_saved/:id', getpostsaved);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
    

    module.exports = {
        createpostsaved,
        updatepostsaved,
        deletepostsaved,
        getpostsaved
    };



