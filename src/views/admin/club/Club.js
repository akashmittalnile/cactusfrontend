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

const Club = () => {

    const [toggle, setToggle] = useState(1);
    const [userClubs, setUserClub] = useState([]);
    const [managerClubs, setManagerClub] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUserList = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("all user clubs list => ", response.data.body);
        if (response.data.headers.success === 1) setUserClub(response.data.body);
        else setUserClub([]);
        setLoading(false);
    }

    const getManagerList = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("all manager clubs list => ", response.data.body);
        if (response.data.headers.success === 1) setManagerClub(response.data.body);
        else setManagerClub([]);
        setLoading(false);
    }

    const handleFilterUser = (e) => {
        e.persist();
        let name = "";
        let status = "";
        if (e.target.name === 'name') name = e.target.value;
        if (e.target.name === 'status') status = e.target.value;
        getUserList(api.AllUserClub + `?name=${name}&status=${status}`);
    }

    const handleFilterManager = (e) => {
        e.persist();
        let name = "";
        let status = "";
        if (e.target.name === 'name') name = e.target.value;
        if (e.target.name === 'status') status = e.target.value;
        getManagerList(api.AllManagerClub + `?name=${name}&status=${status}`);
    }

    useEffect(() => {
        getUserList(api.AllUserClub);
        getManagerList(api.AllManagerClub);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                                                                    {/* <div className="clubs-value">+44.26</div> */}
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