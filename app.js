const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topic_controller");
const { handleCustomErrors} = require("./controllers/error_controllers")

app.use(express.json());


  app.get('/api/topics', getTopics);




app.use(handleCustomErrors);

module.exports= app;