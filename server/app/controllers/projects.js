let projectsModel = require('../models/projects');

// CREATE
module.exports.processAdd = async function (req, res, next) {
    try {
        let result = await projectsModel.create(req.body);

        res.status(200).json({
            success: true,
            message: "project added successfully.",
            data: result
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// READ ALL
module.exports.list = async function (req, res, next) {
    try {
        let list = await projectsModel.find({});

        res.json({
            success: true,
            message: "projects list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// READ ONE
module.exports.getById = async function (req, res, next) {
    try {
        let id = req.params.id;

        let project = await projectsModel.findById(id);

        if (!project)
            throw new Error('project not found.');

        res.json({
            success: true,
            message: "project retrieved successfully.",
            data: project
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

//  UPDATE 
module.exports.processEdit = async function (req, res, next) {
    try {
        let id = req.params.id;

        let result = await projectsModel.findByIdAndUpdate(
            id,
            req.body,                //  directly update with body
            { new: true }           //  return updated doc
        );

        if (result) {
            res.status(200).json({
                success: true,
                message: "project updated successfully.",
                data: result
            });
        } else {
            throw new Error('project not found.');
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
};

// DELETE
module.exports.performDelete = async function (req, res, next) {
    try {
        let id = req.params.id;

        let result = await projectsModel.findByIdAndDelete(id);

        if (result) {
            res.status(200).json({
                success: true,
                message: "project deleted successfully."
            });
        } else {
            throw new Error('project not found.');
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
};
