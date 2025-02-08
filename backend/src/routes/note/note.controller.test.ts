import express from "express"
import router from "../../routes/routes"
import request from 'supertest'
import { NoteService } from "./note.service";
import { Note } from "./note.model";

const api = express()

api.use(express.urlencoded({ extended: true }))
api.use(express.json())
api.use('/', router)

//tests
//browse, get, edit, add, delete.
//skipping test db to keep tests faithful to prod.
//strictly testing api routes. This depends on service class, which should be its own test.

describe('Notes Route Test', () =>{
    describe('GET /api/notes', () => {
        test("Returns list of notes", async() => {
            const response = await request(api).get('/api/notes');
            expect(response.status).toEqual(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        })

    })

    describe('GET /api/notes/:id', () => {
        test("Get a note", async() => {
            const newNote = await NoteService.createNote("Get note test", "unit test for retrieving single note");

            const response = await request(api).get(`/api/notes/${newNote.id}`)
            expect(response.status).toEqual(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.title).toBe(newNote.title);
            expect(response.body.data.content).toBe(newNote.content);

            await NoteService.deleteNote(newNote.id);
        })
    })

    describe('POST /api/:id', () => {
        test("Creates a new note", async() => {
            const newNote = {
                title: "Test Note",
                content: "Test Content"
            }
            
            const response = await request(api)
                .post('/api/notes')
                .send(newNote)
                .set('Content-Type', 'application/json');

            const noteId = response.body.data.id;
    
            expect(response.status).toEqual(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.title).toBe(newNote.title);
            expect(response.body.data.content).toBe(newNote.content);

            await NoteService.deleteNote(noteId);
        })
    })

    describe('PUT /api/notes/:id', () => {
        test("Updates a note", async() => {
            const newNote = await NoteService.createNote("Put note test", "unit test for updating single note");
            const updateNote = {
                title: "Put note test updated",
                content: "Test Content updated"
            }
            const response = await request(api).put(`/api/notes/${newNote.id}`)
                .send(updateNote)
                .set('Content-Type', 'application/json');

            // console.log(response.body)
            expect(response.status).toEqual(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.title).toBe(updateNote.title);
            expect(response.body.data.content).toBe(updateNote.content);

            await NoteService.deleteNote(response.body.data.id);
        });
    })

    describe('DELETE /api/notes/:id', () => {
        test("Deletes a new note", async() => {
            const newNote = await NoteService.createNote("Delete note test", "unit test for deleting single note");
            const response = await request(api).delete(`/api/notes/${newNote.id}`);
            //204 no response body
            expect(response.status).toEqual(204);
        });
    })

})