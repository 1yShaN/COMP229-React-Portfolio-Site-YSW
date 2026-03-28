let contactsModel = require('../models/contact');

// Add new contact
module.exports.processAdd = async function (req, res, next) {
    try {
        const newContact = await contactsModel.create(req.body);
        res.status(200).json({
            success: true,
            message: "Contact added successfully.",
            data: newContact
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// List contacts
module.exports.list = async function (req, res, next) {
    try {
        const list = await contactsModel.find({});
        res.json({
            success: true,
            message: "Contacts list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Get contact by ID
module.exports.getById = async function (req, res, next) {
    try {
        const contact = await contactsModel.findById(req.params.id);
        if (!contact) throw new Error('Contact not found.');
        res.json({
            success: true,
            message: "Contact retrieved successfully.",
            data: contact
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Update contact (FIX)
module.exports.processEdit = async function (req, res, next) {
    try {
        const updatedContact = await contactsModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // ✅ Only update the fields provided
            { new: true }       // ✅ Return the updated contact
        );

        if (!updatedContact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found"
            });
        }

        res.json({
            success: true,
            message: "Contact updated successfully",
            data: updatedContact
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Delete contact
module.exports.performDelete = async function (req, res, next) {
    try {
        const result = await contactsModel.deleteOne({ _id: req.params.id });

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: "Contact deleted successfully"
            });
        } else {
            throw new Error('Contact not deleted. ID may be incorrect.');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};