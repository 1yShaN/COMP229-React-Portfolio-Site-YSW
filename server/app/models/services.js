let mongoose = require('mongoose');

let servicesModel = mongoose.Schema(
    {
        title: String,
        description: String
    },
    
    {
        collection: "services"
    }
);

// Ensure virtual fields are serialised.
servicesModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id;   // ✅ keep id for frontend
        delete ret._id;
    }
});

module.exports = mongoose.model("Services", servicesModel);