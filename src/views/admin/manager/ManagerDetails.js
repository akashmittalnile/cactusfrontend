import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../../../assets/admin/css/manager.css";
import john1 from "../../../assets/images/admin/john-doe1.png";
import email from "../../../assets/images/admin/email.svg";
import device from "../../../assets/images/admin/device.svg";
import phone from "../../../assets/images/admin/phone.svg";
import ip_add from "../../../assets/images/admin/ip-add.svg";
import iexpe from "../../../assets/images/admin/investmentexperience.svg";
import iobj from "../../../assets/images/admin/investmentobjectives.svg";
import lsexp from "../../../assets/images/admin/leadershipexperience.svg";
import assmanage from "../../../assets/images/admin/assetmanagement.svg";
import club1 from "../../../assets/images/admin/club1.png";
import preview_xl from "../../../assets/images/admin/preview-xl.jpg";
import cl1 from "../../../assets/images/admin/cl1.png";
import t1 from "../../../assets/images/admin/t1.png";
import ApiService from '../../../core/services/ApiService';
import { api } from '../../../utils/api.utils';
import { decode } from 'base-64';
import Loader from '../../common/Loader';
import { userStatus } from '../../../utils/status.utils';
import moment from 'moment/moment';
import { encode } from 'base-64';
import u1 from "../../../assets/images/admin/u1.png";
import u2 from "../../../assets/images/admin/u2.png";
import u3 from "../../../assets/images/admin/u3.png";

const ManagerDetails = () => {

    const navigate = useNavigate();
    const [toggle, setToggle] = useState(1);
    const { id: userId } = useParams();
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({});
    const [managerClub, setManagerClub] = useState([]);
    const [managerClubStatus, setManagerClubStatus] = useState(1);

    const userDetails = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("manager details => ", response.data.body);
        if (response.data.headers.success === 1) setDetails(response.data.body);
        setLoading(false);
    }

    const handleFilter = (e) => {
        e.persist();
        let name = "";
        if (e.target.name === 'name') name = e.target.value;
        managerClubList(api.ManagerClub + `${decode(userId)}?status=${managerClubStatus}&name=${name}`);
    }

    const managerClubList = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("manager club list => ", response.data.body);
        if (response.data.headers.success === 1) setManagerClub(response.data.body);
        else setManagerClub([]);
        setLoading(false);
    }

    useEffect(() => {
        userDetails(api.UserDetails + `${decode(userId)}`);
        managerClubList(api.ManagerClub + `${decode(userId)}?status=${managerClubStatus}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [managerClubStatus]);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="user-table-section">
                <div className="heading-section d-flex justify-content-between">
                    <div>
                        <Link className="Back-btn" to="" onClick={(e) => { e.preventDefault(); navigate(-1); }} ><i className="las la-arrow-left"></i> Back</Link>
                    </div>
                    <div className="manager-club-action">
                        <Link to={`/manager-transaction-statement/${userId}`}>Transaction Statement</Link>
                    </div>
                </div>

                <div>
                    <nav className='p-0'>
                        <ol class="cd-breadcrumb m-0">
                            <li><Link to="/manager">Managers</Link></li>
                            <li class="current"><em>Manager Details</em></li>
                        </ol>
                    </nav>
                </div>

                <div className="user-content-section">
                    <div className="user-profile-section">
                        <div className="row g-1">
                            <div className="col-md-3">
                                <div className="side-profile-item">
                                    {
                                        (details.image_url === "" || details.image_url === null || details.image_url === undefined) ? (
                                            <div className="side-profile-media"><img src={john1} alt="not-found" /></div>
                                        ) :
                                            (
                                                <div className="side-profile-media"><img src={details.image_url} alt="not-found" /></div>
                                            )
                                    }
                                    <div className="side-profile-text">
                                        <h2 className='text-capitalize'>{details.first_name + ' ' + details.last_name}</h2>
                                        <Link className={details.status === '2' ? "user-active-btn" : "blocked-btn"} to=""> {userStatus(details.status)} User</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="user-contact-info">
                                            <div className="user-contact-info-icon">
                                                <img src={email} alt="not-found" />
                                            </div>
                                            <div className="user-contact-info-content">
                                                <h2>Email Address</h2>
                                                <p>{details.emailid ?? "NA"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="user-contact-info">
                                            <div className="user-contact-info-icon">
                                                <img src={phone} alt="not-found" />
                                            </div>
                                            <div className="user-contact-info-content">
                                                <h2>Phone Number</h2>
                                                <p>{details.phone_number ?? "NA"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="user-contact-info">
                                            <div className="user-contact-info-icon">
                                                <img src={device} alt="not-found" />
                                            </div>
                                            <div className="user-contact-info-content">
                                                <h2>Social Security Number</h2>
                                                <p>{details.SocialSecurity ?? "NA"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="user-contact-info">
                                            <div className="user-contact-info-icon">
                                                <img src={ip_add} alt="not-found" />
                                            </div>
                                            <div className="user-contact-info-content">
                                                <h2>Date of Birth</h2>
                                                <p>{moment(details.DOB).format('MMMM Do, YYYY')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="manager-overview-section">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="manager-overview-card">
                                    <div className="manager-overview-card-content">
                                        <p>Investment Experience</p>
                                        <h3>{details.investment_exp ?? ""}</h3>
                                    </div>
                                    <div className="manager-overview-card-icon">
                                        <img src={iexpe} alt="not-found" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="manager-overview-card">
                                    <div className="manager-overview-card-content">
                                        <p>Investment Objectives</p>
                                        <h3>{details.investment_obj ?? ""}</h3>
                                    </div>
                                    <div className="manager-overview-card-icon">
                                        <img src={iobj} alt="not-found" />
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-3">
                                <div className="manager-overview-card">
                                    <div className="manager-overview-card-content">
                                        <p>Leadership Experience</p>
                                        <h3>{details.leadership ?? ""}</h3>
                                    </div>
                                    <div className="manager-overview-card-icon">
                                        <img width={50} src={lsexp} alt="not-found" />
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-3">
                                <div className="manager-overview-card">
                                    <div className="manager-overview-card-content">
                                        <p>Asset Management</p>
                                        <h3>{details.asset_management ?? ""}</h3>
                                    </div>
                                    <div className="manager-overview-card-icon">
                                        <img src={assmanage} alt="not-found" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="user-details-content-section">
                        <div className="my-order-section">
                            <div className="my-order-tabs">
                                <ul className="nav nav-tabs">
                                    <li><Link to="" className={toggle === 1 ? 'active' : ''} onClick={(e) => { e.preventDefault(); setToggle(1); setManagerClubStatus(1); }} data-bs-toggle="tab">Created Clubs</Link></li>
                                    <li><Link to="" className={toggle === 3 ? 'active' : ''} onClick={(e) => { e.preventDefault(); setToggle(3); setManagerClubStatus(1); }} data-bs-toggle="tab">Portfolio stocks</Link></li>
                                    {/* <li><Link to="" className={toggle === 2 ? 'active' : ''} onClick={(e) => { e.preventDefault(); setToggle(2); setManagerClubStatus(2); }} data-bs-toggle="tab">Inactive Clubs</Link> 
                                    </li>*/}
                                </ul>
                            </div>
                            <div className="order-content tab-content">
                                <div className={toggle === 1 ? 'tab-pane active' : 'tab-pane'} id="ActiveClubs">
                                    <div className="stockoptions-header">
                                        <div className="mr-auto">
                                            <h4 className="heading-title">Active Clubs </h4>
                                        </div>
                                        <div className="stockoptions-filter wd30">
                                            <div className="row g-2">
                                                <div className="col-md-12">
                                                    <div className="search-form-group">
                                                        <input type="text" name="name" onChange={(e) => handleFilter(e)} className="form-control" placeholder="Search by Club Name" style={{ color: "#000" }} />
                                                        <span className="search-icon"><i className="la la-search"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="stockoptions-content-list">
                                        <div className="row">

                                            {
                                                managerClub.length !== 0 ?
                                                    (
                                                        managerClub.map((ele, indx) => {
                                                            return (
                                                                <div key={indx} className="col-md-4">
                                                                    <div className="manager-club-item">
                                                                        <div className="manager-club-profile">
                                                                            <div className="clubs-card-image">
                                                                                {
                                                                                    (ele.club_image === "" || ele.club_image === null || ele.club_image === undefined) ? (
                                                                                        <>
                                                                                            <div className="userImg"><img alt="not-found" src={u1} /></div>
                                                                                            <div className="userImg"><img alt="not-found" src={u2} /></div>
                                                                                            <div className="userImg"><img alt="not-found" src={u3} /></div>
                                                                                        </>
                                                                                    )
                                                                                        :
                                                                                        (
                                                                                            <div className="userImg"><img alt="not-found-image" src={ele.club_image} /></div>
                                                                                        )
                                                                                }
                                                                            </div>
                                                                            <div className="manager-club-profile-text">
                                                                                <h5>{ele.name ?? "NA"}</h5>
                                                                                <p>{ele.member_count ?? 0} Members</p>
                                                                            </div>
                                                                            <div className="manager-club-action">
                                                                                <Link to={`/club-details/${encode(ele.id)}/${encode('manager')}`}>View</Link>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="manager-club-content-info">
                                                                            <div className="manager-club-portfolio-text">
                                                                                <p>Portfolio </p>
                                                                                <h2>$1478.00 </h2>
                                                                            </div>
                                                                            <div className="manager-club-manstock stockup">
                                                                                <i className="las la-angle-up"></i> $873
                                                                            </div>
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    )
                                                    :
                                                    (
                                                        <div className="col-12 text-center mt-4">
                                                            <p>No active club found</p>
                                                        </div>
                                                    )
                                            }


                                        </div>
                                    </div>
                                </div>

                                <div className={toggle === 2 ? 'tab-pane active' : 'tab-pane'} id="InactiveClubs">
                                    <div className="stockoptions-header">
                                        <div className="mr-auto">
                                            <h4 className="heading-title">Inactive Clubs</h4>
                                        </div>
                                        <div className="stockoptions-filter wd30">
                                            <div className="row g-2">
                                                <div className="col-md-12">
                                                    <div className="search-form-group">
                                                        <input type="text" name="name" onChange={(e) => handleFilter(e)} className="form-control" placeholder="Search by Club Name" style={{ color: "#000" }} />
                                                        <span className="search-icon"><i className="la la-search"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="stockoptions-content-list">
                                        <div className="row">

                                            {
                                                managerClub.length !== 0 ?
                                                    (
                                                        managerClub.map((ele, indx) => {
                                                            return (
                                                                <div key={indx} className="col-md-4">
                                                                    <div className="manager-club-item">
                                                                        <div className="manager-club-profile">
                                                                            <div className="clubs-card-image">
                                                                                {
                                                                                    (ele.club_image === "" || ele.club_image === null || ele.club_image === undefined) ? (
                                                                                        <>
                                                                                            <div className="userImg"><img alt="not-found" src={u1} /></div>
                                                                                            <div className="userImg"><img alt="not-found" src={u2} /></div>
                                                                                            <div className="userImg"><img alt="not-found" src={u3} /></div>
                                                                                        </>
                                                                                    )
                                                                                        :
                                                                                        (
                                                                                            <div className="userImg"><img alt="not-found-image" src={ele.club_image} /></div>
                                                                                        )
                                                                                }
                                                                            </div>
                                                                            <div className="manager-club-profile-text">
                                                                                <h5>{ele.name ?? "NA"}</h5>
                                                                                <p>{ele.member_count ?? 0} Members</p>
                                                                            </div>
                                                                            <div className="manager-club-action">
                                                                                <Link to={`/club-details/${encode(ele.id)}/${encode('manager')}`}>View</Link>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div className="manager-club-content-info">
                                                                            <div className="manager-club-portfolio-text">
                                                                                <p>Portfolio </p>
                                                                                <h2>$1478.00 </h2>
                                                                            </div>
                                                                            <div className="manager-club-manstock stockup">
                                                                                <i className="las la-angle-up"></i> $873
                                                                            </div>
                                                                        </div> */}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    )
                                                    :
                                                    (
                                                        <div className="col-12 text-center mt-4">
                                                            <p>No inactive club found</p>
                                                        </div>
                                                    )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManagerDetails