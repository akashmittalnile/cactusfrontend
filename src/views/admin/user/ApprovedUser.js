import React, { useState, useEffect } from 'react';
import "../../../assets/admin/css/users.css";
import { Link } from 'react-router-dom';
import Loader from '../../common/Loader';
import ApiService from '../../../core/services/ApiService';
import { api } from '../../../utils/api.utils';
import moment from 'moment';
import { userStatus } from '../../../utils/status.utils';
import { toast } from 'react-hot-toast';
import { Modal, ModalBody } from "reactstrap";
import deleteImg from "../../../assets/images/admin/delete-news.svg";
import john from "../../../assets/images/admin/john-doe.png";
import { totalPageCalculator } from '../../../utils/status.utils';

const LIMIT = 5;

const ApprovedUser = () => {

    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDelete, setDelete] = useState({ status: false, id: "", statusNumber: "" });
    const [total, setTotal] = useState(0);
    const [pageNum, setPageNum] = useState(1);

    const handleChangeStatus = async (id, status) => {
        setLoading(true);
        let data = {
            status
        };
        const response = await ApiService.putAPIWithAccessToken(api.UserStatusChange + `${id}`, data);
        if (response.data.headers.success === 1) { toast.success('Status changed!'); getUserList(api.AllUser + `?status=1&page=${pageNum}&limit=${LIMIT}`); }
        setDelete({ status: false, id: "", statusNumber: "" });
        setLoading(false);
    }

    const getUserList = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("approve users list => ", response.data.body);
        if (response.data.headers.success === 1) {
            setUser(response.data.body.listing);
            setTotal(response.data.body.totalCount);
        }
        else setUser([]);
        setLoading(false);
    }

    const handleFilter = (e) => {
        e.persist();
        let name = "";
        let email = "";
        if (e.target.name === 'name') name = e.target.value;
        if (e.target.name === 'email') email = e.target.value;
        getUserList(api.AllUser + `?status=1&name=${name}&email=${email}&page=${pageNum}&limit=${LIMIT}`);
    }

    useEffect(() => {
        getUserList(api.AllUser + `?status=1&page=${pageNum}&limit=${LIMIT}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum]);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="user-table-section">
                <div className="heading-section">
                    <Link className="Back-btn" to="/users"><i className="las la-arrow-left"></i> Back</Link>
                </div>

                <div>
                    <nav className='p-0'>
                        <ol className="cd-breadcrumb m-0">
                            <li><Link to="/users">Users</Link></li>
                            <li className="current"><em>User Details</em></li>
                        </ol>
                    </nav>
                </div>

                <div className="stockoptions-header mt-3">
                    <div className="mr-auto">
                        <h4 className="heading-title">Approve User Profile</h4>
                    </div>
                    <div className="stockoptions-filter wd40">
                        <div className="row g-2">
                            <div className="col-md-6">
                                <div className="search-form-group">
                                    <input type="text" name="name" className="form-control" onChange={(e) => handleFilter(e)} placeholder="Search By Name" style={{ color: "#000" }} />
                                    <span className="search-icon"><i className="la la-search"></i></span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="search-form-group">
                                    <input type="text" name="email" className="form-control" onChange={(e) => handleFilter(e)} placeholder="Search By Email" style={{ color: "#000" }} />
                                    <span className="search-icon"><i className="la la-search"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="user-content-section">
                    {/* <h4 className="heading-title"></h4> */}
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
                                        <th>Contact Number </th>
                                        <th>Address</th>
                                        <th>Approval Status</th>
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
                                                                    <Link className="reject-btn mx-1" onClick={() => setDelete({ status: true, id: ele.id, statusNumber: 4 })} href="">Reject</Link>
                                                                    <Link className="approve-btn" onClick={() => handleChangeStatus(ele.id, 2)} href="">Approve</Link>
                                                                </div>
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
                            {
                                users.length !== 0 ?
                                    (
                                        <div className="cactus-table-pagination">
                                            <ul className="cactus-pagination">
                                                {pageNum !== 1 && <li className="disabled" id="example_previous" onClick={() => setPageNum(pageNum - 1)}>
                                                    <Link to="" aria-controls="example" data-dt-idx="0" tabIndex="0" className="page-link">Previous</Link>
                                                </li>}

                                                {
                                                    totalPageCalculator(total, LIMIT).length === 1 ? null :
                                                        (totalPageCalculator(total, LIMIT).map((pageNo, indx) => {
                                                            return (
                                                                <li className={pageNo === pageNum ? "active" : ""} key={indx} onClick={() => setPageNum(pageNo)}>
                                                                    <Link to="" className="page-link">{pageNo}</Link>
                                                                </li>
                                                            )
                                                        }))
                                                }

                                                {pageNum !== Math.ceil(total / LIMIT) && <li className="next" id="example_next" onClick={() => setPageNum(pageNum + 1)}>
                                                    <Link to="" aria-controls="example" data-dt-idx="7" tabIndex="0" className="page-link">Next</Link>
                                                </li>}
                                            </ul>
                                        </div>
                                    )
                                    :
                                    null
                            }
                        </div>
                        {/* <div className="cactus-table-pagination">
                            <ul className="cactus-pagination">
                                <li className="disabled" id="example_previous">
                                    <Link to="" aria-controls="example" data-dt-idx="0" tabIndex="0" className="page-link">Previous</Link>
                                </li>
                                <li className="active">
                                    <Link to="" className="page-link">1</Link>
                                </li>
                                <li className="">
                                    <Link to="" aria-controls="example" data-dt-idx="2" tabIndex="0" className="page-link">2</Link>
                                </li>
                                <li className="">
                                    <Link to="" aria-controls="example" data-dt-idx="3" tabIndex="0" className="page-link">3</Link>
                                </li>
                                <li className="next" id="example_next">
                                    <Link to="" aria-controls="example" data-dt-idx="7" tabIndex="0" className="page-link">Next</Link>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </div>

                <Modal isOpen={isDelete.status} toggle={() => { setDelete({ status: false, id: "", statusNumber: "" }); }} className="njmep-modal">
                    <div className="modal-content">
                        <ModalBody className='modal-body'>
                            <div className="deletenews-form-info">
                                <button
                                    type="button"
                                    onClick={() => { setDelete({ status: false, id: "", statusNumber: "" }); }}
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                >
                                </button>
                                <div className="deletenews-media">
                                    <img src={deleteImg} alt="not found" />
                                </div>
                                <h3>Are you sure want to Reject this User ?</h3>
                                <div className="deletenews-action">
                                    <Link className="no-btn mx-2" onClick={() => { setDelete({ status: false, id: "", statusNumber: "" }); }} to="">No</Link>
                                    <Link className="yes-btn" onClick={() => handleChangeStatus(isDelete.id, isDelete.statusNumber)} to="">Yes</Link>
                                </div>
                            </div>
                        </ModalBody>
                    </div>
                </Modal>

            </div>
        </>
    )
}

export default ApprovedUser