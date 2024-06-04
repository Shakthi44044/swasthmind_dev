const pool = require('../database/db.js');

const createpost_like = async (req, res) => {
    try {
        const { post_id,user_id,last_updated_at} = req.body;
        const query = 'INSERT INTO post_likes (post_id,user_id,last_updated_at) VALUES ($1, $2, $3) RETURNING *';
        const values = [ post_id,user_id,last_updated_at];
        const result = await pool.query(query, values);

        res.status(201).json({
            success: true,
            message: "post created successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const updatepost_like = async (req, res) => {
    try {
        const id = req.params.id;
        const { post_id,user_id,last_updated_at } = req.body;

        const query = 'UPDATE post_likes SET post_id = $1, user_id = $2, last_updated_at =$3 WHERE id = $4 RETURNING *';
        const values = [post_id,user_id,last_updated_at,id];
        const result = await pool.query(query, values);

        res.status(200).json({
            success: true,
            message: "post updated successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const deletepost_like= async (req, res) => {
    try {
        const id = req.params.id;

        const query = 'DELETE FROM post_likes WHERE id = $1';
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
}

const getpost_like = async (req, res) => {
    try {
        const { id } = req.params; 
        const query = 'SELECT * FROM post_likes WHERE id = $1';
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "fetched successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
    


module.exports = {
    createpost_like,
    updatepost_like,
    deletepost_like,
    getpost_like
};
