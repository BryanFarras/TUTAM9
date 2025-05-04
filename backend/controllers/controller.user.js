const userRepository = require("../repositories/repository.user.js");
const baseResponse = require("../utils/baseResponse.js");
const { validateUserInput } = require('../utils/validator.js');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();
        baseResponse(res, true, 200, "Retrieving all users success", users);
    } catch (error) {
        baseResponse(res, false, 500, error.message || "Internal server error", null);
    }
};

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return baseResponse(res, false, 400, "Bad request, missing parameters", null);
    }

    const validation = validateUserInput(name, email, password);
    if (!validation.valid) return baseResponse(res, false, 400, validation.message, null);

    try {
        const existingUser = await userRepository.getUserbyEmail(email);
        if (existingUser) {
            return baseResponse(res, false, 400, "Email already used", null);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userRepository.registerUser({ name, email, password: hashedPassword });
        baseResponse(res, true, 201, "User created successfully", user);
    } catch (error) {
        baseResponse(res, false, 500, error.message || "Internal server error", null);
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return baseResponse(res, false, 400, "Bad request, email and password are required", null);
    }

    try {
        const user = await userRepository.getUserbyEmail(email);

        if (!user) {
            return baseResponse(res, false, 400, "Invalid email or password", null);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return baseResponse(res, false, 401, "Incorrect password", null);

        return baseResponse(res, true, 200, "Login success", user);
    } catch (error) {
        return baseResponse(res, false, 500, error.message || "Internal server error", null);
    }
};

exports.updateUserbyID = async (req, res) => {
    const { id, name, email, password } = req.body;

    if (!id || !name || !email || !password) {
        return baseResponse(res, false, 400, "Bad request, missing parameters", null);
    }
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await userRepository.updateUserbyID({ id, name, email, password: hashedPassword });
        if (!updatedUser) {
            return baseResponse(res, false, 404, "User not found", null);
        }

        baseResponse(res, true, 200, "User updated successfully", updatedUser);
    } catch (error) {
        baseResponse(res, false, 500, error.message || "Internal server error", null);
    }
};

exports.deleteUserID = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return baseResponse(res, false, 400, "Bad request, ID is required", null);
    }

    try {
        const deletedUser = await userRepository.deleteUserID(id);
        if (!deletedUser) {
            return baseResponse(res, false, 404, "User not found", null);
        }

        baseResponse(res, true, 200, "User deleted successfully", deletedUser);
    } catch (error) {
        baseResponse(res, false, 500, error.message || "Internal server error", null);
    }
};

exports.getUserbyEmail = async (req, res) => {
    const { email } = req.params;

    if (!email) {
        return baseResponse(res, false, 400, "Bad request, email is required", null);
    }

    try {
        const user = await userRepository.getUserbyEmail(email);
        if (!user) {
            return baseResponse(res, false, 404, "User not found", null);
        }

        baseResponse(res, true, 200, "User found", user);
    } catch (error) {
        baseResponse(res, false, 500, error.message || "Internal server error", null);
    }
};
