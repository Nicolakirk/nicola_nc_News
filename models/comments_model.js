const { ident } = require("pg-format");
const { use } = require("../app");
const db = require("../db/connection");


exports.selectComments = (id) => {
   
    const queryString = `SELECT * FROM comments
    Where article_id = $1
    GROUP by article_id, comments.comment_id
    ORDER BY created_at DESC;`
    return db.query(queryString, [id])
    .then ((result)=>{
 return result.rows;

    })

};

exports.checkArticleIdExists= (article_id)=>{
    return db.query(' SELECT * FROM articles WHERE article_id =$1;', [article_id])
    .then((result)=>{
        if(result.rowCount === 0){
            return Promise.reject({status:404, msg: 'Article id not found'});
        } else {
            return true;
        }
    })
}

exports.checkUserExists= (username)=>{
    return db.query(' SELECT * FROM users WHERE username=$1;', [username])
    .then((result)=>{
        if(result.rowCount === 0){
            console.log(msg)
            return Promise.reject({status:404, msg: 'Invalid username'});
        } else {
            return true;
        }
    })
}

exports.insertComments = ( id, commentbody) => {
    const { article_id } = id
    const { username , body } = commentbody
   

    if (username === undefined || username.length === 0 ) {
        return Promise.reject({ status: 400, msg: "invalid input" });
    }
    if (body === undefined || body.length === 0 || typeof body !== "string") {
        return Promise.reject({ status: 400, msg: "invalid input" });
    }
   
   const psqlQuery = `
    INSERT INTO comments
    (article_id, author, body)
    VALUES
    ($1, $2, $3)
    RETURNING *;`
   
  
  return db.query(psqlQuery,[ article_id, username, body]).then((result)=>{
   
 
                return result.rows[0];
              })
    
      }