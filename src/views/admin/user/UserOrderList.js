import React, { useEffect, useState } from 'react';
import "../../../assets/admin/css/users.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import one from "../../../assets/images/admin/1.png";
// import four from "../../assets/images/admin/4.jpg";
import Loader from '../../common/Loader';
import ApiService from '../../../core/services/ApiService';
import moment from 'moment';
import { api } from '../../../utils/api.utils';
import { totalPageCalculator } from '../../../utils/status.utils';
import { encode, decode } from 'base-64';

const LIMIT = 4;

const UserOrderList = () => {

    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const { id: userId } = useParams();
    const [loading, setLoading] = useState(false);
    const [userOrder, setUserOrder] = useState([]);

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
        orderList(api.UserOrderList + `${decode(userId)}?name=${name}&start_date=${start_date}&end_date=${end_date}&order_type=${order_type}&page=${pageNum}&limit=${LIMIT}`);
    }

    useEffect(() => {
        orderList(api.UserOrderList + `${decode(userId)}?page=${pageNum}&limit=${LIMIT}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum])

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="user-table-section">
                <div className="user-content-section">
                    <div className="club-detail-header">
                        <div className="mr-auto">
                            <Link className="Back-btn" to="" onClick={(e) => { e.preventDefault(); navigate(-1) }}><i className="las la-arrow-left"></i> Back</Link>
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

                    <div>
                        <nav className='p-0'>
                            <ol className="cd-breadcrumb m-0">
                                <li><Link to="/users">Users</Link></li>
                                <li><Link to={`/user-details/${userId}`}>User Details</Link></li>
                                <li className="current"><em>Stock Details</em></li>
                            </ol>
                        </nav>
                    </div>

                    <div className="club-detail-content mt-3">
                        <div className="stockoptions-header">
                            <div className="mr-auto">
                                <h4 className="heading-title">User Orders</h4>
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
                                                                {/* <div className="stockoptions-msg-text">{ele.statusText}</div> */}
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
                                                <p>No order found</p>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserOrderList