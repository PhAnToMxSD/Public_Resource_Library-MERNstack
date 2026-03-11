import express from "express";
import { getAllNotes , changeNote , postNewNote , deleteNote} from "../controllers/notesControllers.js";

const router = express.Router();

router.get('/', getAllNotes);

router.put('/', changeNote);

router.post('/', postNewNote);

router.delete('/', deleteNote);

export default router;