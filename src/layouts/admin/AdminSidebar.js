import React, {useCallback} from 'react'
import { Link } from 'react-router-dom';
import { Nav, NavItem } from "reactstrap";
import { useDispatch } from 'react-redux';
import { logout } from "../../Store/slices/auth";
import dashbaord from "../../assets/images/admin/dashboard.svg";
import user from "../../assets/images/admin/user.svg";
import manager from "../../assets/images/admin/manager.svg";
import club from "../../assets/images/admin/club.svg";
import crates from "../../assets/images/admin/crates.svg";
import leaderboard from "../../assets/images/admin/leaderboard.svg";
import news from "../../assets/images/admin/news.svg";
import logoutimg from "../../assets/images/admin/logout.svg";
import logo from "../../assets/images/admin/logo.svg";
import iexpe from "../../assets/images/admin/transaction.svg";

const AdminSidebar = () => {

    const dispatch = useDispatch();
    const signOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <>
            <div className="sidebar-wrapper">
                <div className="sidebar-logo">
                    <Link href="index.html" to="/dashboard">
                        <img className="" src={logo} alt=""/>
                    </Link>
                    <div className="back-btn"><i className="fa fa-angle-left"></i></div>
                </div>
                <div className="sidebar-nav">
                    <Nav className="sidebar sidebar-offcanvas" id="sidebar">
                        <ul className="nav">
                            <NavItem className="nav-item">
                                <Link className="nav-link" to="/dashboard">
                                    <span className="menu-icon"><img src={dashbaord} alt='dashboard'/></span>
                                    <span className="menu-title">Dashboard</span>
                                </Link>
                            </NavItem>
                            <NavItem className="nav-item active">
                                <Link className="nav-link" to="/users">
                                    <span className="menu-icon"><img src={user} alt="user"/></span>
                                    <span className="menu-title">Users</span>
                                </Link>
                            </NavItem>

                            <NavItem className="nav-item">
                                <Link className="nav-link" to="/manager">
                                    <span className="menu-icon"><img src={manager} alt="manager"/></span>
                                    <span className="menu-title">Managers</span>
                                </Link>
                            </NavItem>

                            <NavItem className="nav-item">
                                <Link className="nav-link" to="/clubs">
                                    <span className="menu-icon"><img src={club} alt="club"/></span>
                                    <span className="menu-title">Clubs</span>
                                </Link>
                            </NavItem>

                            <NavItem className="nav-item">
                                <Link className="nav-link" to="/cactus-crates">
                                    <span className="menu-icon"><img src={crates} alt="crates"/></span>
                                    <span className="menu-title">Cactus Crates</span>
                                </Link>
                            </NavItem>
                            <NavItem className="nav-item">
                                <Link className="nav-link" to="/leaderboard">
                                    <span className="menu-icon"><img src={leaderboard} alt="leaderboard"/></span>
                                    <span className="menu-title">Leaderboard</span>
                                </Link>
                            </NavItem>

                            <NavItem className="nav-item">
                                <Link className="nav-link" to="/news">
                                    <span className="menu-icon"><img src={news} alt="news"/></span>
                                    <span className="menu-title">News</span>
                                </Link>
                            </NavItem>

                            <NavItem className="nav-item">
                                <Link className="nav-link" to="/pages">
                                    <span className="menu-icon"><img src={news} alt="news"/></span>
                                    <span className="menu-title">Pages</span>
                                </Link>
                            </NavItem>

                            <NavItem className="nav-item">
                                <Link className="nav-link" to="/transaction-statement">
                                    <span className="menu-icon"><img src={iexpe} alt="news"/></span>
                                    <span className="menu-title">Transaction Statement</span>
                                </Link>
                            </NavItem>

                            <NavItem className="nav-item">
                                <Link className="nav-link" to="" onClick={signOut}>
                                    <span className="menu-icon"><img src={logoutimg} alt="logout"/></span>
                                    <span className="menu-title">Logout</span>
                                </Link>
                            </NavItem>
                        </ul>
                    </Nav>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar