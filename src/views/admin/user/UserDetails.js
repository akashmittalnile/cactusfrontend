import React, { useEffect, useState } from 'react';
import "../../../assets/admin/css/users.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import john from "../../../assets/images/admin/john-doe.png";
import email from "../../../assets/images/admin/email.svg";
import device from "../../../assets/images/admin/device.svg";
import phone from "../../../assets/images/admin/phone.svg";
import ip_add from "../../../assets/images/admin/ip-add.svg";
import u1 from "../../../assets/images/admin/u1.png";
import u2 from "../../../assets/images/admin/u2.png";
import u3 from "../../../assets/images/admin/u3.png";
import one from "../../../assets/images/admin/1.png";
// import two from "../../assets/images/admin/2.png";
// import three from "../../assets/images/admin/3.png";
// import four from "../../assets/images/admin/4.jpg";
import iobj from "../../../assets/images/admin/investmentobjectives.svg";
import eth from "../../../assets/images/admin/eth.svg";
import usdt from "../../../assets/images/admin/usdt.svg";
import bch from "../../../assets/images/admin/bch.svg";
import ada from "../../../assets/images/admin/ada.svg";
import ApiService from '../../../core/services/ApiService';
import Loader from '../../common/Loader';
import { decode } from 'base-64';
import moment from 'moment';
import { api } from '../../../utils/api.utils';
import { encode } from 'base-64';
import { userStatus } from '../../../utils/status.utils';
import credit from "../../../assets/images/admin/credit.svg";
import debit from "../../../assets/images/admin/debit.svg";
import nodata from "../../../assets/images/admin/no_data.png";


const UserDetails = () => {

    const navigate = useNavigate();
    const [toggle, setToggle] = useState(1);
    const { id: userId } = useParams();
    const [loading, setLoading] = useState(false);
    const [userClub, setUserClubs] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [listing, setListing] = useState([]);
    const [details, setDetails] = useState({});
    const [creditDebit, setCreditDebit] = useState({ total_credit: 0, user_club_credit: 0, manager_club_credit: 0, total_debit: 0, user_club_debit: 0, manager_club_debit: 0 });


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

    const userDetails = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("users details => ", response.data.body);
        if (response.data.headers.success === 1) setDetails(response.data.body);
        setLoading(false);
    }

    const clubList = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("all user club list => ", response.data.body);
        if (response.data.headers.success === 1) setUserClubs(response.data.body);
        setLoading(false);
    }

    const currentPrice = (sym) => {
        let obj = listing.find(o => o.symbol === sym);
        return obj.current_price ?? 0;
    }

    const clubFilter = (e) => {
        e.persist();
        let name = "";
        let status = "";
        if (e.target.name === 'name') name = e.target.value;
        if (e.target.name === 'status') status = e.target.value;
        clubList(api.UserClubList + `${decode(userId)}?name=${name}&status=${status}`);
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
        clubList(api.UserClubList + `${decode(userId)}`);
        graphData(api.UserManagerGraphData + `?added_by=${decode(userId)}`);
        portfolioList(api.Portfolio + `${decode(userId)}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggle]);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="user-table-section">
                <div className="heading-section d-flex justify-content-between">
                    <div>
                        <Link className="Back-btn" to="" onClick={(e) => { e.preventDefault(); navigate(-1); }}><i className="las la-arrow-left"></i> Back</Link>
                    </div>
                    <div className={(details.manager_request === '2') ? "manager-club-action d-flex wd50" : "manager-club-action d-flex wd30"}>
                        {(details.manager_request === '2') ? <Link className='mx-2' to={`/manager-details/${encode(details.id)}`}>Manager Mode</Link> : null}
                        <Link className='mx-2' to={`/user/orders/${userId}`}>Orders</Link>
                        <Link to={`/users-transaction-statement/${userId}`}>Transaction Statement</Link>
                    </div>
                </div>

                <div>
                    <nav className='p-0'>
                        <ol className="cd-breadcrumb m-0">
                            <li><Link to="/users">Users</Link></li>
                            <li className="current"><em>User Details</em></li>
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
                                            <div className="side-profile-media"><img src={john} alt="not-found" /></div>
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
                                    <li><Link to="" className={toggle === 1 ? "active" : ""} onClick={(e) => { e.preventDefault(); setToggle(1); }} data-bs-toggle="tab"> Portfolio Stocks </Link></li>
                                    {/* <li><Link to="" className={toggle === 2 ? "active" : ""} onClick={(e) => { e.preventDefault(); setToggle(2); }} data-bs-toggle="tab">Cryptocurrency</Link></li> */}
                                    <li><Link to="" className={toggle === 3 ? "active" : ""} onClick={(e) => { e.preventDefault(); setToggle(3); }} data-bs-toggle="tab"> Joined Clubs </Link></li>
                                    {/* <li><Link to="" className={toggle === 4 ? "active" : ""} onClick={(e) => { e.preventDefault(); setToggle(4); }} data-bs-toggle="tab">Managers</Link></li> */}
                                </ul>
                            </div>
                            <div className="order-content tab-content">
                                <div className={toggle === 1 ? "tab-pane active" : "tab-pane"} id="stockoptions">
                                    <div className="stockoptions-header">
                                        <div className="mr-auto">
                                            {/* <h4 className="heading-title">Portfolio Stocks</h4> */}
                                        </div>
                                        <div className="stockoptions-filter wd70">
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

                                <div className={toggle === 2 ? "tab-pane active" : "tab-pane"} id="cryptocurrency">
                                    <div className="stockoptions-header">
                                        <div className="mr-auto">
                                            <h4 className="heading-title">Cryptocurrency list</h4>
                                        </div>
                                        <div className="stockoptions-filter wd70">
                                            <div className="row g-2">
                                                <div className="col-md-3">
                                                    <div className="search-form-group">
                                                        <input type="text" name="" className="form-control" placeholder="Search..." />
                                                        <span className="search-icon"><i className="la la-search"></i></span>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <input type="date" className="form-control" name="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <input type="month" className="form-control" name="" />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <select className="form-control">
                                                            <option>Open</option>
                                                            <option>Past</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="stockoptions-content-list">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="stockoptions-item">
                                                    <div className="stockoptions-head">
                                                        <div className="byusell-option sell-opt">Sell</div>
                                                        <div className="stockoptions-msg-text">Extended Hours</div>
                                                    </div>
                                                    <div className="stockoptions-body">
                                                        <div className="shares-comp-info">
                                                            <div className="shares-comp-image">
                                                                <img src={eth} alt="not-found" />
                                                            </div>
                                                            <div className="shares-comp-content">
                                                                <div className="shares-comp-name">Ethereum</div>
                                                                <div className="shares-value">8 Shares</div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="stockoptions-chart">
                                                            <div id="stockoptions1"></div>
                                                        </div> */}
                                                    </div>
                                                    <div className="stockoptions-foot">
                                                        <div className="stockoptions-up-down">
                                                            <div className="stockup"><i className="las la-angle-up"></i> $873</div>
                                                            <div className="stockdown"><i className="las la-angle-down"></i> $73</div>
                                                        </div>
                                                        <div className="stockoptions-date">30 Dec, 2022, 00:07:52 AM</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="stockoptions-item">
                                                    <div className="stockoptions-head">
                                                        <div className="byusell-option buy-opt">Buy</div>
                                                        <div className="stockoptions-msg-text">Good For Day</div>
                                                    </div>
                                                    <div className="stockoptions-body">
                                                        <div className="shares-comp-info">
                                                            <div className="shares-comp-image">
                                                                <img src={usdt} alt="not-found" />
                                                            </div>
                                                            <div className="shares-comp-content">
                                                                <div className="shares-comp-name">Tether</div>
                                                                <div className="shares-value">8 Shares</div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="stockoptions-chart">
                                                            <div id="stockoptions1"></div>
                                                        </div>  */}
                                                    </div>
                                                    <div className="stockoptions-foot">
                                                        <div className="stockoptions-up-down">
                                                            <div className="stockup"><i className="las la-angle-up"></i> $873</div>
                                                            <div className="stockdown"><i className="las la-angle-down"></i> $73</div>
                                                        </div>
                                                        <div className="stockoptions-date">30 Dec, 2022, 00:07:52 AM</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="stockoptions-item">
                                                    <div className="stockoptions-head">
                                                        <div className="byusell-option">Option (Buy)</div>
                                                        <div className="stockoptions-msg-text">Good For Day</div>
                                                    </div>
                                                    <div className="stockoptions-body">
                                                        <div className="shares-comp-info">
                                                            <div className="shares-comp-image">
                                                                <img src={bch} alt="not-found" />
                                                            </div>
                                                            <div className="shares-comp-content">
                                                                <div className="shares-comp-name">Bitcoin</div>
                                                                <div className="shares-value">8 Shares</div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="stockoptions-chart">
                                                            <div id="stockoptions1"></div>
                                                        </div> */}
                                                    </div>
                                                    <div className="stockoptions-foot">
                                                        <div className="stockoptions-up-down">
                                                            <div className="stockup"><i className="las la-angle-up"></i> $873</div>
                                                            <div className="stockdown"><i className="las la-angle-down"></i> $73</div>
                                                        </div>
                                                        <div className="stockoptions-date">30 Dec, 2022, 00:07:52 AM</div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-md-6">
                                                <div className="stockoptions-item">
                                                    <div className="stockoptions-head">
                                                        <div className="byusell-option buy-opt">Buy</div>
                                                        <div className="stockoptions-msg-text">Extended Hours</div>
                                                    </div>
                                                    <div className="stockoptions-body">
                                                        <div className="shares-comp-info">
                                                            <div className="shares-comp-image">
                                                                <img src={ada} alt="not-found" />
                                                            </div>
                                                            <div className="shares-comp-content">
                                                                <div className="shares-comp-name">Cardano</div>
                                                                <div className="shares-value">8 Shares</div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="stockoptions-chart">
                                                            <div id="stockoptions1"></div>
                                                        </div> */}
                                                    </div>
                                                    <div className="stockoptions-foot">
                                                        <div className="stockoptions-up-down">
                                                            <div className="stockup"><i className="las la-angle-up"></i> $873</div>
                                                            <div className="stockdown"><i className="las la-angle-down"></i> $73</div>
                                                        </div>
                                                        <div className="stockoptions-date">30 Dec, 2022, 00:07:52 AM</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={toggle === 3 ? "tab-pane active" : "tab-pane"} id="userClub">
                                    <div className="stockoptions-header">
                                        <div className="mr-auto">
                                            <div className="club-info-box">
                                                {/* <h3>Ellie Blish's Club</h3>
                                                <h5>$1,527,789.77 <span className="st-text stup stup">44.26 (1.26%)</span></h5> */}
                                            </div>
                                        </div>
                                        <div className="stockoptions-filter wd50">
                                            <div className="row g-2">
                                                <div className="col-md-6">
                                                    <div className="search-form-group">
                                                        <input type="text" name="name" onChange={(e) => clubFilter(e)} className="form-control" placeholder="Search by Name" style={{ color: "#000", height: "39.5px" }} />
                                                        <span className="search-icon"><i className="la la-search"></i></span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="search-form-group">
                                                        <select name="status" onChange={(e) => clubFilter(e)} className="form-control" style={{ height: "39.5px" }}>
                                                            <option value="">Show All Club</option>
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
                                                userClub.length !== 0 ?
                                                    (
                                                        userClub.map((ele, indx) => {
                                                            return (
                                                                <div key={indx} className="col-md-6">
                                                                    <div className={"clubs-card"}>
                                                                        <div className="clubs-card-head">
                                                                            <div className="clubs-name">{ele.name ?? "NA"}</div>
                                                                            {/* <div className="clubs-value">{ele.statusText ?? ""}</div> */}
                                                                        </div>
                                                                        <div className="clubs-card-body">
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
                                                                            <div className="clubs-card-user-name">
                                                                                <h4>{ele.member_count ?? 0} Members</h4>
                                                                            </div>
                                                                        </div>
                                                                        <div className="clubs-card-action">
                                                                            <Link to={`/club-details/${encode(ele.club_id)}/${encode(ele.club_type)}`}>View</Link>
                                                                        </div>
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

                                <div className={toggle === 4 ? "tab-pane active" : "tab-pane"} id="Managers">
                                    <div className="stockoptions-header">
                                        <div className="mr-auto">
                                            <h4 className="heading-title">Managers list</h4>
                                        </div>
                                        <div className="stockoptions-filter wd30">
                                            <div className="row g-2">
                                                <div className="col-md-12">
                                                    <div className="search-form-group">
                                                        <input type="text" name="" className="form-control" placeholder="Search..." />
                                                        <span className="search-icon"><i className="la la-search"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stockoptions-content-list">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="managers-card">
                                                    <div className="managers-card-image">
                                                        <img src={john} alt="not-found" />
                                                    </div>
                                                    <div className="managers-card-text">
                                                        <h5>Jane Cooper</h5>
                                                        <p>23 Clients</p>
                                                    </div>
                                                    <div className="managers-card-action">
                                                        <Link to="/view-clubs">View clubs</Link>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="managers-card">
                                                    <div className="managers-card-image">
                                                        <img src={u2} alt="not-found" />
                                                    </div>
                                                    <div className="managers-card-text">
                                                        <h5>Cameron Williamson</h5>
                                                        <p>23 Clients</p>
                                                    </div>
                                                    <div className="managers-card-action">
                                                        <Link to="">View clubs</Link>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="managers-card">
                                                    <div className="managers-card-image">
                                                        <img src={u2} alt="not-found" />
                                                    </div>
                                                    <div className="managers-card-text">
                                                        <h5>Guy Hawkins</h5>
                                                        <p>23 Clients</p>
                                                    </div>
                                                    <div className="managers-card-action">
                                                        <Link to="">View clubs</Link>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-md-6">
                                                <div className="managers-card">
                                                    <div className="managers-card-image">
                                                        <img src={u3} alt="not-found" />
                                                    </div>
                                                    <div className="managers-card-text">
                                                        <h5>Jacob Jones</h5>
                                                        <p>23 Clients</p>
                                                    </div>
                                                    <div className="managers-card-action">
                                                        <Link to="">View clubs</Link>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-md-6">
                                                <div className="managers-card">
                                                    <div className="managers-card-image">
                                                        <img src={u1} alt="not-found" />
                                                    </div>
                                                    <div className="managers-card-text">
                                                        <h5>Brooklyn Simmons</h5>
                                                        <p>23 Clients</p>
                                                    </div>
                                                    <div className="managers-card-action">
                                                        <Link to="">View clubs</Link>
                                                    </div>
                                                </div>
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

export default UserDetails