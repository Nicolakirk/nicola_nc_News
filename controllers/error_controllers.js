
exports.badRoute = (req, res) => {
    res.status(404).send({ message: "invalid url" });
};

exports.handleCustomErrors = (err, req, res, next) =>{
    if (err.status && err.msg){
        res.status( err.status).send({msg: err.msg});

    }else {
        next(err);
    }
};

