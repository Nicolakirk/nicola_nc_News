const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topic_controller");
const{ getArticles, getAllArticles} = require("./controllers/article_controller")
const { handleCustomErrors, badRoute} = require("./controllers/error_controllers");
const { getComments } = require("./controllers/comments_controller");



  app.get('/api/topics', getTopics);
  app.get('/api/articles', getAllArticles);

  app.get('/api/articles/:article_id',  getArticles);

  app.get('/api/articles/:article_id/comments', getComments);
  



app.use(badRoute);
app.use(handleCustomErrors);

module.exports= app;