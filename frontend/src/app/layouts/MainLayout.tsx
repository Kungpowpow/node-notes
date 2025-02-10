import {Link, Outlet} from 'react-router-dom';

function MainLayout() {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
                    <Link to={"/"} >
                        <h1 className="text-xl font-bold sm:text-2xl">Notes App</h1>
                    </Link>
                </nav>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
            
            {/*<footer>*/}
            {/*</footer>*/}
        </div>
    );
}

export default MainLayout;