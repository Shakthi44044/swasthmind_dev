const express = require('express');
const bodyParser = require('body-parser'); 
const { createpost, updatepost, deletepost, getpost,} = require('./daily_posts_api');





const app = express()
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: 'welcom to the api daily_post_api' });
});

app.post('/daily_posts', createpost);
app.get('/daily_posts',getpost);
app.put('/daily_posts/:id', updatepost);
app.delete('/daily_posts/:id', deletepost);








// Start the server
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});