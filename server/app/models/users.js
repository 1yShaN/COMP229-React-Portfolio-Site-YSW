let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

let usersModel = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true
        },
        role: {
            type: String,
            enum: ['Admin', 'User'],
            default: 'User'
        },
        passwordHash: {
            type: String,
            default: ''
        }
    },
    {
        collection: "users"
    }
);

//Ensure virtual fields are serialised.
usersModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.passwordHash;
    }
});

usersModel.methods.authenticate = function (password) {
    if (!this.passwordHash) {
        return false;
    }

    return bcrypt.compareSync(password, this.passwordHash);
};


module.exports = mongoose.model("Users", usersModel);