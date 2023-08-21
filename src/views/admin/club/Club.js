import React, { useState, useEffect } from 'react';
import "../../../assets/admin/css/clubs.css";
import { Link } from 'react-router-dom';
import ApiService from '../../../core/services/ApiService';
import { encode } from 'base-64';
import u1 from "../../../assets/images/admin/u1.png";
import u2 from "../../../assets/images/admin/u2.png";
import u3 from "../../../assets/images/admin/u3.png";
import Loader from "../../common/Loader";
import { api } from '../../../utils/api.utils';
import { totalPageCalculator } from '../../../utils/status.utils';

const LIMIT = 6;


const Club = () => {

    const [toggle, setToggle] = useState(1);
    const [total1, setTotal1] = useState(0);
    const [pageNum1, setPageNum1] = useState(1);
    const [total2, setTotal2] = useState(0);
    const [pageNum2, setPageNum2] = useState(1);
    const [userClubs, setUserClub] = useState([]);
    const [users, setUser] = useState([]);
    const [managers, setManager] = useState([]);
    const [managerClubs, setManagerClub] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUserList = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("all user clubs list => ", response.data.body);
        if (response.data.headers.success === 1) {
            setUserClub(response.data.body.listing);
            setTotal1(response.data.body.totalCount);
        }
        else setUserClub([]);
        setLoading(false);
    }

    const getManagerList = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("all manager clubs list => ", response.data.body);
        if (response.data.headers.success === 1) {
            setManagerClub(response.data.body.listing);
            setTotal2(response.data.body.totalCount);
        }
        else setManagerClub([]);
        setLoading(false);
    }

    const handleFilterUser = (e) => {
        e.persist();
        let name = "";
        let status = "";
        let created_by = "";
        if (e.target.name === 'name') name = e.target.value;
        if (e.target.name === 'status') status = e.target.value;
        if (e.target.name === 'created_by') created_by = e.target.value;
        getUserList(api.AllUserClub + `?name=${name}&status=${status}&created_by=${created_by}&page=${pageNum1}&limit=${LIMIT}`);
    }

    const handleFilterManager = (e) => {
        e.persist();
        let name = "";
        let status = "";
        let created_by = "";
        if (e.target.name === 'name') name = e.target.value;
        if (e.target.name === 'status') status = e.target.value;
        if (e.target.name === 'created_by') created_by = e.target.value;
        getManagerList(api.AllManagerClub + `?name=${name}&status=${status}&created_by=${created_by}&page=${pageNum2}&limit=${LIMIT}`);
    }

    const getUserManagerNameList = async () => {
        setLoading(true);
        const response1 = await ApiService.getAPIWithAccessToken(api.AllUser);
        if (response1.data.headers.success === 1) setUser(response1.data.body.listing);
        else setUser([]);
        const response2 = await ApiService.getAPIWithAccessToken(api.AllManager);
        if (response2.data.headers.success === 1) setManager(response2.data.body.listing);
        else setManager([]);
        setLoading(false);
    }

    useEffect(() => {
        getUserList(api.AllUserClub + `?page=${pageNum1}&limit=${LIMIT}`);
        getManagerList(api.AllManagerClub + `?page=${pageNum2}&limit=${LIMIT}`);
        getUserManagerNameList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggle, pageNum1, pageNum2]);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="clubs-section">
                <div className="heading-section">
                    <div className="mr-auto">
                        <h4 className="heading-title">Clubs</h4>
                    </div>
                </div>

                <div className="clubs-tabs-info">
                    <div className="clubs-tabs-nav">
                        <ul className="nav nav-tabs" role="tablist">
                            <li><Link to="" onClick={(e) => { e.preventDefault(); setToggle(1); }} className={toggle === 1 ? "active" : ""}>Managers Club </Link>
                            </li>
                            <li><Link to="" onClick={(e) => { e.preventDefault(); setToggle(2); }} className={toggle === 2 ? "active" : ""} >Cactus Club</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="order-content tab-content">
                        <div className={toggle === 1 ? "tab-pane active show" : "tab-pane"} id="ManagersClub" role="tabpanel">
                            <div className="stockoptions-header">
                                <div className="mr-auto">
                                    <h4 className="heading-title">Managers Club</h4>
                                </div>
                                <div className="stockoptions-filter wd50">
                                    <div className="row g-2">

                                        <div className="col-md-4">
                                            <select className="form-control text-capitalize" name='created_by' onChange={(e) => handleFilterManager(e)} style={{ height: "39.5px" }}>
                                                <option value="">Select Manager</option>
                                                {
                                                    managers.map((ele, index) => {
                                                        return (
                                                            <option key={index} value={ele.id}>{ele.first_name ?? ""} {ele.last_name ?? ""}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group search-form-group">
                                                <input type="text" name="name" onChange={(e) => handleFilterManager(e)} className="form-control" placeholder="Search..." style={{ color: "#000", height: "39.5px" }} />
                                                <span className="search-icon"><i className="la la-search"></i></span>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <select className="form-control" name='status' onChange={(e) => handleFilterManager(e)} style={{ height: "39.5px" }}>
                                                    <option value="">Show All Managers Club</option>
                                                    <option value="1">Active Clubs</option>
                                                    <option value="2">Inactive Clubs</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="stockoptions-content-list">
                                <div className="row">

                                    {
                                        managerClubs.length !== 0 ?
                                            (
                                                managerClubs.map((ele, indx) => {
                                                    return (
                                                        <div className="col-md-6" key={indx}>
                                                            <div className={"clubs-card"}>
                                                                <div className="clubs-card-head">
                                                                    <div className="clubs-name text-capitalize">{ele.name ?? "NA"}</div>
                                                                    <div className="clubs-value">{ele.first_name ?? ""} {ele.last_name ?? ""}</div>
                                                                </div>
                                                                <div className="clubs-card-body">
                                                                    <div className="clubs-card-image">
                                                                        {
                                                                            (ele.image_url === "" || ele.image_url === null || ele.image_url === undefined) ? (
                                                                                <>
                                                                                    <div className="userImg"><img alt="not-found" src={u1} /></div>
                                                                                    <div className="userImg"><img alt="not-found" src={u2} /></div>
                                                                                    <div className="userImg"><img alt="not-found" src={u3} /></div>
                                                                                </>
                                                                            )
                                                                                :
                                                                                (
                                                                                    <div className="userImg"><img alt="not-found-image" src={ele.image_url} /></div>
                                                                                )
                                                                        }
                                                                    </div>
                                                                    <div className="clubs-card-user-name">
                                                                        <h4>{ele.member_count ?? 0} Members</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="clubs-card-action">
                                                                    <Link to={`/club-details/${encode(ele.id)}/${encode('manager')}`}>View</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            )
                                            :
                                            (
                                                <div className="col-12 text-center mt-4">
                                                    <p>No managers club found</p>
                                                </div>

                                            )
                                    }

                                    {
                                        managerClubs.length !== 0 ?
                                            (
                                                <div className="cactus-table-pagination">
                                                    <ul className="cactus-pagination">
                                                        {pageNum2 !== 1 && <li className="disabled" id="example_previous" onClick={() => setPageNum2(pageNum2 - 1)}>
                                                            <Link to="" aria-controls="example" data-dt-idx="0" tabIndex="0" className="page-link">Previous</Link>
                                                        </li>}

                                                        {
                                                            totalPageCalculator(total2, LIMIT).length === 1 ? null :
                                                                (totalPageCalculator(total2, LIMIT).map((pageNo, indx) => {
                                                                    return (
                                                                        <li className={pageNo === pageNum2 ? "active" : ""} key={indx} onClick={() => setPageNum2(pageNo)}>
                                                                            <Link to="" className="page-link">{pageNo}</Link>
                                                                        </li>
                                                                    )
                                                                }))
                                                        }

                                                        {pageNum2 !== Math.ceil(total2 / LIMIT) && <li className="next" id="example_next" onClick={() => setPageNum2(pageNum2 + 1)}>
                                                            <Link to="" aria-controls="example" data-dt-idx="7" tabIndex="0" className="page-link">Next</Link>
                                                        </li>}
                                                    </ul>
                                                </div>
                                            )
                                            :
                                            null
                                    }

                                </div>
                            </div>
                        </div>

                        <div className={toggle === 2 ? "tab-pane active show" : "tab-pane"} id="CactusClub" role="tabpanel">
                            <div className="stockoptions-header">
                                <div className="mr-auto">
                                    <h4 className="heading-title">Cactus Club</h4>
                                </div>
                                <div className="stockoptions-filter wd50">
                                    <div className="row g-2">

                                        <div className="col-md-4">
                                            <select className="form-control text-capitalize" name='created_by' onChange={(e) => handleFilterUser(e)} style={{ height: "39.5px" }}>
                                                <option value="">Select User</option>
                                                {
                                                    users.map((ele, index) => {
                                                        return (
                                                            <option key={index} value={ele.id}>{ele.first_name ?? ""} {ele.last_name ?? ""}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group search-form-group">
                                                <input type="text" name="name" onChange={(e) => handleFilterUser(e)} className="form-control" placeholder="Search..." style={{ color: "#000", height: "39.5px" }} />
                                                <span className="search-icon"><i className="la la-search"></i></span>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <select className="form-control" name='status' onChange={(e) => handleFilterUser(e)} style={{ height: "39.5px" }}>
                                                    <option value="">Show All Cactus Club</option>
                                                    <option value="1">Active Clubs</option>
                                                    <option value="2">Inactive Clubs</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="stockoptions-content-list">
                                <div className="row">

                                    {
                                        userClubs.length !== 0 ?
                                            (
                                                userClubs.map((ele, indx) => {
                                                    return (
                                                        <div className="col-md-6" key={indx}>
                                                            <div className={"clubs-card"}>
                                                                <div className="clubs-card-head">
                                                                    <div className="clubs-name text-capitalize">{ele.name ?? "NA"}</div>
                                                                    <div className="clubs-value">{ele.first_name ?? ""} {ele.last_name ?? ""}</div>
                                                                </div>
                                                                <div className="clubs-card-body">
                                                                    <div className="clubs-card-image">
                                                                        {
                                                                            (ele.image_url === "" || ele.image_url === null || ele.image_url === undefined) ? (
                                                                                <>
                                                                                    <div className="userImg"><img alt="not-found" src={u1} /></div>
                                                                                    <div className="userImg"><img alt="not-found" src={u2} /></div>
                                                                                    <div className="userImg"><img alt="not-found" src={u3} /></div>
                                                                                </>
                                                                            )
                                                                                :
                                                                                (
                                                                                    <div className="userImg"><img alt="not-found-image" src={ele.image_url} /></div>
                                                                                )
                                                                        }
                                                                    </div>
                                                                    <div className="clubs-card-user-name">
                                                                        <h4>{ele.member_count ?? 0} Members</h4>
                                                                    </div>
                                                                </div>
                                                                <div className="clubs-card-action">
                                                                    <Link to={`/club-details/${encode(ele.id)}/${encode('user')}`}>View</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            )
                                            :
                                            (
                                                <div className="col-12 text-center mt-4">
                                                    <p>No cactus club found</p>
                                                </div>

                                            )
                                    }

                                    {
                                        userClubs.length !== 0 ?
                                            (
                                                <div className="cactus-table-pagination">
                                                    <ul className="cactus-pagination">
                                                        {pageNum1 !== 1 && <li className="disabled" id="example_previous" onClick={() => setPageNum1(pageNum1 - 1)}>
                                                            <Link to="" aria-controls="example" data-dt-idx="0" tabIndex="0" className="page-link">Previous</Link>
                                                        </li>}

                                                        {
                                                            totalPageCalculator(total1, LIMIT).length === 1 ? null :
                                                                (totalPageCalculator(total1, LIMIT).map((pageNo, indx) => {
                                                                    return (
                                                                        <li className={pageNo === pageNum1 ? "active" : ""} key={indx} onClick={() => setPageNum1(pageNo)}>
                                                                            <Link to="" className="page-link">{pageNo}</Link>
                                                                        </li>
                                                                    )
                                                                }))
                                                        }

                                                        {pageNum1 !== Math.ceil(total1 / LIMIT) && <li className="next" id="example_next" onClick={() => setPageNum1(pageNum1 + 1)}>
                                                            <Link to="" aria-controls="example" data-dt-idx="7" tabIndex="0" className="page-link">Next</Link>
                                                        </li>}
                                                    </ul>
                                                </div>
                                            )
                                            :
                                            null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Club