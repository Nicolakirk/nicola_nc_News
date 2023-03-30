const { selectComments, checkArticleIdExists, insertComments } = require("../models/comments_model")



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

exports.postComments = (req, res, next)=>{
    const  article_id = req.params;
    const commentBody =  req.body;
    

insertComments(  article_id, commentBody)
.then ((comment)=>{
   
    res.status(201).send({comment: comment})
})
.catch((err)=>{
    next( err);
  });

}