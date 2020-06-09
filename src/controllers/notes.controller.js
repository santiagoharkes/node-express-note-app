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

notesController.renderEditForm = (req, res) => {
    res.send('Aca va el form de edit')
}

notesController.updateNote = (req, res) => {
    res.send('Updated note')
}

notesController.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.redirect('/notes')
}

module.exports = notesController