const Note = require("../models/note.model");


class NoteController {
    getAll(req, res) {
        Note.find()
            .then(notes => res.json( notes ))
            .catch(err => res.json(err));
    }
    create(req, res) {
        Note.create(req.body)
            .then(() => res.json({msg: "ok"}))
            .catch(err => res.json(err));
    }
    delete(req, res) {
        Note.findByIdAndDelete({_id: req.params._id})
            .then(() => res.json({msg: "ok"}))
            .catch(err => res.json(err));
    }
    update(req, res) {
        Note.findByIdAndUpdate({_id: req.params._id}, req.body, {runValidators: true})
            .then(() => res.json({msg: "ok"}))
            .catch(err => res.json(err));
    }
}

module.exports = new NoteController();