const pool = require('../database/db.js')

const dynamicController = async (req, res) => {
    const { operation, table_name, column_values } = req.body;
    console.log(req.body.column_values);
    switch (operation) {
        case "read":
            switch (table_name) {
                case "match_therapist_questions":
                    const { id } = req.body;
                    const query = `SELECT question, created_at, created_by, updated_at, updated_by, id FROM match_therapist_questions WHERE id = $1`;
                    pool.query(query, [id], (err, result) => {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.status(200).send(result.rows);
                        }
                    });
                    break;
                default:
                    res.status(400).send("Invalid table name");
            }
            break;
        case "create":
            switch (table_name) {
                case "match_therapist_questions":
                    const { question} = req.body;
                    const query = `INSERT INTO match_therapist_questions(question) VALUES($1) RETURNING *`;
                    pool.query(query, [question], (err, result) => {
                        if (err) {
                            res.status(500).send(`Error inserting record: ${err}`);
                        } else {
                            res.status(201).send({ message: "Record inserted successfully", question: result.rows[0]});
                        }
                    });
                    break;
                    
                    case "match_therapist_questions_options":
                      
                    const { question_id, option, is_correct, created_by, updated_by } = req.body;
                     try {
        
                        const query = `INSERT INTO match_therapist_questions_options(question_id, option, is_correct, created_by, updated_by) VALUES($1, $2, $3, $4, $5) RETURNING *`;
                        const values = [question_id, option, is_correct, created_by, updated_by];
                        const result = await pool.query(query, values);
                        res.status(201).send({ message: "Record inserted successfully", option: result.rows[0] });
                    } catch (err) {
                        res.status(500).send(`Error inserting record: ${err}`);
                    }
                    break;
                    
                       


                default:
                    res.status(400).send("Invalid table name");
            }
            break;
        case "delete":
            switch (table_name) {
                case "match_therapist_questions_option":
                    const { option_id } = req.body;
                    const deleteQuery = `DELETE FROM match_therapist_questions_options WHERE option_id = $1`;
                    pool.query(deleteQuery, [option_id], (err, result) => {
                        if (err) {
                            res.status(500).send(`Error deleting record: ${err}`);
                        } else {
                            res.status(200).send({ message: "Option deleted successfully" });
                        }
                    });
                    break;
                case "match_therapist_questions":
                    const { id } = req.body;
                    const query = `DELETE FROM match_therapist_questions WHERE id = $1`;
                    pool.query(query, [id], (err, result) => {
                        if (err) {
                            res.status(500).send(`Error deleting question: ${err}`);
                        } else {
                            res.status(200).send({ message: "Question deleted successfully" });
                        }
                    });
                    break;
                default:
                    res.status(400).send("Invalid table name");
            }
            break;
        case "update":
            switch (table_name) {
                case "match_therapist_questions_option":
                    const { option_id, new_option_text } = req.body;
                    const updateQuery = `UPDATE match_therapist_questions_options SET option_text = $1 WHERE option_id = $2`;
                    pool.query(updateQuery, [new_option_text, option_id], (err, result) => {
                        if (err) {
                            res.status(500).send(`Error updating record: ${err}`);
                        } else {
                            res.status(200).send({ message: "Option updated successfully" });
                        }
                    });
                    break;
                case "match_therapist_questions":
                    const { id, question_text, category } = req.body;
                    const query = `UPDATE match_therapist_questions SET question_text = $1, category = $2 WHERE id = $3 RETURNING *`;
                    pool.query(query, [question_text, category, id], (err, result) => {
                        if (err) {
                            res.status(500).send(`Error updating question: ${err}`);
                        } else {
                            res.status(200).send({ message: "Question updated successfully", question: result.rows[0] });
                        }
                    });
                    break;
                default:
                    res.status(400).send("Invalid table name");
            }
            break;
        default:
            res.status(400).send("Invalid operation");
    }
};

module.exports = dynamicController;