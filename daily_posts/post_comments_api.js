const pool = require('../database/db.js');

const createcomment = async (req, res) => {
    try {
        const { id,post_id,user_id,comment,comment_against_comment,created_at,created_by,updated_at,updated_by } = req.body;
        const query = 'INSERT INTO post_comments (id,post_id,user_id,comment,comment_against_comment,created_at,created_by,updated_at,updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
        const values = [id, post_id,user_id,comment,comment_against_comment,  created_at, created_by, updated_at, updated_by];
        const result = await pool.query(query, values);

        res.status(201).json({
            success: true,
            message: "post created successfully",
            doctor: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const updatecomment = async (req, res) => {
    try {
        const id = req.params.id;
        const { post_id,user_id,comment,comment_against_comment, updated_at, updated_by } = req.body;

        const query = 'UPDATE post_comments SET post_id = $1, user_id = $2, comment = $3, comment_against_comment = $4, updated_at = $5, updated_by = $6 WHERE id = $7 RETURNING *';
        const values = [post_id,user_id,comment,comment_against_comment,, updated_at, updated_by, id];
        const result = await pool.query(query, values);

        res.status(200).json({
            success: true,
            message: "post updated successfully",
            doctor: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const deletecomment= async (req, res) => {
    try {
        const id = req.params.id;

        const query = 'DELETE FROM post_comments WHERE id = $1';
        const values = [id];
        await pool.query(query, values);

        res.status(200).json({
            success: true,
            message: "post deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
const getcomment = async (req, res) => {
    try {
        const query = 'SELECT * FROM post_comments ORDER BY id ASC';
        const result = await pool.query (query);
        res.status(200).json({
            success: true,
            message: "post fetched successfully",
           
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    } 
}

module.exports =  {createcomment,updatecomment,deletecomment,getcomment}