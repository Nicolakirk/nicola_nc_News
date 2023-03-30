\c nc_news
FROM users
JOIN comments
AT comments_author = users.username
SELECT * FROM users 
WHERE username = 'jessjelly';

