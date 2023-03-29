const db = require("../db/connection");


exports.selectComments = (id)=>{
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