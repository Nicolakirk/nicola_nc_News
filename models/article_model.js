const db = require("../db/connection");

exports.selectArticles = (id ) => {

       return db.query (  `
       SELECT articles.*,CAST (COUNT(comments.article_id)AS INT) AS comment_count
       FROM articles 
       LEFT JOIN comments
       ON articles.article_id = comments.article_id 
       WHERE articles.article_id = $1
       GROUP BY articles.article_id`, [id])
            .then((result) => {
              if (result.rows.length === 0) {
                return Promise.reject({
                  status: 404,
                  msg: "Article can't be found",
                })
              } else {
                
                return result.rows[0];
              
              }
            
            });
          };
      
           

    exports.selectAllArticles = (topic, sort_by = "created_at" , order = "desc") =>{
     
      
     let queryString = `SELECT articles.* , CAST (COUNT (articles.article_id) AS INT) AS comment_count
      FROM articles 
      LEFT JOIN comments 
     ON comments.article_id = articles.article_id
     GROUP BY articles.article_id
     ORDER BY created_at DESC`

     const queryPsql = `SELECT * FROM articles WHERE topic = $1`
     const sortQuery = `SELECT * FROM articles 
       ORDER BY ${sort_by} DESC`
  //   const sortQuery =`SELECT articles.* , CAST (COUNT (articles.article_id) AS INT) AS comment_count
  //   FROM articles 
  //   LEFT JOIN comments 
  //  ON comments.article_id = articles.article_id
  //  GROUP BY articles.article_id
  //  ORDER BY ${sort_by} DESC`


         const orderQuery =` SELECT * FROM articles 
         ORDER BY article_id ${order}`
         
         if (!["asc", "desc"].includes(order)) {
          return Promise.reject({ status: 400, msg: "invalid order query" })
         }
          if ( !["title","topic", "author", "created_at", "article_id" ].includes(sort_by)){
            return Promise.reject({status:400, msg :"Invalid sort query"})
        }
         if (!topic  && sort_by === "created_at" && order === "desc"){
          return db.query (queryString, []).then ((result)=>{
            console.log(result.rows)
              return result.rows
            })
            }
          
  if (topic && sort_by && order) {
  
   return db.query(queryPsql,[topic])
    .then ((result) =>{
     
    return result.rows
  
 })  
  
  }
   if (!topic && sort_by !== "created_at"){
    return db.query(sortQuery, []).then((result)=>{
      console.log(result.rows)
      return result.rows
})
     
   
  
  }if ( !topic && sort_by === "created_at"){
    return db.query(orderQuery, []).then((result)=>{
     
      return result.rows;
    })
  }
}

exports.checkTopicExists = (topic) => {

return db.query(` SELECT * FROM topics WHERE slug = $1`, [topic])
  .then((result)=>{

if(result.rowCount === 0){

          return Promise.reject({status:404, msg: 'Topic not found'})
      } else {
          return result.rows[0]
      }
  })
};

   

      


       exports.addVotesbyArticle = (id, votes_id) => {
       
        const { article_id } = id
        const { inc_votes} = votes_id
     
        const psqlQuery = `
        UPDATE articles 
        SET votes = votes + $2 
        WHERE article_id = $1
        RETURNING *;`
        const firstPsqlQuery = `SELECT * from articles WHERE article_id =$1;`

        if ( Object.keys(votes_id)=== 0){
          return Promise.reject ({status:400, msg:"Bad Request"});
        }
        return db.query(firstPsqlQuery, [article_id])
        .then((results)=>{
          if (results.rows.length === 0){
            return Promise.reject({
              status :404, msg: "Not found"
            });
          }else {return db.query(psqlQuery,[ article_id, inc_votes] )}
        }).then((results)=>{
         
          return results.rows[0]
        
        })
      }