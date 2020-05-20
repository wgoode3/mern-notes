const Notes = require("../controllers/notes.controller");


module.exports = (app) => {
    app.get("/api/notes", Notes.getAll);
    app.post("/api/notes", Notes.create);
    app.delete("/api/notes/:_id", Notes.delete);
    app.put("/api/notes/:_id", Notes.update);
}