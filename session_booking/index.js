const express = require('express');
const bodyParser = require('body-parser');
const { createSessionBooking, getAllSessionBookings, updateSessionBooking, deleteSessionBooking} = require('./session_booking_api.js');


const app = express()
app.use(bodyParser.json());

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, welcome to the API session_booking!');
});
app.post('/session_booking', createSessionBooking);
app.get('/session_booking/:id', getAllSessionBookings);
app.put('/session_booking/:id', updateSessionBooking);
app.delete('/session_booking/:id', deleteSessionBooking);



const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
