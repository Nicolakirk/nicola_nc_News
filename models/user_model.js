const { ident } = require("pg-format");
const { use } = require("../app");
const db = require("../db/connection");



exports.selectUsers = () =>{
return db.query(`SELECT * FROM USERS;`, [])
.then ((result)=>{
    return result.rows
})


}