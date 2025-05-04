const db = require("../database/pg.database");

exports.getNotes = async () => {
    try {
        const res = await db.query("SELECT * FROM notes");
        return res.rows;
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.getNotesByUserId = async (userId) => {
    try {
        const res = await db.query("SELECT * FROM notes WHERE user_id = $1", [userId]);
        return res.rows;
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.createNote = async (note) => {
    try {
        const query = `
            INSERT INTO notes (user_id, title, content)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [note.user_id, note.title, note.content];
        const res = await db.query(query, values);
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.updateNote = async (id, note) => {
    try {
        const query = `
            UPDATE notes
            SET title = $1, content = $2
            WHERE id = $3
            RETURNING *
        `;
        const values = [note.title, note.content, id];
        const res = await db.query(query, values);
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.deleteNote = async (id) => {
    try {
        const query = `
            DELETE FROM notes
            WHERE id = $1
            RETURNING *
        `;
        const res = await db.query(query, [id]);
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};
