const { selectArticles } = require("../models/article_model");


exports.getArticles = (req, res, next) =>{
 
    const { article_id } = req.params;

    selectArticles(article_id).then((output) => {
        res.status(200).send({ output });
      })
      .catch((err)=>{
        next( err);
      });
    };