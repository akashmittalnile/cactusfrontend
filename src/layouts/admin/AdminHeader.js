import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Nav, NavItem } from "reactstrap";
import { useDispatch } from 'react-redux';
import { logout } from "../../Store/slices/auth";
import notification from "../../assets/images/admin/notification.svg";
import profile from "../../assets/images/admin/profile.png";

const AdminHeader = () => {

    const dispatch = useDispatch();
    const signOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <>
            <div className="header">
                <Nav className="navbar">
                    <div className="navbar-menu-wrapper">
                        <ul className="navbar-nav">
                            <NavItem className="nav-item">
                                <Link className="nav-link toggle-sidebar mon-icon-bg">
                                    <i className="las la-bars"></i>
                                </Link>
                            </NavItem>
                        </ul>
                        <ul className="navbar-nav">
                            <NavItem className="nav-item noti-dropdown dropdown">
                                <Link className="nav-link  dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="noti-icon">
                                        <img src={notification} alt="user" />
                                        <span className="noti-badge"></span>
                                    </div>
                                </Link>
                                <div className="dropdown-menu">
                                </div>
                            </NavItem>

                            <UncontrolledDropdown nav className="nav-item profile-dropdown dropdown">
                                <DropdownToggle className='nav-link dropdown-toggle' nav>
                                    <div className="profile-pic"><img src={profile} alt="user" /> </div>
                                </DropdownToggle>
                                <DropdownMenu className='dropdown-menu' end>
                                    <DropdownItem to="" tag={Link} className='dropdown-item'>
                                        <i className="las la-user"></i> Profile
                                    </DropdownItem>
                                    <DropdownItem to="" tag={Link} onClick={signOut} className='dropdown-item'>
                                        <i className="las la-sign-out-alt"></i> Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </ul>
                    </div>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                        <span className="icon-menu"></span>
                    </button>
                </Nav>
            </div>
        </>
    )
}

export default AdminHeader