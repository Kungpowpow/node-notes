import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '@/utils/api';
import type { Note } from '@/app/interfaces/note.interface';
import Delete from './Delete';
import Error from "@/components/error.tsx";

function Read({ id }: {id: string}) {
    const [note, setNote] = useState<Note | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await api.get<{success: boolean, data: Note}>(`/api/notes/${id}`);
                if (response.data.success) {
                    setNote(response.data.data);
                }
            } catch (err) {
                setError('Failed to fetch note');
                console.error(err);
            }
        };

        fetchNote();
    }, [id]);

    if (error) return( <Error error={error}/> )

    if (!note) {
        return <p className="text-gray-500 text-center py-4">Loading...</p>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-gray-900">{note.title}</h1>
                <div className="flex gap-4">
                    <Link
                        to={`/edit/${note.id}`}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Edit
                    </Link>
                    <Delete id={note.id} />
                </div>
            </div>
            
            <p className="text-sm text-gray-500">
                Created: {new Date(note.createdAt).toLocaleDateString()}
            </p>
            
            <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
            </div>
        </div>
    );
}

export default Read; 