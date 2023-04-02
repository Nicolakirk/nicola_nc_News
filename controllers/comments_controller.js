const { selectComments, checkArticleIdExists, insertComments, removeCommentsById, } = require("../models/comments_model")



exports.getComments = (req,res, next) =>{
   
    const { article_id } = req.params;
    const commentsPromises = [selectComments(article_id), checkArticleIdExists(article_id) ];
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
    

const commentsPromises = [insertComments(  article_id, commentBody)];
Promise.all(commentsPromises)
.then (([comment])=>{
    res.status(201).send({ comment })
})
.catch((err)=>{
    next( err);
  });

}

exports.deleteComments = (req, res, next) =>{
    const { comment_id }= req.params;

removeCommentsById(comment_id).then((comments)=>{
    res.status(204).send({ comments });
})
.catch((err)=>{
    next(err);
})
};