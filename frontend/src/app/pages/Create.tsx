import Create from '@/components/Create';

function CreatePage() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Create New Note</h1>
            <div className="relative rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-950/5">
                <Create />
            </div>
        </div>
    );
}

export default CreatePage;