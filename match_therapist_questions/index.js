const express = require('express');
const bodyParser = require('body-parser');
const dynamicController = require('./match_therapist_questions_option.js'); 

const app = express();
const port = process.env.PORT || 3009;

app.use(bodyParser.json());

app.post('/match_therapist_questions_options', dynamicController);
app.post('/match_therapist_question', dynamicController);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});