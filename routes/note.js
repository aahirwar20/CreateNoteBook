import noteController from '../controller/note.js'
import { Router } from 'express';
import { validateAccess } from '../controller/auth.js';

const router = Router()

router.route('/')
    .post(validateAccess, noteController.createNote)
    .get(validateAccess, noteController.getAllNotes)
    .put(validateAccess, noteController.updateNote)

router.route('/:id')
    .get(validateAccess, noteController.getById)
    .delete(validateAccess, noteController.deleteNote)

router.route('/sendNote/mail')
     .post(validateAccess, noteController.sendNoteToMail)

export default router
