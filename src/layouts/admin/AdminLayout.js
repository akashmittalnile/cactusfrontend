import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { Outlet } from "react-router-dom";
import "../../assets/admin/css/common.css";
import "../../assets/admin/css/responsive.css";

export const AdminLayout = () => {

    const [sidebar, setSidebar] = useState(false);

    const getSidebarToggled = () => {
        setSidebar(!sidebar);
    }

    return (
        <>
            <div className={sidebar ? "page-body-wrapper main-site toggled" : "page-body-wrapper main-site"}>
                <AdminSidebar />
                <div className="body-wrapper">
                    <AdminHeader sidebar={getSidebarToggled} />
                    <div className="body-main-content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

