const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topic_controller");
const{ getArticles, getAllArticles, patchVotesforComments} = require("./controllers/article_controller")
const { handleCustomErrors, badRoute, handle500Statuses, handlePSQL400s} = require("./controllers/error_controllers");
const { getComments, postComments } = require("./controllers/comments_controller");

app.use(express.json());




  app.get('/api/topics', getTopics);
  app.get('/api/articles', getAllArticles);

  app.get('/api/articles/:article_id',  getArticles);

  app.get('/api/articles/:article_id/comments', getComments);
  

  app.post('/api/articles/:article_id/comments', postComments);

  app.patch('/api/articles/:article_id', patchVotesforComments);



app.use(badRoute);
app.use(handleCustomErrors);
app.use(handlePSQL400s);
app.use(handle500Statuses);


module.exports= app;