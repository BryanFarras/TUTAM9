const express = require('express');
const router = express.Router();
const noteController = require('../controllers/controller.note.js');

router.get('/', noteController.getAllNotes);
router.get('/user/:user_id', noteController.getNotesByUserId);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
