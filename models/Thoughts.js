const mongoose = require("mongoose");
const { Types } = require("mongoose");
const moment = require("moment");
const formatDate = (date) => {
  console.log("DATE", date);
  return moment(date).format("MMM Do, YYYY [at] h:mm a");
};

const reactionSchema = new mongoose.Schema (
    {
        reactionId : {
            type : mongoose.Schema.Types.ObjectId,
            default : () => new Types.ObjectId()
        },
        reactionBody : {
            type : String,
            required :true,
            max : 280
        },
        username: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            //default current timestamp
            default: Date.now,
            //getter method to format
            get: formatDate,
          },
    },
    {
        toJSON: {
          getters: true,
        },
    }
)

const thoughtSchema = new mongoose.Schema (
    {
        thoughtText: {
          type: String,
          required: true,
          max: 280,
          min: 1,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: formatDate,
        },
        username: { 
            type: String,
            required: true,
        },
    
        reactions: [reactionSchema],
      },
      {
        toJSON: {
          getters: true,
        },
        id: false,
      }
)

const Thoughts = mongoose.model("Thoughts", thoughtSchema);
Thoughts.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    Thoughts.insertMany(
      [
        {
          thoughtText: "abc",
          username: "sam",
          reactions: [{ reactionBody: "def", username: "kim" }],
        },
        {
          thoughtText: "xyz",
          username: "kim",
          reactions: [{ reactionBody: "ret", username: "sam" }],
        },
      ],
      (insertErr) => {
        if (insertErr) {
          handleError(insertErr);
        }
      }
    );
  }
});
module.exports = Thoughts;