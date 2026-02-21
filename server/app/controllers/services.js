let servicesModel = require('../models/services');

module.exports.processAdd = async function (req, res, next) {
    try {
        let newService = new servicesModel(req.body);

        let result = await servicesModel.create(newService);
        console.log(result);

        res.status(200)
        res.json({
            success: true,
            message: "Service added successfully.",
            data: result
        });
    } catch (error) {
        console.log(error);
        next(error);
    }

}

module.exports.list = async function (req, res, next) {
    try {
        let list = await servicesModel.find({});

        res.json({
            success: true,
            message: "Services list retrieved successfully.",
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

        let service = await servicesModel.findOne({ _id: id });
        if (!service)
            throw new Error('Service not found. Are you sure it exists?');

        res.json({
            success: true,
            message: "Service retrieved successfully.",
            data: service
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processEdit = async function (req, res, next) {
    try {
        let id = req.params.id;
        let updatedService = new servicesModel(req.body);
        updatedService._id = id;

        let result = await servicesModel.updateOne({ _id: id }, updatedService);
        console.log(result);

        if (result.modifiedCount > 0) {
            res.status(200)
            res.json({
                success: true,
                message: "Service updated successfully."
            });
        }
        else {
            // Express will catch this on its own.
            throw new Error('Service not updated. It does not exist or there is nothing to change.')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}


module.exports.performDelete = async function (req, res, next) {
    try {
        let id = req.params.id;

        let result = await servicesModel.deleteOne({ _id: id });
        console.log(result);

        if (result.deletedCount > 0) {
            res.status(200)
            res.json({
                success: true,
                message: "Service deleted successfully."
            });
        }
        else {
            // Express will catch this on its own.
            throw new Error('Service not deleted. Are you sure the id is correct?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}