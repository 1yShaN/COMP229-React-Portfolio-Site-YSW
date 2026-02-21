let ProjectsModel = require('../models/projects');

module.exports.processAdd = async function (req, res, next) {
    try {
        let newProject = new ProjectsModel(req.body);

        let result = await ProjectsModel.create(newProject);
        console.log(result);

        res.status(200)
        res.json({
            success: true,
            message: "Project added successfully.",
            data: result
        });
    } catch (error) {
        console.log(error);
        next(error);
    }

}

module.exports.list = async function (req, res, next) {
    try {
        let list = await ProjectsModel.find({});

        res.json({
            success: true,
            message: "Projects list retrieved successfully.",
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

        let project = await ProjectsModel.findOne({ _id: id });
        if (!project)
            throw new Error('Project not found. Are you sure it exists?');

        res.json({
            success: true,
            message: "Project retrieved successfully.",
            data: project
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processEdit = async function (req, res, next) {
    try {
        let id = req.params.id;
        let updatedProject = new ProjectsModel(req.body);
        updatedProject._id = id;

        let result = await ProjectsModel.updateOne({ _id: id }, updatedProject);
        console.log(result);

        if (result.modifiedCount > 0) {
            res.status(200)
            res.json({
                success: true,
                message: "Project updated successfully."
            });
        }
        else {
            // Express will catch this on its own.
            throw new Error('Project not updated. It does not exist or there is nothing to change.')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}


module.exports.performDelete = async function (req, res, next) {
    try {
        let id = req.params.id;

        let result = await ProjectsModel.deleteOne({ _id: id });
        console.log(result);

        if (result.deletedCount > 0) {
            res.status(200)
            res.json({
                success: true,
                message: "Project deleted successfully."
            });
        }
        else {
            // Express will catch this on its own.
            throw new Error('Project not deleted. Are you sure the id is correct?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}