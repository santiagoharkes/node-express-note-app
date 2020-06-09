const { Router } = require('express')

router = Router()

const { renderNoteForm, createNewNote, renderNotes, renderEditForm, updateNote, deleteNote } = require('../controllers/notes.controller')

// NUEVA NOTA, toma la ruta y postea una nueva
router.get('/notes/add', renderNoteForm)
router.post('/notes/new-note', createNewNote)

// GET ALL
router.get('/notes', renderNotes)
// GET ALL
router.get('/notes', renderNotes)
// EDIT-UPDATE NOTES
router.get('/edit/:id', renderEditForm)
router.put('/edit/:id', updateNote)
// DELETE NOTE
router.delete('/notes/delete/:id', deleteNote)

module.exports = router