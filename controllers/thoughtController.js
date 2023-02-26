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
    console.log(req.body.id)
    Thoughts.create(req.body)
    .then((thought)=> {
        console.log
        return User.findOneAndUpdate(
            { _id : req.body.id },
            { $push : { thoughts : thought.id }},
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
    Thoughts.findOneAndDelete({ _id : req.params.id })
    .then((thought)=>{
        if (!thought)
        res.status(404).json({ message: "No thought with that id" });
    })
    return User.findOneAndUpdate(
        { _id : req.body.id },
        { $pull : { thoughts : req.params.id}},
        {new : true}
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
        { _id : req.params.id },
        { $set : req.body },
        { new : true }
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

const createReaction = (req,res)=> {
    Thoughts.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
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

const deleteReaction = (req, res) => {
    console.log(req.params.id)
    console.log(req.params.reactionId)

    Thoughts.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  }


  module.exports = {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction,
  };