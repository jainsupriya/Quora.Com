const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var validate = require("mongoose-validator");
// const bcrypt = require("bcryptjs");
const Question = require("./question");
const Answer = require("./answer");
const Topic = require("./topic");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

// sample: {
//     type: String | Number | Date | Boolean,
//     required: [true,"User Name is required"],
//     trim: true,
//     lowercase: true,
//     unique: true,
//     validate: [validateEmail, 'Please fill a valid email address'],
//     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
//     default: false,
// },

const UserSchema = new Schema({
    fname: {
        type: String,
        required: [true, "First Name is required"]
    },
    lname: {
        type: String,
        required: [true, "Last Name is required"]
    },
    username: {
        type: String,
        required: [true, "Last Name is required"]
    },
    mobile: {
        type: String,
        required: [true, "Mobile number is required"]
    },
    dob: {
        type: Date,
        required: [true, "Date of birth is required"]
    },
    gender: {
        type: String,
        required: [true, "Gender is required"]
    },
    email: {
        type: String,
        required: [true, "Email address is required"],
        trim: true,
        lowercase: true,
        unique: false,
        validate: [validateEmail, "Please fill a valid email address"]
    },
    profileViews: [
        {
            type: Date,
        }
    ],
    // password: {
    //     type: String,
    //     required: [true, "Password is required"]
    // },
    sqlUserId:{
        type: String
    },
    employment: {
        position: {
            type: String
        },
        company: {
            type: String
        },
        startYear: {
            type: Date
        },
        endYear: {
            type: Date
        },
        current: {
            type: Boolean
        },
        description: {
            type: String
        }
    },
    education: {
        school: {
            type: String
        },
        Concentration: {
            type: String
        },
        secondaryConcentration: {
            type: String
        },
        degreeType: {
            type: String
        },
        graduationYear: {
            type: Date
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    },
    location: {
        locationName: {
            type: String
        },
        startYear: {
            type: String
        },
        endYear: {
            type: String
        },
        current: {
            type: Boolean,
            default: false
        }
    },
    profileImg: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipCode: {
        type: String
    },
    aboutMe: {
        type: String
    },
    profileCredential: {
        type: String
    },
    followingUserList: [this],
    followersUserList: [this],
    questionFollowingList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Question
        }
    ],
    topicFollowingList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Topic
        }
    ],
    bookmarkedQuestionList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Question
        }
    ],
    bookmarkedAnswerList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Answer
        }
    ],
    myQuestionList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Question
        }
    ],
    myAnswerList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Answer
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    }
});

//authenticate input against database

// UserSchema.statics.authenticate = function(email, password, callback) {
//     User.findOne({ email: email }).exec(function(err, user) {
//         if (err) {
//             return callback(err);
//         } else if (!user) {
//             var err = new Error("User not found.");
//             err.status = 401;
//             return callback(err);
//         }
//         bcrypt.compare(password, user.password, function(err, result) {
//             if (result === true) {
//                 return callback(null, user);
//             } else {
//                 return callback();
//             }
//         });
//     });
// };

// //hashing a password before saving it to the database
// UserSchema.pre("save", function(next) {
//     var user = this;
//     bcrypt.hash(user.password, 10, function(err, hash) {
//         if (err) {
//             return next(err);
//         }
//         user.password = hash;
//         next();
//     });
// });

const User = mongoose.model("user", UserSchema);

module.exports = User;
