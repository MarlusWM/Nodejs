const { Router } = require("express");
const NotesController = require("../controllers/NotesController");
const notesRoutes = Router();

function myMiddleware(request, response, next){
    console.log("vc passou pelo middle");
    next();
}

const notesController = new NotesController();

notesRoutes.post('/:user_id', notesController.create);

module.exports = notesRoutes;