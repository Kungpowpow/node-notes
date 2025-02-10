import { useParams } from 'react-router-dom';
import Read from '@/components/Read';

function ReadPage() {
    const { id } = useParams();

    if (!id) {
        return <div>Note ID not provided</div>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex flex-row items-center justify-between mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-3xl">View Note</h2>
            </div>
                <div className="relative rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-950/5">
                    <Read id={id}/>
                </div>
            </div>
            );
            }

            export default ReadPage;