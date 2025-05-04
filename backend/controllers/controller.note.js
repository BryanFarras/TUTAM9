const noteRepository = require("../repositories/repository.note.js");
const baseResponse = require("../utils/baseResponse.js");

exports.getAllNotes = async (req, res) => {
    try {
        const notes = await noteRepository.getNotes();
        baseResponse(res, true, 200, "Retrieving all notes success", notes);
    } catch (error) {
        baseResponse(res, false, 500, error.message || "Internal server error", null);
    }
};

exports.getNotesByUserId = async (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return baseResponse(res, false, 400, "Bad request, user_id is required", null);
    }

    try {
        const notes = await noteRepository.getNotesByUserId(user_id);
        baseResponse(res, true, 200, "Notes retrieved successfully", notes);
    } catch (error) {
        baseResponse(res, false, 500, error.message || "Internal server error", null);
    }
};

exports.createNote = async (req, res) => {
    const { user_id, title, content } = req.body;

    if (!user_id || !title || !content) {
        return baseResponse(res, false, 400, "Bad request, missing parameters", null);
    }

    try {
        const note = await noteRepository.createNote({ user_id, title, content });
        baseResponse(res, true, 201, "Note created successfully", note);
    } catch (error) {
        baseResponse(res, false, 500, error.message || "Internal server error", null);
    }
};

exports.updateNote = async (req, res) => {
    const { id, title, content } = req.body;

    if (!id || !title || !content) {
        return baseResponse(res, false, 400, "Bad request, missing parameters", null);
    }

    try {
        const updatedNote = await noteRepository.updateNote(id, { title, content });
        if (!updatedNote) {
            return baseResponse(res, false, 404, "Note not found", null);
        }

        baseResponse(res, true, 200, "Note updated successfully", updatedNote);
    } catch (error) {
        baseResponse(res, false, 500, error.message || "Internal server error", null);
    }
};

exports.deleteNote = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return baseResponse(res, false, 400, "Bad request, ID is required", null);
    }

    try {
        const deletedNote = await noteRepository.deleteNote(id);
        if (!deletedNote) {
            return baseResponse(res, false, 404, "Note not found", null);
        }

        baseResponse(res, true, 200, "Note deleted successfully", deletedNote);
    } catch (error) {
        baseResponse(res, false, 500, error.message || "Internal server error", null);
    }
};
