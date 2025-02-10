import { useParams } from 'react-router-dom';
import Edit from '@/components/Edit';

function EditPage() {
    const { id } = useParams();

    if (!id) {
        return <div>Note ID not provided</div>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Edit Note</h1>
            <div className="relative rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-950/5">
                <Edit id={id} />
            </div>
        </div>
    );
}

export default EditPage;