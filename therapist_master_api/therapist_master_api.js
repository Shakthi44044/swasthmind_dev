const pool = require('../database/db.js')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    try {
        const { name, email, speciality, designation, experience, bio, ratings, password, languages_known } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO therapist_master (name, email, speciality, designation, experience, bio, ratings, password, languages_known) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
        const values = [name, email, speciality, designation, experience, bio, ratings, hashedPassword, languages_known];

        const result = await pool.query(query, values);

        res.status(201).json({
            success: true,
            message: "therapist created successfully",
            doctor: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id, name, email, speciality, designation, experience, bio, ratings, password, languages_known } = req.body;

        // Verify the current password
        const updateUser = await pool.query('SELECT * FROM therapist_master WHERE id=$1', [id]);
        if (!updateUser.rows.length) {
            return res.status(404).json({
                success: false,
                message: "therapist not found"
            });
        }

        const isMatch = await bcrypt.compare(password, updateUser.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }

        // Hash the new password if it's provided
        const hashedPassword = password ? await bcrypt.hash(password, 10) : currentDoctor.rows[0].password;

        const query = 'UPDATE therapist_master SET name=$1, email=$2, speciality=$3, designation=$4, experience=$5, bio=$6, ratings=$7, password=$8, languages_known=$9 WHERE id=$10 RETURNING *';
        const values = [name, email, speciality, designation, experience, bio, ratings, hashedPassword, languages_known, id];

        const result = await pool.query(query, values);

        res.status(200).json({
            success: true,
            message: "therapist updated successfully",
            doctor: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the user exists
        const currentDoctor = await pool.query('SELECT * FROM therapist_master WHERE id=$1', [id]);
        if (!currentDoctor.rows.length) {
            return res.status(404).json({
                success: false,
                message: "therapist not found"
            });
        }

        // Delete the user
        const query = 'DELETE FROM therapist_master WHERE id=$1 RETURNING *';
        const values = [id];

        const result = await pool.query(query, values);

        res.status(200).json({
            success: true,
            message: "therapist deleted successfully",
            doctor: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
const readUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the user
    
        const query = 'SELECT * FROM therapist_master WHERE id=$1';
        const values = [id];

        const result = await pool.query(query, values);

        if (!result.rows.length) {
            return res.status(404).json({
                success: false,
                message: "therapist not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "therapist details fetched successfully",
            doctor: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
const readAllUsers = async (req, res) => {
    try {
        // Fetch all users
        const query = 'SELECT * FROM therapist_master';

        const result = await pool.query(query);

        if (!result.rows.length) {
            return res.status(404).json({
                success: false,
                message: "No therapists found"
            });
        }

        res.status(200).json({
            success: true,
            message: "All therapists fetched successfully",
            doctors: result.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
module.exports = { createUser,updateUser,readUser,readAllUsers,deleteUser}