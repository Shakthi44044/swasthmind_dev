const pool = require('../database/db.js')
const createSessionBooking = async (req, res) => {
    try {
        const { id ,session_id,session_details_id,user_id, payment_transcation_id, booking_time } = req.body;

        const query = 'INSERT INTO session_booking (id,session_details_id,session_id, user_id, payment_transcation_id, booking_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [id,session_details_id,session_id, user_id, payment_transcation_id, booking_time];

        const result = await pool.query(query, values);

        res.status(201).json({
            success: true,
            message: "Session booking created successfully",
            booking: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const getAllSessionBookings = async (req, res) => {
    try {
        const query = 'SELECT * FROM session_booking';

        const result = await pool.query(query);

        if (!result.rows.length) {
            return res.status(404).json({
                success: false,
                message: "No session bookings found"
            });
        }

        res.status(200).json({
            success: true,
            message: "All session bookings fetched successfully",
            bookings: result.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const updateSessionBooking = async (req, res) => {
    try {
        const { id, session_details_id,session_id, user_id, payment_transcation_id, booking_time } = req.body;

        const query = 'UPDATE session_booking SET session_details_id=$1, user_id=$2,session_id=$3 payment_transcation_id=$4, booking_time=$5, WHERE id=$6 RETURNING *';;
        const values = [session_details_id,user_id,session_id, payment_transcation_id, booking_time, id];

        const result = await pool.query(query, values);

        res.status(200).json({
            success: true,
            message: "Session booking updated successfully",
            booking: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const deleteSessionBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM session_booking WHERE id=$1 RETURNING *';
        const values = [id];

        const result = await pool.query(query, values);

        res.status(200).json({
            success: true,
            message: "Session booking deleted successfully",
            booking: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
module.exports = {
    createSessionBooking,
    getAllSessionBookings,
    updateSessionBooking,
    deleteSessionBooking,
  };
