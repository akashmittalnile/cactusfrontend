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
import { totalPageCalculator, userStatus } from '../../../utils/status.utils';

const LIMIT = 4;

const UserDetails = () => {

    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const [toggle, setToggle] = useState(1);
    const { id: userId } = useParams();
    const [loading, setLoading] = useState(false);
    const [userOrder, setUserOrder] = useState([]);
    const [userClub, setUserClubs] = useState([]);
    const [details, setDetails] = useState({});

    const orderList = async (api) => {
        console.log(api);
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("all users order list => ", response.data.body);
        if (response.data.headers.success === 1) {
            setUserOrder(response.data.body.listing);
            setTotal(response.data.body.totalCount);
        }
        else setUserOrder([]);
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

    const handleFilter = (e) => {
        e.persist();
        let name = "";
        let start_date = "";
        let end_date = "";
        let order_type = "";
        if (e.target.name === 'name') name = e.target.value;
        if (e.target.name === 'start_date') start_date = e.target.value;
        if (e.target.name === 'end_date') end_date = e.target.value;
        if (e.target.name === 'order_type') order_type = e.target.value;
        orderList(api.UserOrderList + `${decode(userId)}?name=${name}&start_date=${start_date}&end_date=${end_date}&order_type=${order_type}`);
    }

    const clubFilter = (e) => {
        e.persist();
        let name = "";
        let status = "";
        if (e.target.name === 'name') name = e.target.value;
        if (e.target.name === 'status') status = e.target.value;
        clubList(api.UserClubList + `${decode(userId)}?name=${name}&status=${status}`);
    }

    useEffect(() => {
        orderList(api.UserOrderList + `${decode(userId)}?page=${pageNum}&limit=${LIMIT}`)
        userDetails(api.UserDetails + `${decode(userId)}`);
        clubList(api.UserClubList + `${decode(userId)}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggle, pageNum]);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="user-table-section">
                <div className="heading-section">
                    <Link className="Back-btn" to="" onClick={(e) => { e.preventDefault(); navigate(-1); }}><i className="las la-arrow-left"></i> Back</Link>
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
                                            <h4 className="heading-title">Stock list</h4>
                                        </div>
                                        <div className="stockoptions-filter wd70">
                                            <div className="row g-2">
                                                <div className="col-md-3">
                                                    <div className="search-form-group">
                                                        <input type="text" name="name" onChange={(e) => handleFilter(e)} className="form-control" placeholder="Search..." style={{ color: "#000", height: "39.5px" }} />
                                                        <span className="search-icon"><i className="la la-search"></i></span>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <input type="date" className="form-control" name="start_date" onChange={(e) => handleFilter(e)} />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <input type="date" className="form-control" name="end_date" onChange={(e) => handleFilter(e)} />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <select className="form-control" name='order_type' onChange={(e) => handleFilter(e)} style={{ height: "39.5px" }}>
                                                            <option value="">All</option>
                                                            <option value="sell">Sell</option>
                                                            <option value="buy">Buy</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="stockoptions-content-list">
                                        <div className="row">

                                            {
                                                userOrder.length !== 0 ?
                                                    (
                                                        userOrder.map((ele, indx) => {
                                                            return (
                                                                <div key={indx} className="col-md-6">
                                                                    <div className="stockoptions-item" onClick={(e) => { e.preventDefault(); navigate(`/user/order-details/${encode(ele.id)}`) }}>
                                                                        <div className="stockoptions-head">
                                                                            <div className={ele.type === 'buy' ? "byusell-option buy-opt" : "byusell-option sell-opt"}>{ele.type === 'buy' ? "Buy" : "Sell"}</div>
                                                                            <div className="stockoptions-msg-text">{ele.statusText}</div>
                                                                        </div>
                                                                        <div className="stockoptions-body">
                                                                            <div className="shares-comp-info">
                                                                                <div className="shares-comp-image">
                                                                                    <img src={one} alt="not-found" />
                                                                                </div>
                                                                                <div className="shares-comp-content">
                                                                                    <div className="shares-comp-name text-capitalize">{`${ele.name ?? ''} (${ele.symbol})`}</div>
                                                                                    <div className="shares-value">{ele.quantity ?? 0} Shares</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="stockoptions-foot">
                                                                            <div className="stockoptions-up-down">
                                                                                <div className="stockup">Total Cost : ${parseFloat(ele.total_cost ?? 0).toFixed(2)}</div>
                                                                                <div className="stockdown">Buying Cost : ${parseFloat(ele.value ?? 0).toFixed(2)}</div>
                                                                            </div>
                                                                            <div className="stockoptions-date">{moment(ele.created_date).format('MMMM Do YYYY, hh:mm A')}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    )
                                                    :
                                                    (
                                                        <div className="col-md-12 text-center mt-4 mt-5">
                                                            <p>No stocks found</p>
                                                        </div>
                                                    )
                                            }

                                        </div>

                                        {
                                            userOrder.length !== 0 ?
                                                (
                                                    <div className="cactus-table-pagination">
                                                        <ul className="cactus-pagination">
                                                            {pageNum !== 1 && <li className="disabled" id="example_previous" onClick={() => setPageNum(pageNum - 1)}>
                                                                <a href="#" aria-controls="example" data-dt-idx="0" tabIndex="0" className="page-link">Previous</a>
                                                            </li>}

                                                            {
                                                                totalPageCalculator(total, LIMIT).length === 1 ? null :
                                                                    (totalPageCalculator(total, LIMIT).map((pageNo, indx) => {
                                                                        return (
                                                                            <li className={pageNo === pageNum ? "active" : ""} key={indx} onClick={() => setPageNum(pageNo)}>
                                                                                <a href="#" className="page-link">{pageNo}</a>
                                                                            </li>
                                                                        )
                                                                    }))
                                                            }

                                                            {pageNum !== Math.ceil(total / LIMIT) && <li className="next" id="example_next" onClick={() => setPageNum(pageNum + 1)}>
                                                                <a href="#" aria-controls="example" data-dt-idx="7" tabIndex="0" className="page-link">Next</a>
                                                            </li>}
                                                        </ul>
                                                    </div>
                                                )
                                                :
                                                null
                                        }

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
                                                        <div className="col-md-12 text-center mt-4 mt-5">
                                                            <p>No club found</p>
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