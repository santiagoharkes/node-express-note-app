const { Router } = require('express')

router = Router()

const { renderNoteForm, createNewNote, renderNotes, renderEditForm, updateNote, deleteNote } = require('../controllers/notes.controller')

const { isAuthenticated } = require('../helpers/auth')

// NUEVA NOTA, toma la ruta y postea una nueva
router.get('/notes/add', isAuthenticated, renderNoteForm)
router.post('/notes/new-note', isAuthenticated, createNewNote)

// GET ALL
router.get('/notes', isAuthenticated, renderNotes)
// EDIT-UPDATE NOTES
router.get('/notes/edit/:id', isAuthenticated, renderEditForm)
router.put('/notes/edit/:id', isAuthenticated, updateNote)
// DELETE NOTE
router.delete('/notes/delete/:id', isAuthenticated, deleteNote)

module.exports = router