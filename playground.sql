\c nc_news
SELECT articles.* , CAST (COUNT (articles.article_id) AS INT) AS comment_count
      FROM articles 
      LEFT JOIN comments 
     ON comments.article_id = articles.article_id
     GROUP BY articles.article_id
     ORDER BY votes DESC
