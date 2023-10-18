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
import credit from "../../../assets/images/admin/credit.svg";
import debit from "../../../assets/images/admin/debit.svg";
import nodata from "../../../assets/images/admin/no_data.png";

const ManagerDetails = () => {

    const navigate = useNavigate();
    const [toggle, setToggle] = useState(3);
    const { id: userId } = useParams();
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({});
    const [managerClub, setManagerClub] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [listing, setListing] = useState([]);
    const [creditDebit, setCreditDebit] = useState({ total_credit: 0, user_club_credit: 0, manager_club_credit: 0, total_debit: 0, user_club_debit: 0, manager_club_debit: 0 });

    const userDetails = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("manager details => ", response.data.body);
        if (response.data.headers.success === 1) setDetails(response.data.body);
        setLoading(false);
    }

    const currentPrice = (sym) => {
        let obj = listing.find(o => o.symbol === sym);
        return obj.current_price ?? 0;
    }

    const portfolioList = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("all portfolio => ", response.data.body);
        if (response.data.headers.success === 1) {
            setPortfolio(response.data.body.portfolio);
            setListing(response.data.body.listing);
        }
        setLoading(false);
    }

    const handleFilter = (e) => {
        e.persist();
        let name = "";
        let status = "";
        if (e.target.name === 'name') name = e.target.value;
        if (e.target.name === 'status') status = e.target.value;
        managerClubList(api.ManagerClub + `${decode(userId)}?status=${status}&name=${name}`);
    }

    const managerClubList = async (api) => {
        console.log(api);
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("manager club list => ", response.data.body);
        if (response.data.headers.success === 1) setManagerClub(response.data.body);
        else setManagerClub([]);
        setLoading(false);
    }

    const graphData = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("user graph data => ", response.data.body);
        if (response.data.headers.success === 1) {
            let total_credit = 0, total_debit = 0, user_total_debit = 0, user_total_credit = 0, manager_total_debit = 0, manager_total_credit = 0;
            if (response.data.body.length > 0) {
                (response.data.body).map((ele) => {
                    total_debit += ele.total_debit;
                    total_credit += ele.total_credit;
                    user_total_credit += ele.User_club_total_credit;
                    user_total_debit += ele.User_club_total_debit;
                    manager_total_credit += ele.manager_club_total_credit;
                    manager_total_debit += ele.manager_club_total_debit;
                });
            }
            setCreditDebit({ total_credit: total_credit, user_club_credit: user_total_credit, manager_club_credit: manager_total_credit, total_debit: total_debit, user_club_debit: user_total_debit, manager_club_debit: manager_total_debit });
        }
        setLoading(false);
    }

    useEffect(() => {
        userDetails(api.UserDetails + `${decode(userId)}`);
        managerClubList(api.ManagerClub + `${decode(userId)}?status=1`);
        portfolioList(api.Portfolio + `${decode(userId)}`);
        graphData(api.UserManagerGraphData + `?added_by=${decode(userId)}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggle]);

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
                        <ol className="cd-breadcrumb m-0">
                            <li><Link to="/users">Users</Link></li>
                            <li><Link to={`/user-details/${userId}`}>User Details</Link></li>
                            <li className="current"><em>Manager Mode</em></li>
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

                            <div className="col-md-6">
                                <div className="manager-overview-card">
                                    <div className="manager-overview-card-content">
                                        <p>Total credit amount</p>
                                        <h3>{creditDebit.total_credit ?? 0}</h3>
                                    </div>
                                    <div className="manager-overview-card-icon">
                                        <img src={credit} alt="not-found" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="manager-overview-card">
                                    <div className="manager-overview-card-content">
                                        <p>Total debit amount</p>
                                        <h3>{creditDebit.total_debit ?? 0}</h3>
                                    </div>
                                    <div className="manager-overview-card-icon">
                                        <img src={debit} alt="not-found" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="manager-overview-card">
                                    <div className="manager-overview-card-content">
                                        <p>Total credit amount in cactus clubs</p>
                                        <h3>{creditDebit.user_club_credit ?? 0}</h3>
                                    </div>
                                    <div className="manager-overview-card-icon">
                                        <img src={credit} alt="not-found" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="manager-overview-card">
                                    <div className="manager-overview-card-content">
                                        <p>Total debit amount in cactus clubs</p>
                                        <h3>{creditDebit.user_club_debit ?? 0}</h3>
                                    </div>
                                    <div className="manager-overview-card-icon">
                                        <img src={debit} alt="not-found" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="manager-overview-card">
                                    <div className="manager-overview-card-content">
                                        <p>Total credit amount in manager clubs</p>
                                        <h3>{creditDebit.manager_club_credit ?? 0}</h3>
                                    </div>
                                    <div className="manager-overview-card-icon">
                                        <img src={credit} alt="not-found" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="manager-overview-card">
                                    <div className="manager-overview-card-content">
                                        <p>Total debit amount in manager clubs</p>
                                        <h3>{creditDebit.manager_club_debit ?? 0}</h3>
                                    </div>
                                    <div className="manager-overview-card-icon">
                                        <img src={debit} alt="not-found" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="user-details-content-section">
                        <div className="my-order-section">
                            <div className="my-order-tabs">
                                <ul className="nav nav-tabs">
                                    {/* <li><Link to="" className={toggle === 1 ? 'active' : ''} onClick={(e) => { e.preventDefault(); setToggle(3); }} data-bs-toggle="tab">Portfolio stocks</Link></li> */}
                                    <li><Link to="" className={toggle === 3 ? 'active' : ''} onClick={(e) => { e.preventDefault(); setToggle(1); }} data-bs-toggle="tab">Created Clubs</Link></li>
                                </ul>
                            </div>
                            <div className="order-content tab-content">
                                <div className={toggle === 3 ? 'tab-pane active' : 'tab-pane'} id="ActiveClubs">
                                    <div className="stockoptions-header">
                                        <div className="mr-auto">
                                            <h4 className="heading-title">Active Clubs </h4>
                                        </div>
                                        <div className="stockoptions-filter wd50">
                                            <div className="row g-2">
                                                <div className="col-md-6">
                                                    <div className="search-form-group">
                                                        <input type="text" name="name" onChange={(e) => handleFilter(e)} className="form-control" placeholder="Search by Club Name" style={{ color: "#000", height: "44.5px" }} />
                                                        <span className="search-icon"><i className="la la-search"></i></span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="search-form-group">
                                                        <select name="status" onChange={(e) => handleFilter(e)} className="form-control" style={{ height: "44.5px" }}>
                                                            <option value="">Select Status</option>
                                                            <option value="1">Active</option>
                                                            <option value="2">Inactive</option>
                                                        </select>
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
                                                        <div className="col-md-12 text-center mt-4">
                                                            <div>
                                                                <img className='mb-3' src={nodata} alt="no-data" />
                                                                <p>No club found</p>
                                                            </div>
                                                        </div>
                                                    )
                                            }


                                        </div>
                                    </div>
                                </div>

                                <div className={toggle === 1 ? 'tab-pane active' : 'tab-pane'} id="InactiveClubs">

                                    <div className="stockoptions-header">
                                        <div className="mr-auto">
                                            {/* <h4 className="heading-title">Inactive Clubs</h4> */}
                                        </div>
                                        <div className="stockoptions-filter wd30">
                                            <div className="row g-2">

                                            </div>
                                        </div>
                                    </div>

                                    <div className="stockoptions-content-list">
                                        <div className="user-table-card">
                                            <div className="table-responsive">
                                                <table className="table table-users">
                                                    <thead>
                                                        <tr>
                                                            <th>S.No</th>
                                                            <th>Name</th>
                                                            <th>Symbol</th>
                                                            <th>Total price</th>
                                                            <th>Current Price</th>
                                                            <th>Quantity</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            portfolio.length !== 0 ?
                                                                (
                                                                    portfolio.map((ele, indx) => {
                                                                        return (
                                                                            <tr key={indx}>
                                                                                <td>{indx + 1}</td>
                                                                                <td className='text-capitalize'>{ele.name ?? "NA"}</td>
                                                                                <td>{ele.symbol ?? "NA"}</td>
                                                                                <td>{parseFloat(ele.total_cost).toFixed(2) ?? 0}</td>
                                                                                <td>{parseFloat(currentPrice(ele.symbol)).toFixed(2)}</td>
                                                                                <td>{ele.quantity ?? 0}</td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                )
                                                                :
                                                                (
                                                                    <tr className='text-center'>
                                                                        <td colSpan="6">
                                                                            <div>
                                                                                <img className='my-3' src={nodata} alt="no-data" />
                                                                                <p>No portfolio stocks found</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
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