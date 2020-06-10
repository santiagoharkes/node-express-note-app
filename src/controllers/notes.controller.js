const notesController = {}

const Note = require('../models/Notes')

notesController.renderNoteForm = (req, res) => {
    res.render('notes/newNote')
}

notesController.createNewNote = async (req, res) => {
    const { title, description } = req.body
    const newNote = new Note({ title, description })
    await newNote.save()
    res.redirect('/notes')
}

notesController.renderNotes = async (req, res) => {
    const notes = await Note.find()
    res.render('notes/allNotes', { notes })
}

notesController.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id)
    console.log(note)
    res.render('notes/edit-note.hbs', { note })
}

notesController.updateNote = async (req, res) => {
    const { title, description } = req.body
    await Note.findByIdAndUpdate(req.params.id, { title, description })
    res.redirect('/notes')
}

notesController.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.redirect('/notes')
}

module.exports = notesController