let referencesModel = require('../models/references');

module.exports.processAdd = async function (req, res, next) {
    try {
        let newReference = new referencesModel(req.body);

        let result = await referencesModel.create(newReference);
        console.log(result);

        res.status(200)
        res.json({
            success: true,
            message: "Reference added successfully.",
            data: result
        });
    } catch (error) {
        console.log(error);
        next(error);
    }

}

module.exports.list = async function (req, res, next) {
    try {
        let list = await referencesModel.find({});

        res.json({
            success: true,
            message: "References list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.getById = async function (req, res, next) {
    try {
        let id = req.params.id;

        let reference = await referencesModel.findOne({ _id: id });
        if (!reference)
            throw new Error('Reference not found. Are you sure it exists?');

        res.json({
            success: true,
            message: "Reference retrieved successfully.",
            data: reference
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processEdit = async function (req, res, next) {
    try {
        let id = req.params.id;
        let updatedReference = new referencesModel(req.body);
        updatedReference._id = id;

        let result = await referencesModel.updateOne({ _id: id }, updatedReference);
        console.log(result);

        if (result.modifiedCount > 0) {
            res.status(200)
            res.json({
                success: true,
                message: "Reference updated successfully."
            });
        }
        else {
            // Express will catch this on its own.
            throw new Error('Reference not updated. It does not exist or there is nothing to change.')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}


module.exports.performDelete = async function (req, res, next) {
    try {
        let id = req.params.id;

        let result = await referencesModel.deleteOne({ _id: id });
        console.log(result);

        if (result.deletedCount > 0) {
            res.status(200)
            res.json({
                success: true,
                message: "Reference deleted successfully."
            });
        }
        else {
            // Express will catch this on its own.
            throw new Error('Reference not deleted. Are you sure the id is correct?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}