const notesController = {}

const Note = require('../models/Notes')

notesController.renderNoteForm = (req, res) => {
    res.render('notes/newNote')
}

notesController.createNewNote = async (req, res) => {
    const { title, description } = req.body
    const newNote = new Note({ title, description })
    await newNote.save()
    res.send('note created')
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

notesController.deleteNote = (req, res) => {
    res.send('Note deleted')
}

module.exports = notesController