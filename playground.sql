\c nc_news
INSERT INTO comments
    ( article_id, author, body)
    VALUES
    (1,'jessjelly','this is waht i want to say');
SELECT * FROM comments WHERE author= 'jessjelly';

