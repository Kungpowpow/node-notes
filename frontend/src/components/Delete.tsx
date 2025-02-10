import { useNavigate } from 'react-router-dom';
import api from '@/utils/api';

function Delete({ id }: {id: string}) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await api.delete(`/api/notes/${id}`);
            navigate('/');
        } catch (error) {
            console.error('Failed to delete note:', error);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
            Delete
        </button>
    );
}

export default Delete; 