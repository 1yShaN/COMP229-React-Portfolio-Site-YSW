let mongoose = require('mongoose');

let contactsModel = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        message: String,
    },
    {
        collection: "contacts"
    }
);

// Ensure virtual fields are serialised.
contactsModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret._id = ret._id; // ensure it exists
    }
});

module.exports = mongoose.model("contacts", contactsModel);