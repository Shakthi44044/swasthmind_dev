const express = require('express');
const bodyParser = require('body-parser');

const { daily_post_image, read_daily_post_image, update_daily_post_image, delete_daily_post_image, readAllDailyPostImages } = require('./daily_post_images');

const app = express()
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello, welcome to the API daily_post_images!');
});

app.post('/daily_post_images', daily_post_image);
app.get('/daily_post_images/:id', read_daily_post_image);
app.put('/daily_post_images/:id', update_daily_post_image);
app.delete('/daily_post_images/:id', delete_daily_post_image);


const PORT = process.env.PORT || 3009;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

