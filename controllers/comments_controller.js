const { selectComments, checkArticleIdExists } = require("../models/comments_model")



exports.getComments = (req,res, next) =>{
   
    const { article_id } = req.params;
    const commentsPromises = [selectComments(article_id),checkArticleIdExists ];
    Promise.all(commentsPromises)
    .then(([comments])=>{
        res.status(200).send({ comments })
    })
    .catch((err)=>{
        next (err);
    })
};