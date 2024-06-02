const express = require('express');
const bodyParser = require('body-parser');
const { createUser, readUser, updateUser, deleteUser,readAllUsers } = require('./therapist_master_api');


const app = express()
app.use(bodyParser.json());

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, welcome to the API therapist_master!');
});
app.post('/therapist_master', createUser);
app.get('/therapist_master/:id', readUser);
app.put('/therapist_master/:id', updateUser);
app.delete('/therapist_master/:id', deleteUser);
app.get('/therapist_master', readAllUsers);


const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
