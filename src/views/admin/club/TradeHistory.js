import React, { useEffect, useState } from 'react';
import "../../../assets/admin/css/users.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import one from "../../../assets/images/admin/1.png";
// import four from "../../assets/images/admin/4.jpg";
import Loader from '../../common/Loader';
import ApiService from '../../../core/services/ApiService';
import { decode } from 'base-64';
import moment from 'moment';
import { api } from '../../../utils/api.utils';

const TradeHistory = () => {

    const navigate = useNavigate();
    const { id: clubId } = useParams();
    const [loading, setLoading] = useState(false);
    const [tradeList, setTrade] = useState([]);

    const tradeHistory = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("trade history => ", response.data.body);
        if (response.data.headers.success === 1) setTrade(response.data.body);
        else setTrade([]);
        setLoading(false);
    }

    const handleFilter = (e) => {
        e.persist();
        let order_type = "";
        let status = "";
        let created_date = "";
        if (e.target.name === 'order_type') order_type = e.target.value;
        if (e.target.name === 'status') status = e.target.value;
        if (e.target.name === 'created_date') created_date = e.target.value;
        tradeHistory(api.ClubOrderList + `${decode(clubId)}?order_type=${order_type}&status=${status}&created_date=${created_date}`);
    }

    useEffect(() => {
        tradeHistory(api.ClubOrderList + `${decode(clubId)}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="user-table-section">
                <div className="user-content-section">
                    <div className="club-detail-header">
                        <div className="mr-auto">
                            <Link className="Back-btn" to="" onClick={(e) => { e.preventDefault(); navigate(-1) }}><i className="las la-arrow-left"></i> Back</Link>
                        </div>
                        <div className="stockoptions-filter wd50">
                            <div className="row g-2">

                                {/* <div className="col-md-4">
                                    <div className="form-group">
                                        <select className="form-control" name='status' onChange={(e) => handleFilter(e)}>
                                            <option value="">Select Status</option>
                                            <option value="1">Pending</option>
                                            <option value="2">Approved</option>
                                        </select>
                                    </div>
                                </div> */}

                                <div className="col-md-6">
                                    <div className="form-group search-form-group">
                                        <input type="date" name="created_date" className="form-control" onChange={(e) => handleFilter(e)} placeholder="Search..." style={{ color: "#000" }} />
                                        <span className="search-icon"><i className="la la-search"></i></span>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <select className="form-control" name='order_type' onChange={(e) => handleFilter(e)} style={{height: "44.5px"}}>
                                            <option value="">Select Order Type</option>
                                            <option value="buy">Buy</option>
                                            <option value="sell">Sell</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="club-detail-content">
                        <div className="stockoptions-header">
                            <div className="mr-auto">
                                <h4 className="heading-title">Trade History</h4>
                            </div>
                        </div>
                        <div className="stockoptions-content-list">
                            <div className="row">

                                {
                                    tradeList.length !== 0 ?
                                        (
                                            tradeList.map((ele, indx) => {
                                                return (
                                                    <div key={indx} className="col-md-4">
                                                        <div className="stockoptions-item">
                                                            <div className="stockoptions-head">
                                                                <div className={ele.type === 'buy' ? "byusell-option buy-opt" : "byusell-option sell-opt"}>{ele.type === 'buy' ? "Buy" : "Sell"}</div>
                                                                <div className="stockoptions-msg-text text-capitalize">{ele.order_type ?? ""}</div>
                                                            </div>
                                                            <div className="stockoptions-body">
                                                                <div className="shares-comp-info">
                                                                    <div className="shares-comp-image">
                                                                        <img src={one} alt="not-found" />
                                                                    </div>
                                                                    <div className="shares-comp-content">
                                                                        <div className="shares-comp-name text-capitalize">{ele.name} ({ele.symbol})</div>
                                                                        <div className="shares-value">{ele.quantity} Shares</div>
                                                                        <div  className="mt-2" style={{fontSize: "13px"}}><b>Total buy price : </b>{parseFloat(ele.total_cost ?? 0).toFixed(2)}</div>
                                                                        <div  className="mt-2" style={{fontSize: "13px"}}><b>Stock buy price : </b>{parseFloat(ele.value ?? 0).toFixed(2)}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="stockoptions-foot">
                                                                <div className="stockoptions-up-down">
                                                                    {/* <div className="stockup"><i className="las la-angle-up"></i> $873</div>
                                                                    <div className="stockdown"><i className="las la-angle-down"></i> $73</div> */}
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
                                                <p>No trade history found</p>
                                            </div>
                                        )
                                }


                                {/* <div className="col-md-4">
                                    <div className="stockoptions-item">
                                        <div className="stockoptions-head">
                                            <div className="byusell-option buy-opt">Buy</div>
                                        </div>
                                        <div className="stockoptions-body">
                                            <div className="shares-comp-info">
                                                <div className="shares-comp-image">
                                                    <img src={four} alt="not-found" />
                                                </div>
                                                <div className="shares-comp-content">
                                                    <div className="shares-comp-name">HCLTech</div>
                                                    <div className="shares-value">8 Shares</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stockoptions-foot">
                                            <div className="stockoptions-up-down">
                                                <div className="stockup"><i className="las la-angle-up"></i> $873</div>
                                                <div className="stockdown"><i className="las la-angle-down"></i> $73</div>
                                            </div>
                                            <div className="stockoptions-date">30 Dec, 2022, 00:07:52 AM</div>
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TradeHistory