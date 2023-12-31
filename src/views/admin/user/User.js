import React, { useState, useEffect } from 'react';
import "../../../assets/admin/css/users.css";
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle } from "reactstrap";
import ApiService from '../../../core/services/ApiService';
import Loader from "../../common/Loader";
import { encode } from 'base-64';
import { api } from '../../../utils/api.utils';
import moment from 'moment';
import { userStatus, approvalStatus } from '../../../utils/status.utils';
import { toast } from 'react-hot-toast';
import john from "../../../assets/images/admin/john-doe.png";

const User = () => {

    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUserList = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("all users list => ", response.data.body);
        if (response.data.headers.success === 1) setUser(response.data.body);
        else setUser([]);
        setLoading(false);
    }

    const handleChangeStatus = async (e, id, status_number) => {
        setLoading(true);
        let data = {
            status: (status_number === "2") ? 3 : 2
        };
        console.log(data, status_number);
        const response = await ApiService.putAPIWithAccessToken(api.UserStatusChange + `${id}`, data);
        if (response.data.headers.success === 1) { toast.success('Status changed!'); getUserList(api.AllUser); }
        setLoading(false);
    }

    const handleFilter = (e) => {
        e.persist();
        let name = "";
        let status = "";
        let email = "";
        if (e.target.name === 'name') name = e.target.value;
        if (e.target.name === 'status') status = e.target.value;
        if (e.target.name === 'email') email = e.target.value;
        getUserList(api.AllUser + `?name=${name}&status=${status}&email=${email}`);
    }

    useEffect(() => {
        getUserList(api.AllUser);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="user-table-section">
                <div className="heading-section">
                    <div className="d-flex align-items-center">
                        <div className="mr-auto">
                            <h4 className="heading-title">Users</h4>
                        </div>
                        <div className="btn-option-info wd80">
                            <div className="search-filter">
                                <div className="row g-2">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <Link style={{height: "44.5px"}} className="Approve-User-btn" to="/approved-user-profile"><i className="las la-check-circle"></i> Approve User Profile</Link>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <select className="form-control" name="status" onChange={(e) => handleFilter(e)} style={{height:"44.5px"}}>
                                                <option value="">Show All Users</option>
                                                <option value="2">Active Users</option>
                                                <option value="3">Inactive Users</option>
                                                <option value="4">Rejected Users</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="search-form-group">
                                            <input type="text" name="name" onChange={(e) => handleFilter(e)} className="form-control" placeholder="Search By Name" style={{ color: "#000" }} />
                                            <span className="search-icon"><i className="la la-search"></i></span>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="search-form-group">
                                            <input type="text" name="email" onChange={(e) => handleFilter(e)} className="form-control" placeholder="Search By Email" style={{ color: "#000" }} />
                                            <span className="search-icon"><i className="la la-search"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="user-content-section">
                    <div className="user-table-card">

                        <div className="table-responsive">
                            <table className="table table-users">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Profile Image</th>
                                        <th>Name</th>
                                        <th>Email ID</th>
                                        <th>Date of Birth</th>
                                        <th>Contact Number</th>
                                        <th>Address</th>
                                        <th>Approval Status</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        users.length !== 0 ?
                                            (
                                                users.map((ele, indx) => {
                                                    return (
                                                        <tr key={indx}>
                                                            <td>
                                                                <span className="sno">{indx + 1}</span>
                                                            </td>

                                                            <td>
                                                                {
                                                                    (ele.image_url === "" || ele.image_url === null || ele.image_url === undefined) ? (
                                                                        <div className="side-profile-media" style={{ width: "50px", height: "50px" }}><img src={john} alt="not-found" /></div>
                                                                    ) :
                                                                        (
                                                                            <div className="side-profile-media" style={{ width: "50px", height: "50px" }}><img src={ele.image_url} alt="not-found" /></div>
                                                                        )
                                                                }
                                                            </td>

                                                            <td>
                                                                <div className="user-table-info text-capitalize">
                                                                    <div className="user-table-value">
                                                                        <h2>{ele.first_name + ' ' + ele.last_name}</h2>
                                                                        <div className={ele.status === "2" ? "user-status-text st-active" : "user-status-text st-inactive"}>
                                                                            {userStatus(ele.status)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                {ele.emailid}
                                                            </td>

                                                            <td>
                                                                {moment(ele.DOB).format('MMMM Do, YYYY')}
                                                            </td>

                                                            <td>
                                                                {ele.phone_number}
                                                            </td>

                                                            <td>
                                                                {ele.Address ?? "NA"}
                                                            </td>

                                                            <td>
                                                                <div className="approve-text">
                                                                    {approvalStatus(ele.status)}
                                                                </div>
                                                            </td>

                                                            <td>
                                                                {
                                                                    ele.status !== "4" ? (
                                                                        <div className="switch-toggle">
                                                                            <div className="">
                                                                                <label className="toggle" onChange={(e) => handleChangeStatus(e, ele.id, ele.status)} htmlFor={`myToggle_${indx}`}>
                                                                                    <input className="toggle__input" name={`active_${indx}`} type="checkbox" id={`myToggle_${indx}`} defaultChecked={(ele.status === "2") ? "checked" : null} defaultValue={2} />
                                                                                    <div className="toggle__fill"></div>
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    ) : null
                                                                }

                                                            </td>

                                                            <td>
                                                                <UncontrolledDropdown className='action-btn-info'>
                                                                    <DropdownToggle className="action-btn dropdown-toggle" nav>
                                                                        <i className="las la-ellipsis-v"></i>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu className='dropdown-menu' end>
                                                                        <DropdownItem to={`/user-details/${encode(ele.id)}`} tag={Link} className='dropdown-item'>
                                                                            <i className="las la-eye"></i> View
                                                                        </DropdownItem>
                                                                        {/* <DropdownItem to="" tag={Link} className='dropdown-item'>
                                                                            <i className="las la-trash"></i> Delete
                                                                        </DropdownItem> */}
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            )
                                            :
                                            (
                                                <tr className='text-center'>
                                                    <td colSpan="9">No users found</td>
                                                </tr>
                                            )
                                    }

                                </tbody>
                            </table>
                        </div>
                        {/* <div className="cactus-table-pagination">
                            <ul className="cactus-pagination">
                                <li className="disabled" id="example_previous">
                                    <Link to="" aria-controls="example" data-dt-idx="0" tabindex="0" className="page-link">Previous</Link>
                                </li>
                                <li className="active">
                                    <Link to="" className="page-link">1</Link>
                                </li>
                                <li className="">
                                    <Link to="" aria-controls="example" data-dt-idx="2" tabindex="0" className="page-link">2</Link>
                                </li>
                                <li className="">
                                    <Link to="" aria-controls="example" data-dt-idx="3" tabindex="0" className="page-link">3</Link>
                                </li>
                                <li className="next" id="example_next">
                                    <Link to="" aria-controls="example" data-dt-idx="7" tabindex="0" className="page-link">Next</Link>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </div>

            </div>
        </>
    )
}

export default User