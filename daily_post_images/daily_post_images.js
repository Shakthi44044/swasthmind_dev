const pool = require('../database/db.js')


const daily_post_image = async (req, res) => {
    try {
        const { post_image, post_id } = req.body;

        const query = 'INSERT INTO daily_post_images (post_image, post_id) VALUES ($1, $2) RETURNING *';
        const values = [post_image, post_id];

        const result = await pool.query(query, values);

        res.status(201).json({
            success: true,
            message: "daily_post_image created successfully",
            daily_post_image: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const update_daily_post_image = async (req, res) => {
    try {
        const { id, post_image, post_id } = req.body;

        const updatePostImage = await pool.query('SELECT * FROM daily_post_images WHERE id=$1', [id]);
        if (!updatePostImage.rows.length) {
            return res.status(404).json({
                success: false,
                message: "daily_post_image not found"
            });
        }

        const query = 'UPDATE daily_post_images SET post_image=$1, post_id=$2 WHERE id=$3 RETURNING *';
        const values = [post_image, post_id, id];

        const result = await pool.query(query, values);

        res.status(200).json({
            success: true,
            message: "daily_post_image updated successfully",
            daily_post_image: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


const delete_daily_post_image = async (req, res) => {
    try {
        const { id } = req.params;

        const deletePostImage = await pool.query('DELETE FROM daily_post_images WHERE id=$1 RETURNING *', [id]);

        if (!deletePostImage.rows.length) {
            return res.status(404).json({
                success: false,
                message: "daily_post_image not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "daily_post_image deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const read_daily_post_image = async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'SELECT * FROM daily_post_images WHERE id=$1';
        const values = [id];

        const result = await pool.query(query, values);

        if (!result.rows.length) {
            return res.status(404).json({
                success: false,
                message: "daily_post_image not found"
            });
        }

        res.status(200).json({
            success: true,
            daily_post_image: result.rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    daily_post_image,
    update_daily_post_image,
    delete_daily_post_image,
    read_daily_post_image
}