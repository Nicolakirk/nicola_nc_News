const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topic_controller");
const{ getArticles, getAllArticles, patchVotesforComments} = require("./controllers/article_controller")
const { handleCustomErrors, badRoute, handle500Statuses, handlePSQL400s} = require("./controllers/error_controllers");

const { getComments, postComments } = require("./controllers/comments_controller");
const { getUsers } = require("./controllers/user_controller");
=======
const { getComments, postComments, deleteComments, getAllComments,  } = require("./controllers/comments_controller");


app.use(express.json());




  app.get('/api/topics', getTopics);
  app.get('/api/articles', getAllArticles);

  app.get('/api/articles/:article_id',  getArticles);

  app.get('/api/articles/:article_id/comments', getComments);
  
  app.get('/api/users', getUsers);

  app.post('/api/articles/:article_id/comments', postComments);


  app.delete('/api/comments/:comment_id', deleteComments);

  app.get('/api/comments', getAllComments)

  app.patch('/api/articles/:article_id', patchVotesforComments);



app.use(badRoute);
app.use(handleCustomErrors);
app.use(handlePSQL400s);
app.use(handle500Statuses);


module.exports= app;