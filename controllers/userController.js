const {User,Thoughts} = require("../models");
const getUsers = (req,res) => {
    User.find()
    .populate("thoughts")
    .populate("friends")
    .select("-__v")
    .then((result) => {
        console.log(result);
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

const getSingleUser = (req,res) => {
    User.findOne({ _id: req.params._id })
    .populate("thoughts")
    .populate("friends")
    .select("-__v")
    .then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(500).json(err);
    });
}

const createUser = (req,res) => {
    User.create(req.body)
    .then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(500).json(err);
    });

}
