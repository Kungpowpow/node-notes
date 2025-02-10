import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api, {AxiosError} from '@/utils/api';
import type { Note } from '@/app/interfaces/note.interface';
import Error from "@/components/error.tsx";

function Edit({ id }: {id: string}) {
    const navigate = useNavigate();
    const [error, setError] = useState<string>('');
    const [statusCode, setStatusCode] = useState<number|null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await api.get<{success: boolean, data: Note}>(`/api/notes/${id}`);
                if (response.data.success) {
                    const { title, content } = response.data.data;
                    setFormData({ title, content });
                }
            } catch (err) {
                if (err instanceof AxiosError) {
                    setStatusCode(err.status ?? null);
                    if(err.response?.data?.error){
                        setError(err.response?.data?.error);
                    }else{
                        setError("Unexpected error");
                        console.log('Unexpected error', err)
                    }
                }
            }
        };

        fetchNote();
    }, [id]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.put<{success: boolean, data: Note}>(`/api/notes/${id}`, formData);
            if (response.data.success) {
                navigate(`/read/${id}`);
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                if(err.response?.data?.error){
                    setError(err.response?.data?.error);
                }else{
                    setError("Unexpected error");
                    console.log('Unexpected error', err)
                }
            }
        }
    };

    if (statusCode === 404) return( <Error error={error}/> )

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                />
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                </label>
                <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={8}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                />
            </div>

            {error && (
                <Error error={error}/>
            )}

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => navigate(`/read/${id}`)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Update Note
                </button>
            </div>
        </form>
    );
}

export default Edit; 