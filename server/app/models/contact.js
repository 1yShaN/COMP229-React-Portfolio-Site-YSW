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
        delete ret._id;
    }
});

module.exports = mongoose.model("contacts", contactsModel);