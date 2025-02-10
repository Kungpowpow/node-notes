import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api, {AxiosError} from '@/utils/api';
import type { Note } from '@/app/interfaces/note.interface';
import Error from "@/components/error.tsx";

function Create() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post<{success: boolean, data: Note}>('/api/notes', formData);
            if (response.data.success) {
                navigate(`/read/${response.data.data.id}`);
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

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Create Note
                </button>
            </div>
        </form>
    );
}

export default Create;
