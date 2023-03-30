
exports.badRoute = (req, res) => {
    res.status(404).send({ message: "Not found" });
};

exports.handleCustomErrors = (err, req, res, next) =>{
  
    if (err.status && err.msg){
        res.status( err.status).send({msg: err.msg});

    }else {
        next(err);
    }
};
exports.handlePSQL400s = (err, req, res, next) =>{
    if (err.code === '22P02'){
        res.status(400).send({msg:'Bad Request'})
    }else if (err.code === '23503') {
            res.status(404).send({ message: "Invalid content" });
    } else {
        next(err);
    }

};

exports.handle500Statuses = (err, req, res, next) =>{
    console.log(err);
    res.satus(500).send({msg: 'Oops we made a server error'});
};

