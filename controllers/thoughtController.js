const { Thoughts, User } = require("../models");

const getThoughts = (req,res)=> {
    Thoughts.find({}, (err,result)=> {
        if (result)
         res.status(200).json(result)
        else
        res.status(500).json(err)
    })
}

const getSingleThought = (req,res) => {
    Thoughts.findOne({ _id : req.params.id })
    .then((thought)=> res.json(thought))
    .catch((err)=> res.status(500).json(err))
}

