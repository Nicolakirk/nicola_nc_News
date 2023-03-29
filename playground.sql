\c nc_news

SELECT articles.article_id , COUNT (articles.article_id) AS comment_count
 FROM articles

LEFT JOIN comments 
ON comments.article_id = articles.article_id
GROUP BY articles.article_id
ORDER BY comment_count DESC;

