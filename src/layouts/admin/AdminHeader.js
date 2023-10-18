import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Nav,
    NavItem,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../Store/slices/auth";
import notification from "../../assets/images/admin/notification.svg";
import profile from "../../assets/images/admin/profile.png";
import ApiService from "../../core/services/ApiService";
import { api } from "../../utils/api.utils";
import moment from 'moment';
import { Modal, ModalBody } from "reactstrap";
import delete_news from "../../assets/images/admin/delete-news.svg";
import nodata from "../../assets/images/admin/no_data.png";
import { toast } from 'react-hot-toast';


const AdminHeader = (props) => {
    const dispatch = useDispatch();
    const signOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    const [notify, setNotification] = useState([]);
    const [deleteModal, setDelete] = useState(false);

    const getNotifications = async () => {
        const response = await ApiService.getAPIWithAccessToken(api.Notification);
        // console.log("Notification => ", response.data.body);
        if (response.data.headers.success === 1) {
            (response.data.body).map((ele) => {
                let arr = [{}];
                if (ele.message !== null && ele.message !== undefined)
                    arr = [{ created_date: ele.created_date, message: (JSON.parse(ele.message).message) }];
                else arr = [{ created_date: ele.created_date, message: "NA" }];
                setNotification((prevState) => [...prevState, ...arr]);
            })
            // setNotification(response.data.body);
        } else setNotification([]);
    };

    const deleteTrash = async () => {
        const response = await ApiService.getAPIWithAccessToken(api.ClearNotification);
        if (response.data.headers.success === 1) {
            toast.success("Notification Cleared Successfully!");
            getNotifications();
        }
    }

    useEffect(() => {
        getNotifications();
    }, []);

    return (
        <>
            <div className="header">
                <Nav className="navbar">
                    <div className="navbar-menu-wrapper">
                        <ul className="navbar-nav">
                            <NavItem className="nav-item">
                                <Link
                                    className="nav-link toggle-sidebar mon-icon-bg"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        props.sidebar();
                                    }}
                                >
                                    <i className="las la-bars"></i>
                                </Link>
                            </NavItem>
                        </ul>
                        <ul className="navbar-nav">
                            <UncontrolledDropdown
                                nav
                                className="nav-item profile-dropdown dropdown mx-2"
                            >
                                <DropdownToggle className="nav-link dropdown-toggle" nav>
                                    <div className="profile-pic">
                                        <img src={profile} alt="user" />{" "}
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu" end>
                                    <DropdownItem to="" tag={Link} className="dropdown-item">
                                        <i className="las la-user"></i> Profile
                                    </DropdownItem>
                                    <DropdownItem
                                        to=""
                                        tag={Link}
                                        onClick={signOut}
                                        className="dropdown-item"
                                    >
                                        <i className="las la-sign-out-alt"></i> Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            <UncontrolledDropdown className="nav-item noti-dropdown dropdown" nav>
                                <DropdownToggle
                                    className="nav-link dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    nav
                                    onClick={(e)=> {e.preventDefault(); getNotifications();}}
                                >
                                    <div className="noti-icon">
                                        <img src={notification} alt="user" />
                                        <span className="noti-badge"></span>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu
                                    end
                                    className="dropdown-menu dropdown-menu-lg dropdown-menu-right"
                                    data-bs-popper="none"
                                >
                                    <div className="notification-head">
                                        <h2>Notifications</h2>
                                    </div>
                                    <div className="notification-body">
                                        {notify.length !== 0 ? (
                                            notify.map((ele, indx) => {
                                                return (
                                                    <div key={indx} className="notification-item">
                                                        <div className="notification-item-icon">
                                                            <i className="la la-bell"></i>
                                                        </div>
                                                        <div className="notification-item-text">
                                                            <h2>{ele.message ?? "NA"}</h2>
                                                            <p>
                                                                <span>
                                                                    <i className="fas fa-clock"></i>{moment(ele.created_date).format('LLLL')}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className='d-flex mt-5 justify-content-center'>
                                                <div className='text-center'>
                                                    <img className='mb-3' width={135} height={115} src={nodata} alt="no-data" />
                                                    <p>No Notifications</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <Link to="" onClick={(e) => { e.preventDefault(); setDelete(true); }} >
                                        <div className="notification-foot">
                                            Clear All Notifications
                                        </div>
                                    </Link>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                        </ul>
                    </div>
                    <button
                        className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                        type="button"
                        data-toggle="offcanvas"
                    >
                        <span className="icon-menu"></span>
                    </button>
                </Nav>
            </div>

            <Modal isOpen={deleteModal} toggle={() => setDelete(false)} className="kin-modal" >
                <div className="modal-content">
                    <ModalBody className='modal-body'>
                        <div className="deletenews-form-info">
                            <button type="button" className="btn-close" onClick={(e) => { e.preventDefault(); setDelete(false) }} data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="deletenews-media">
                                <img src={delete_news} alt='not_found' />
                            </div>
                            <h3>Are you sure want to clear all notifications</h3>
                            <div className="deletenews-action">
                                <Link className="no-btn" onClick={(e) => { e.preventDefault(); setDelete(false) }} to="">No</Link>
                                <Link className="yes-btn mx-2" to="" onClick={() => deleteTrash()}>Yes</Link>
                            </div>
                        </div>
                    </ModalBody>
                </div>
            </Modal>

        </>
    );
};

export default AdminHeader;
