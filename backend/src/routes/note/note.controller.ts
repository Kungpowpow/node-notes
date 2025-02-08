import express, { Router, Request, Response } from "express";
import { NoteService } from "./note.service";

const router: Router = express.Router();

/**
 * Retrieve all notes
 * @route {GET} /api/notes
 * @returns {object} Object containing success status and an array of notes
 */
router.get('/notes', async (req: Request, res: Response) => {
    try {
        const notes = await NoteService.listNotes();
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve notes',
            details: error.message
        });
    }
});

/**
 * Retrieve a single note by ID
 * @route {GET} /api/notes/:id
 * @param {string} id - Note ID
 * @returns {Object} containing success status and note data
 */
router.get('/notes/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const note = await NoteService.getNote(id);
        
        if (!note) {
            return res.status(404).json({
                success: false,
                error: 'Note not found'
            });
        }
        
        res.status(200).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve note',
            details: error.message
        });
    }
});


/**
 * Create a new note
 * @route {POST} /api/notes
 * @body {Object} requestBody
 * @body {string} requestBody.title - Note title
 * @body {string} requestBody.content - Note content
 * @returns {Object} Object containing success status and created note data
 */
router.post('/notes', async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                error: 'Title and content are required'
            });
        }

        const note = await NoteService.createNote(title, content);
        res.status(201).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create note',
            details: error.message
        });
    }
});

/**
 * Update an existing note by ID
 * @route {PUT} /api/notes/:id
 * @param {string} id - Note ID
 * @body {Object} requestBody
 * @body {string} requestBody.title - Note title
 * @body {string} requestBody.content - Note content
 * @returns {Object} Object containing success status and updated note data
 */
router.put('/notes/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const note = await NoteService.updateNote(id,title, content);
        res.status(200).json({ success: true, data: note });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create note',
            details: error.message
        });
    }
});


/**
 * Delete a note by ID
 * @route {DELETE} /api/notes/:id
 * @param {string} id - Note ID
 * @returns {void} No content (204) on success
 */
router.delete('/notes/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await NoteService.deleteNote(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create note',
            details: error.message
        });
    }
});

export default router;