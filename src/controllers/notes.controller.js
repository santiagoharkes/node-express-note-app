const notesController = {}

const Note = require('../models/Notes')

notesController.renderNoteForm = (req, res) => {
    res.render('notes/newNote')
}

notesController.createNewNote = async (req, res) => {
    const { title, description } = req.body
    const newNote = new Note({ title, description, user: req.user.id })
    await newNote.save()
    req.flash('suc_msg', 'Note added successfully!')
    res.redirect('/notes')
}

notesController.renderNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user.id })
    res.render('notes/allNotes', { notes })
}

notesController.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id)
    if (note.user != req.user.id) {
        req.flash('error_msg', 'The mail is already in use')
        return res.redirect('/notes')
    }
    res.render('notes/edit-note.hbs', { note })
}

notesController.updateNote = async (req, res) => {
    const { title, description } = req.body
    await Note.findByIdAndUpdate(req.params.id, { title, description })
    req.flash('suc_msg', "Note updated successfully!")
    res.redirect('/notes')
}

notesController.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    req.flash('suc_msg', "Note deleted successfully!")
    res.redirect('/notes')
}

module.exports = notesController