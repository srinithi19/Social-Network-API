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

const updateUser = (req,res) => {
    User.findOneAndUpdate(
        {_id: req.params._id },
        { $set : req.body },
        { runValidators : true,
        new : true })
        .then((user)=> {
            if(!user) {
                res.status(404).json({ message: "no user with this id" });
            }
            else {
                res.json(user)
            }
        })
        .catch((err) => res.status(500).json(err));
}

const deleteUser = (req,res) => {
    User.findOneAndDelete({ _id: req.params._id })
    .then((user) => {
        !user 
            ? res.status(404).json({ message: "No user w that id" }) 
            : Thoughts.deleteMany({
                _id: { $in: user.thoughts },
            })
            res.status(200).json({ message: "Sucessfully deleted" });
    })
    .catch((err) => res.status(500).json(err));
}