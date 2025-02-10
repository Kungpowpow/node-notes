import { Routes, Route } from "react-router-dom";
import MainLayout from '@/app/layouts/MainLayout';
import Browse from '@/app/pages/Browse';
import Read from '@/app/pages/Read';
import Create from '@/app/pages/Create';
import Edit from '@/app/pages/Edit';

function AppRoutes() {
  return (
    <Routes>
        <Route element={<MainLayout />}>
            <Route path="/" element={<Browse />} />
            <Route path="/read/:id" element={<Read />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
        </Route>
    </Routes>
  );
}

export default AppRoutes; 