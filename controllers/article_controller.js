const articles = require("../db/data/test-data/articles");
const { selectAllArticles, addVotesbyArticle, checkTopicExists } = require("../models/article_model");
const { selectArticles, s } = require("../models/article_model");


  exports.getArticles = (req, res, next) =>{
    const { article_id } = req.params;
    
      selectArticles(article_id).then((article) => {
            res.status(200).send({ article });
          })
          .catch((err)=>{
            next( err);
          });
        };

        exports.getAllArticles = (req, res, next)=>{

         const { topic, sort_by, order }  = req.query;
        
        const articlesPromises = [selectAllArticles(topic, sort_by, order)];
       if (topic) {
        articlesPromises.push(checkTopicExists(topic))
      }Promise.all(articlesPromises)
      .then (([articles]) =>{
         res.status(200).send({ articles} );
          })
          .catch((err)=>{
            next( err);
          });
        };

        exports.patchVotesforComments = (req, res, next) =>{
          
          const  article_id = req.params;
          const increment = req.body
        addVotesbyArticle(article_id, increment)
    .then((article)=>{
      
  res.status(201).send({ article })
})
.catch((err)=>{
  next( err);
});
        }

        exports.queryArticles = (req,res,next) =>{
         
          const { filter } = req.query;
          console.log (filter);
       selectArticles(filter)
        .then((articles)=>{
            res.status(200).send({articles: articles});
          })
          .catch((err)=>{
            next(err);
          })
        }