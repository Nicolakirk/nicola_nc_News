const db = require("../db/connection");

exports.selectArticles = (id) => {
  
           return db.query (  `SELECT articles.*, COUNT(comments.article_id) AS comment_count
           FROM articles 
          JOIN COMMENTS
           ON articles.article_id = comments.article_id 
           WHERE articles.article_id = $1
           GROUP BY articles.article_id
           ;`, [id])
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
      
           

          // 
