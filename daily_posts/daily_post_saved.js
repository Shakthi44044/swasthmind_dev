const pool = require('../database/db.js');

const createpostsaved = async (req, res) => {
    try {
        const { id,post_id, user_id, saved_date } = req.body;
        const query = 'INSERT INTO daily_post_saved (id,post_id, user_id, saved_date) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [id,post_id, user_id, saved_date];
        const result = await pool.query(query, values);

        res.status(201).json({
            success: true,
            message: "post saved successfully",
            post: result.rows[0]

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const updatepostsaved = async (req, res) => {
    try {
        const id = req.params.id;
        const { post_id, user_id, saved_date } = req.body;

        const query = 'UPDATE daily_post_saved SET post_id = $1, user_id = $2, saved_date = $3 WHERE id = $4 RETURNING *';
        const values = [post_id, user_id, saved_date, id];
        const result = await pool.query(query, values);

        res.status(200).json({
            success: true,
            message: "post saved updated successfully",
            post: result.rows[0]
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


const deletepostsaved = async (req, res) => {
    
    try {
        const id = req.params.id;

        const query = 'DELETE FROM daily_post_saved WHERE id = $1';
        const values = [id];
        await pool.query(query, values);

        res.status(200).json({
            success: true,
            message: "post saved deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


const getpostsaved = async (req, res) => {
    try {
        const query = 'SELECT * FROM daily_post_saved ORDER BY id ASC';
        const result = await pool.query
        res.status(200).json({
            success: true,
            message: "post saved fetched successfully",
            post: result.rows
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    createpostsaved,
    updatepostsaved,
    deletepostsaved,
    getpostsaved
}




            

        

        
