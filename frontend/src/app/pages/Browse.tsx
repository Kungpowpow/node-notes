import { Link } from 'react-router-dom';
import Browse from "@/components/Browse.tsx";

function BrowsePage() {

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex flex-row items-center justify-between mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-3xl">Browse Notes</h2>
                <Link to={"/create/"}>
                    <button type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        New Note
                    </button>
                </Link>
            </div>
            <div className="relative rounded-xl bg-white px-6 py-2 shadow-sm ring-1 ring-gray-950/5">
                <Browse />
            </div>
        </div>
    );
}

export default BrowsePage;