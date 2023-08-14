import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { Outlet } from "react-router-dom";
import "../../assets/admin/css/common.css";
import "../../assets/admin/css/responsive.css";

export const AdminLayout = () => {
    return (
        <>
            <div className="page-body-wrapper">
                <AdminSidebar />
                <div className="body-wrapper">
                    <AdminHeader />
                    <div className="body-main-content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

