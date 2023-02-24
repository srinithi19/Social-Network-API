const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username : {
            type :  String,
            required : true,
            unique : true,
            trim : true
        },
        email : {
            type :  String,
            required : true,
            unique : true,
            validate : {
                validator : function (email) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
                }
            },
            message : "Please enter valid email"
        },
        thoughts : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Thoughts"
            }
        ],
        friends : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User"
            }
        ]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

userSchema.virtual("friendCount").get(function() {
    return this.friends.length;
})

const User = mongoose.model("User",userSchema);

const handleError = (err) => console.error(err);

User.find({}).exec((err, collection) => {
    if (collection.length === 0) {
      User.insertMany(
        [
            { 
            username: "sam", 
            email: "sam@gmail.com" 
            },
            {
            username: "kim",
            email: "kim@gmail.com",
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
  module.exports = User;