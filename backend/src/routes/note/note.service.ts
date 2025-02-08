import { Note } from "./note.model";
import { db } from "../../config/database";

export class NoteService {

    static async listNotes(): Promise<Note[]> {
        return new Promise<Note[]>((resolve, reject) => {
            db.all("SELECT * FROM notes", (err, rows) => {
                if (err) {
                    reject(new Error(`Database error: ${err.message}`));
                    return;
                }
                resolve(rows as Note[]);
            });
        });
    }

    static async getNote(id: string): Promise<Note | null> {
        return new Promise<Note | null>((resolve, reject) => {
            if (!id) {
                reject(new Error('Note ID is required'));
                return;
            }

            db.get("SELECT * FROM notes WHERE id = ?", [id], (err, row) => {
                if (err) {
                    reject(new Error(`Database error: ${err.message}`));
                    return;
                }
                resolve(row ? row as Note : null);
            });
        });
    }

    static async createNote(title: string, content: string): Promise<Note> {
        return new Promise<Note>((resolve, reject) => {
            if (!title || !content) {
                reject(new Error('Title and content are required'));
                return;
            }

            db.run(
                "INSERT INTO notes (title, content) VALUES (?, ?)",
                [title, content],
                function(err) {
                    if (err) {
                        reject(new Error(`Database error: ${err.message}`));
                        return;
                    }
                    
                    db.get("SELECT * FROM notes WHERE id = ?", [this.lastID], (err, row) => {
                        if (err) {
                            reject(new Error(`Database error: ${err.message}`));
                            return;
                        }
                        if (!row) {
                            reject(new Error('Failed to retrieve created note'));
                            return;
                        }
                        resolve(row as Note);
                    });
                }
            );
        });
    }

    static async updateNote(id: string, title: string, content: string): Promise<Note> {
        return new Promise<Note>((resolve, reject) => {
            if (!id || !title || !content) {
                reject(new Error('ID, title, and content are required'));
                return;
            }
            db.run(
                "UPDATE notes SET title = ?, content = ? WHERE id = ?",
                [title, content, id],
                function(err) {
                    if (err) {
                        reject(new Error(`Database error: ${err.message}`));
                        return;
                    }

                    db.get("SELECT * FROM notes WHERE id = ?", [id], (err, row) => {
                        if (err) {
                            reject(new Error(`Database error: ${err.message}`));
                            return;
                        }
                        if (!row) {
                            reject(new Error('Failed to retrieve updated note'));
                            return;
                        }
                        resolve(row as Note);
                    });
                }
            );
        });
    }

    static async deleteNote(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!id) {
                reject(new Error('Note ID is required'));
                return;
            }

            db.run(
                "DELETE FROM notes WHERE id = ?",
                [id],
                (err) => {
                    if (err) {
                        reject(new Error(`Database error: ${err.message}`));
                        return;
                    }
                    resolve();
                }
            );
        });
    }
}