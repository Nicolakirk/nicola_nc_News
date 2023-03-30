\c nc_news

UPDATE articles 
        SET votes = votes + 10 
        WHERE article_id = 1;
        SELECT * from articles;