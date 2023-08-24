import React, { useState, useEffect } from 'react';
import "../../../assets/admin/css/users.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import one from "../../../assets/images/admin/1.png";
// import two from "../../assets/images/admin/2.png";
// import three from "../../assets/images/admin/3.png";
// import four from "../../assets/images/admin/4.jpg";
import { decode, encode } from 'base-64';
import Loader from '../../common/Loader';
import ApiService from '../../../core/services/ApiService';
import { api } from '../../../utils/api.utils';
import moment from 'moment';
import { totalPageCalculator } from '../../../utils/status.utils';
import nodata from "../../../assets/images/admin/no_data.png";

const LIMIT = 4;

const Proposal = () => {

    const navigate = useNavigate();
    const { id: proId } = useParams();
    const [loading, setLoading] = useState(false);
    const [propList, setPropList] = useState([]);
    const [total, setTotal] = useState(0);
    const [pageNum, setPageNum] = useState(1);

    const getProposalList = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("proposal Response => ", response.data);
        if (response.data.headers.success === 1) {
            setPropList(response.data.body.listing);
            setTotal(response.data.body.totalCount);
        }
        else setPropList([]);
        setLoading(false);
    }

    const optionType = (value) => {
        if (value === 'group_invite') return 'Group Invite';
        else if (value === 'expulsion') return 'Explusion';
        else if (value === 'stock') return 'Stock';
        else if (value === 'setting_changes') return 'Setting Changes';
        else return "NA";
    }

    const handleFilter = (e) => {
        e.persist();
        let type = "";
        let status = "";
        let option_type = "";
        let created_date = "";
        if (e.target.name === 'type') type = e.target.value;
        if (e.target.name === 'status') status = e.target.value;
        if (e.target.name === 'option_type') option_type = e.target.value;
        if (e.target.name === 'created_date') created_date = e.target.value;
        getProposalList(api.ClubProposalList + `${decode(proId)}?type=${type}&status=${status}&option_type=${option_type}&created_date=${created_date}`);
    }

    useEffect(() => {
        getProposalList(api.ClubProposalList + `${decode(proId)}?page=${pageNum}&limit=${LIMIT}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum]);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="user-table-section">
                <div className="user-content-section">
                    <div className="club-detail-header">
                        <div className="mr-auto">
                            <Link className="Back-btn" to="" onClick={(e) => { e.preventDefault(); navigate(-1) }} ><i className="las la-arrow-left"></i> Back</Link>
                        </div>
                    </div>

                    <div>
                        <nav className='p-0'>
                            <ol className="cd-breadcrumb m-0">
                                <li><Link to="/clubs">Clubs</Link></li>
                                <li><Link to="" onClick={() => navigate(-1)}>Club Details</Link></li>
                                <li className="current"><em>Club's Proposals</em></li>
                            </ol>
                        </nav>
                    </div>

                    <div className="club-detail-content mt-3">
                        <div className="stockoptions-header">
                            <div className="mr-auto">
                                <h4 className="heading-title">Cactus Club’s Proposals</h4>
                            </div>
                            <div className="stockoptions-filter wd70">
                                <div className="row g-2">
                                    {/* <div className="col-md-3">
                                        <div className="search-form-group">
                                            <input type="text" name="" className="form-control" placeholder="Search..." />
                                            <span className="search-icon"><i className="la la-search"></i></span>
                                        </div>
                                    </div> */}
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <input type="date" className="form-control" name="created_date" onChange={(e) => handleFilter(e)} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <select className="form-control" name='status' onChange={(e) => handleFilter(e)}>
                                                <option value="">Select Status</option>
                                                <option value="1">Pending</option>
                                                <option value="2">Approved</option>
                                                <option value="3">Rejected</option>
                                                <option value="1">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <select className="form-control" name='option_type' onChange={(e) => handleFilter(e)}>
                                                <option value="">Select Option Type</option>
                                                <option value="expulsion">Expulsion</option>
                                                <option value="group_invite">Group Invites</option>
                                                <option value="setting_changes">Setting Changes</option>
                                                <option value="stock">Stock</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <select className="form-control" name='type' onChange={(e) => handleFilter(e)}>
                                                <option value="">Select Type</option>
                                                <option value="buy">Buy</option>
                                                <option value="sell">Sell</option>
                                                <option value="option">Option</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="stockoptions-content-list">
                            <div className="row">

                                {
                                    propList.length !== 0 ?
                                        (
                                            propList.map((ele, indx) => {
                                                return (
                                                    <div key={indx} className="col-md-6">
                                                        <div className="stockoptions-item" onClick={(e) => { e.preventDefault(); navigate(`/club/proposal-details/${encode(ele.id)}`) }}>
                                                            <div className="stockoptions-head">
                                                                {
                                                                    (ele.type === null || ele.type === "") ? (<div></div>) :
                                                                        (
                                                                            <div className={(ele.type === 'Sell' ? "byusell-option sell-opt" : (ele.type === 'Buy' ? "byusell-option buy-opt" : "byusell-option"))}>{ele.type ?? "NA"}</div>
                                                                        )
                                                                }
                                                                <div className="stockoptions-msg-text">Status : {ele.statusText}</div>
                                                                <div className="stockoptions-msg-text">Option : {optionType(ele.option_type)}</div>
                                                            </div>
                                                            <div className="stockoptions-body">
                                                                <div className="shares-comp-info">
                                                                    <div className="shares-comp-image">
                                                                        <img src={one} alt="not-found" />
                                                                    </div>
                                                                    <div className="shares-comp-content">
                                                                        <div className="shares-comp-name">{ele.club_name}</div>
                                                                        <div className="shares-value">{ele.quantity ?? 0} Shares</div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="stockoptions-chart">
                                                                    <div id="stockoptions1"></div>
                                                                </div> */}
                                                            </div>
                                                            <div className="stockoptions-foot">
                                                                <div className="stockoptions-up-down">
                                                                    <div className="stockup">Total Cost : ${parseFloat(ele.total_cost).toFixed(2)}</div>
                                                                    <div className="stockdown">Buying Cost : ${parseFloat(ele.price).toFixed(2)}</div>
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
                                            <div className="col-md-12 text-center mt-4">
                                                <div>
                                                    <img className='mb-3' src={nodata} alt="no-data" />
                                                    <p>No proposals found</p>
                                                </div>
                                            </div>
                                        )
                                }

                                {
                                    propList.length !== 0 ?
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


                                {/* <div className="col-md-6">
                                    <div className="stockoptions-item">
                                        <div className="stockoptions-head">
                                            <div className="byusell-option buy-opt">Buy</div>
                                            <div className="stockoptions-msg-text">Good For Day</div>
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
                                                    <img src={two} alt="not-found" />
                                                </div>
                                                <div className="shares-comp-content">
                                                    <div className="shares-comp-name">Genpact</div>
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

export default Proposal