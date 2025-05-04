const db = require("../database/pg.database");
const bcrypt = require('bcrypt');

exports.getAllUsers = async () => {
    try {
        const res = await db.query("SELECT * FROM users");
        return res.rows;
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
};

exports.getUserbyEmail = async (email) => {
    try {
        const query = `SELECT * FROM users WHERE email = $1`;
        const res = await db.query(query, [email]);
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
};

exports.registerUser = async (user) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const query = `
            INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [user.name, user.email, hashedPassword];
        const res = await db.query(query, values);
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
};

exports.updateUserbyID = async (user) => {
    try {
        const query = `
            UPDATE users
            SET name = $1, email = $2, password = $3
            WHERE id = $4
            RETURNING *
        `;
        const values = [user.name, user.email, user.password, user.id];
        const res = await db.query(query, values);
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
};

exports.deleteUserID = async (id) => {
    try {
        const query = `
            DELETE FROM users
            WHERE id = $1
            RETURNING *
        `;
        const res = await db.query(query, [id]);
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
};
