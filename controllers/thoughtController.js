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


const createThought = (req,res) => {
    Thoughts.create(req.body)
    .then((thought)=> {
        return User.findOneAndUpdate(
            { _id : req.params._id },
            { $push : { thoughts : thought._id }},
            { new : true }
        )
    })
    .then((user)=> {
        if (user)
            res.json({message:"Thought created successfully"})
        else
        res.status(404).json({ message: "no user found" });
    })
    .catch((err)=>{
        return res.status(500).json(err);
    })
}

const deleteThought = (req,res)=> {
    Thoughts.findOneAndDelete({ _id : req.params._id })
    .then((thought)=>{
        if (!thought)
        res.status(404).json({ message: "No thought with that id" });
    })
    return User.findOneAndUpdate(
        { _id : req.params._id },
        { $pull : { thoughts : req.params._id}},
        {new : True}
    )
    .then((user)=>{
        if(user)
            res.json({message : "Thought deleted"})
        else
            return res.status(404).json({ message: "no user with this id" });
    })
    .catch((err)=>{
        res.status(500).json(err);
    })
}

const updateThought = (req,res)=> {
    Thoughts.findOneAndUpdate(
        { _id : req.params._id },
        { $set : req.body },
        {new : True}
    )
    .then((thought)=>{
        if (thought)
            res.json(thought)
        else
            res.status(404).json({ message: "No thought with that id" });
    })
    .catch((err)=>{
        res.status(500).json(err);
    })
}