const pool = require('../database/db.js');

const createpost = async (req, res) => {
    try {
        const { id,post_tittle,post_description,post_hashtags, post_tags, post_outer_image, post_category, created_at, created_by, updated_at, updated_by } = req.body;

        

        const query = 'INSERT INTO daily_posts (id,post_tittle, post_description, post_hashtags, post_tags, post_outer_image, post_category, created_at, created_by, updated_at, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
        const values = [id, post_tittle, post_description, post_hashtags, post_tags, post_outer_image, post_category, created_at, created_by, updated_at, updated_by];
        const result = await pool.query(query, values);

        res.status(201).json({
            success: true,
            message: "post created successfully",
            post: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const updatepost = async (req, res) => {
    try {
        const id = req.params.id;
        const { post_tittle, post_description, post_hashtags, post_tags, post_outer_image, post_category, updated_at, updated_by } = req.body;

        const query = 'UPDATE daily_posts SET post_tittle = $1, post_description = $2, post_hashtags = $3, post_tags = $4, post_outer_image = $5, post_category = $6, updated_at = $7, updated_by = $8 WHERE id = $9 RETURNING *';
        const values = [post_tittle, post_description, post_hashtags, post_tags, post_outer_image, post_category, updated_at, updated_by, id];
        const result = await pool.query(query, values);

        res.status(200).json({
            success: true,
            message: "post updated successfully",
            post: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const deletepost = async (req, res) => {
    try {
        const id = req.params.id;

        const query = 'DELETE FROM daily_posts WHERE id = $1';
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
const getpost = async (req, res) => {
    try {
        const { limit = 10, offset = 0 } = req.query;

        const query = 'SELECT * FROM daily_posts ORDER BY id LIMIT $1 OFFSET $2';
        const values = [parseInt(limit), parseInt(offset)];

        const result = await pool.query(query, values);

        res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: result.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports =  { createpost,updatepost,deletepost,getpost}