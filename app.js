const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topic_controller");
const { handleCustomErrors, badRoute} = require("./controllers/error_controllers")



  app.get('/api/topics', getTopics);



app.use(badRoute);
app.use(handleCustomErrors);

module.exports= app;