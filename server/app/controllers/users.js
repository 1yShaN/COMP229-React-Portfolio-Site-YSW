let usersModel = require('../models/users');

module.exports.processAdd = async function (req, res, next) {
    try {
        console.log("Incoming:", req.body); // 👈 IMPORTANT DEBUG

        let newUser = new usersModel({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        });

        let result = await usersModel.create(newUser);

        res.json({
            success: true,
            data: result
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.list = async function (req, res, next) {
    try {
        let list = await usersModel.find({});

        res.json({
            success: true,
            message: "Users list retrieved successfully.",
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

        let user = await usersModel.findOne({ _id: id });
        if (!user)
            throw new Error('User not found. Are you sure it exists?');

        res.json({
            success: true,
            message: "User retrieved successfully.",
            data: user
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processEdit = async function (req, res, next) {
    try {
        let id = req.params.id;

        let result = await usersModel.updateOne(
            { _id: id },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    role: req.body.role
                }
            }
        );

        console.log(result);

        if (result.modifiedCount > 0) {
            res.status(200).json({
                success: true,
                message: "User updated successfully."
            });
        } else {
            throw new Error('User not updated. It may not exist.');
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
};


module.exports.performDelete = async function (req, res, next) {
    try {
        let id = req.params.id;

        let result = await usersModel.deleteOne({ _id: id });
        console.log(result);

        if (result.deletedCount > 0) {
            res.status(200)
            res.json({
                success: true,
                message: "User deleted successfully."
            });
        }
        else {
            // Express will catch this on its own.
            throw new Error('User not deleted. Are you sure the id is correct?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}