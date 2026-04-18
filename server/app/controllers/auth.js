let User = require('../models/users');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let { expressjwt } = require('express-jwt');

let secretKey = process.env.SECRETKEY || 'dev_secret_key';
const ALLOWED_ROLES = ['Admin', 'User'];

module.exports.signup = async function (req, res, next) {
    try {
        let { name, email, role, password } = req.body;

        if (!name || !email || !password) {
            throw new Error('Name, email, and password are required.');
        }

        let normalizedRole = ALLOWED_ROLES.includes(role) ? role : 'User';
        let normalizedEmail = String(email).trim().toLowerCase();

        let existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            throw new Error('An account with this email already exists.');
        }

        let passwordHash = await bcrypt.hash(password, 10);

        let result = await User.create({
            name,
            email: normalizedEmail,
            role: normalizedRole,
            passwordHash
        });

        res.json({
            success: true,
            message: 'User signed up successfully.',
            data: result.toJSON()
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.signin = async function (req, res, next) {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Email and password are required.');
        }

        let normalizedEmail = String(email).trim().toLowerCase();

        let user = await User.findOne({ email: normalizedEmail });
        if (!user || !user.authenticate(password)) {
            throw new Error('Email and/or password do not match.');
        }

        let payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        let token = jwt.sign(payload, secretKey, {
            algorithm: 'HS256',
            expiresIn: '1h'
        });

        res.json({
            success: true,
            message: 'User authenticated successfully.',
            token,
            data: user.toJSON()
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.validateToken = expressjwt({
    secret: secretKey,
    algorithms: ['HS256'],
    requestProperty: 'auth'
});

module.exports.requireAdmin = async function (req, res, next) {
    try {
        if (!req.auth || req.auth.role !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access is required.'
            });
        }

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.logToken = async function(req, res, next){
    console.log(req.headers);
    console.log(req.auth);
    next();
}