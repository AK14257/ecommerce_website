import { Outlet } from 'react-router-dom'; // Use import instead of require
import AdminSideBar from './sidebar';
import AdminHeader from './header';

function AdminLayout() {
    return ( 
        <div className="flex min-h-screen w-full">
            {/* Admin sidebar */}
            <AdminSideBar/>
            <div className="flex flex-1 flex-col">
                {/* Admin header */}
                <AdminHeader/>
                <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
                    <Outlet /> {/* Renders child routes */}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout; // Fixed typo
