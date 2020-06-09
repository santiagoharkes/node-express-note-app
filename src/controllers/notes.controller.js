const notesController = {}

notesController.renderNoteForm = (req, res) => {
    res.render('notes/newNote')
}

notesController.createNewNote = (req, res) => {
    console.log(req.body)
    res.send('note created')
}

notesController.renderNotes = (req, res) => {
    res.send('todas las notas')
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