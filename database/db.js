const {Pool}= require('pg')

const pool =new Pool({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"Shakthiopen12@",
    database:"swasthmind_dev"
})

module.exports=pool