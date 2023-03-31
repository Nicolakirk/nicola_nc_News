const db = require("../db/connection");

exports.selectArticles = (id) => {
  
           return db.query (  `
           SELECT * from articles 
           where article_id = $1`, [id])
            .then((result) => {
              if (result.rows.length === 0) {
                return Promise.reject({
                  status: 404,
                  msg: "Article can't be found",
                });
              } else {
                return result.rows[0];
              }
            });
          };
      
           

    exports.selectAllArticles = () =>{
      
      return db.query ( `SELECT articles.* , CAST (COUNT (articles.article_id) AS INT) AS comment_count
      FROM articles
     
     LEFT JOIN comments 
     ON comments.article_id = articles.article_id
     GROUP BY articles.article_id
     ORDER BY created_at DESC;`, )
       .then((result) => {
           return result.rows;
         })
       };


       exports.addVotesbyArticle = (id, votes_id) =>{
       
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


      //   return db.query(psqlQuery,[ article_id, inc_votes]).then((result)=>{
      //     if (result.rows.length === 0) {
      //       return Promise.reject({
      //         status: 404,
      //         msg: "Article can't be found",
      //       });
      //     } else {
      //       return result.rows[0];
  
      //     }
      //   });
      // };
