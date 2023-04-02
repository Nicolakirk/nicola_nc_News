Nicola Kirk - Northcoders News API

https://nc-news-h4q7.onrender.com/api/articles

About
nicola-nc-news is a Reddit Clone built using React. The data is pulled from a custom built api hosted here:



Available Endpoints

GET /api
GET /api/topics
GET /api/articles
GET /api/articles/:article_id
PATCH /api/articles/:article_id
GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments
DELETE /api/comments/:comment_id
GET /api/users


How to install
git clone https://github.com/Nicolakirk/nicola_nc_news.git

Clone the repository from github to your project folder

npm install

Install all the needed node packages

DEPENDENCIES -
You will need to create  .env.development & .env.test files
with the following details added respectively;
PGDATABASE = nc_news

PGDATABASE = nc_news_test
PGDATABASE = nc_news_test

npm start to start the api

Run the app in development mode.


The page will reload if you make edits.
You will also see any errors in the console.

Features
view a list of all articles
view a list of all topics
view an individual article.
view an individual article's comments.
sort articles by: date created, votes
post a new comment to an existing article
delete comments 
vote on an article and see the change.

minimum reqyuirements
node version 2.2
Postgress 