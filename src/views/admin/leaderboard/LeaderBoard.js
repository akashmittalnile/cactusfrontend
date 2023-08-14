import React, { useEffect, useState } from 'react';
import "../../../assets/admin/css/leaderboard.css";
import { Link } from 'react-router-dom';
import u1 from "../../../assets/images/admin/u1.png";
import lead1crown from "../../../assets/images/admin/lead1-crown.svg";
import investment from "../../../assets/images/admin/investment-logo.jpg";
import lead3 from "../../../assets/images/admin/lead3.svg";
import lead1 from "../../../assets/images/admin/lead1.svg";
import lead2 from "../../../assets/images/admin/lead2.svg";
import john from "../../../assets/images/admin/john-doe.png";
import john1 from "../../../assets/images/admin/john-doe1.png";
import john3 from "../../../assets/images/admin/john-doe3.png";
import google from "../../../assets/images/admin/google.png";
import three from "../../../assets/images/admin/3.png";
import two from "../../../assets/images/admin/2.png";
import four from "../../../assets/images/admin/4.jpg";
import ApiService from '../../../core/services/ApiService';
import Loader from '../../common/Loader';
import { api } from '../../../utils/api.utils';

const LeaderBoard = () => {

    const [toggle, setToggle] = useState(1);
    const [loading, setLoading] = useState(false);
    const [userLeaderboard, setUserLeaderboard] = useState([]);
    const [rankUser1, setUserRank1] = useState({});
    const [rankUser2, setUserRank2] = useState({});
    const [rankUser3, setUserRank3] = useState({});
    const [managerLeaderboard, setManagerLeaderboard] = useState([]);
    const [rankManager1, setManagerRank1] = useState({});
    const [rankManager2, setManagerRank2] = useState({});
    const [rankManager3, setManagerRank3] = useState({});

    const getUserLeaderboard = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("user leaderboard => ", response.data.body);
        if (response.data.headers.success === 1) {
            for (let i = 0; i < (response.data.body).length; i++) {
                if (i === 0) setUserRank1(response.data.body[i]);
                if (i === 1) setUserRank2(response.data.body[i]);
                if (i === 2) setUserRank3(response.data.body[i]);
                else if (i > 2) setUserLeaderboard(leaderboard => [...leaderboard, response.data.body[i]]);
            }
        }
        else setUserLeaderboard([]);
        setLoading(false);
    }

    const getManagerLeaderboard = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("manager leaderboard => ", response.data.body);
        if (response.data.headers.success === 1) {
            for (let i = 0; i < (response.data.body).length; i++) {
                if (i === 0) setManagerRank1(response.data.body[i]);
                if (i === 1) setManagerRank2(response.data.body[i]);
                if (i === 2) setManagerRank3(response.data.body[i]);
                else if (i > 2) setManagerLeaderboard(leaderboard => [...leaderboard, response.data.body[i]]);
            }
        }
        else setManagerLeaderboard([]);
        setLoading(false);
    }

    useEffect(() => {
        getUserLeaderboard(api.UserLeaderboard);
        getManagerLeaderboard(api.ManagerLeaderboard);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="leaderboard-section">
                {/* <div className="leaderboard-header">
                        <div className="mr-auto">
                            <a className="Back-btn" href="users-details.html"><i className="las la-arrow-left"></i> Back</a>
                        </div>
                    </div>  */}
                <div className="leaderboard-wrapper-info">
                    <div className="leaderboard-heading"><h2>Leaderboard</h2></div>
                    <div className="leaderboard-tabs">
                        <ul className="nav nav-tabs" role="tablist">
                            <li><Link to="" className={toggle === 1 ? 'active' : ''} onClick={(e) => { e.preventDefault(); setToggle(1); }} data-bs-toggle="tab">Managers Club </Link></li>
                            <li><Link to="" className={toggle === 2 ? 'active' : ''} onClick={(e) => { e.preventDefault(); setToggle(2); }} data-bs-toggle="tab">Cactus Club</Link>
                            </li>
                            {/* <li><Link to="" className={toggle === 3 ? 'active' : ''} onClick={(e) => { e.preventDefault(); setToggle(3); }} data-bs-toggle="tab">Stocks</Link>
                            </li> */}
                        </ul>
                    </div>
                    <div className="leaderboard-tabs-content tab-content">
                        <div className={toggle === 1 ? "tab-pane active" : "tab-pane"} id="ManagersClub">
                            <div className="leaderboard-top-section">
                                <div className="row align-items-center">

                                    <div className="col-md-4">
                                        {
                                            (rankManager2.club_name || rankManager2.order_for_id) && (
                                                <div className="leaderboard-top-card gradient">
                                                    <div className="leaderboard-top-profile">
                                                        <div className="leaderboard-profile-media">
                                                            <img src={investment} alt="not-found" />
                                                        </div>
                                                        <div className="leaderboard-rank"><img src={lead2} alt="not-found" /></div>
                                                    </div>
                                                    <div className="leaderboard-top-text">
                                                        <div className="leaderboard-stock">Buy cost : ${parseFloat(rankManager2.buy_cost ?? 0).toFixed(2)} (Qty-{rankManager2.buy_quantity})</div>
                                                        <div className="leaderboard-stock">Sell cost : ${parseFloat(rankManager2.sell_cost ?? 0).toFixed(2)} (Qty-{rankManager2.sell_quantity})</div>
                                                        <h2 className='text-capitalize'>{rankManager2.club_name ?? "NA"} ({rankManager2.symbol})</h2>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div className="col-md-4">
                                        {
                                            (rankManager1.club_name || rankManager1.order_for_id) && (
                                                <div className="leaderboard-top-card lead1-card gradient">
                                                    <div className="lead1-crown-shape"><img src={lead1crown} alt="not-found" /></div>
                                                    <div className="leaderboard-top-profile">
                                                        <div className="leaderboard-profile-media">
                                                            <img src={investment} alt="not-found" />
                                                        </div>
                                                        <div className="leaderboard-rank"><img src={lead1} alt="not-found" /></div>
                                                    </div>
                                                    <div className="leaderboard-top-text">
                                                        <div className="leaderboard-stock">Buy cost : ${parseFloat(rankManager1.buy_cost ?? 0).toFixed(2)} (Qty-{rankManager1.buy_quantity})</div>
                                                        <div className="leaderboard-stock">Sell cost : ${parseFloat(rankManager1.sell_cost ?? 0).toFixed(2)} (Qty-{rankManager1.sell_quantity})</div>
                                                        <h2 className='text-capitalize'>{rankManager1.club_name ?? "NA"} ({rankManager1.symbol})</h2>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div className="col-md-4">
                                        {
                                            (rankManager3.club_name || rankManager3.order_for_id) && (
                                                <div className="leaderboard-top-card gradient">
                                                    <div className="leaderboard-top-profile">
                                                        <div className="leaderboard-profile-media">
                                                            <img src={investment} alt="not-found" />
                                                        </div>
                                                        <div className="leaderboard-rank"><img src={lead3} alt="not-found" /></div>
                                                    </div>
                                                    <div className="leaderboard-top-text">
                                                        <div className="leaderboard-stock">Buy cost : ${parseFloat(rankManager3.buy_cost ?? 0).toFixed(2)} (Qty-{rankManager3.buy_quantity})</div>
                                                        <div className="leaderboard-stock">Sell cost : ${parseFloat(rankManager3.sell_cost ?? 0).toFixed(2)} (Qty-{rankManager3.sell_quantity})</div>
                                                        <h2 className='text-capitalize'>{rankManager3.club_name ?? "NA"} ({rankManager3.symbol})</h2>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>

                                </div>
                            </div>
                            <div className="leaderboard-bottom-section">

                                <div className="leaderboard-content-list">
                                    <div className="row">

                                        {
                                            managerLeaderboard.length !== 0 ?
                                                (
                                                    managerLeaderboard.map((ele, indx) => {
                                                        return (
                                                            <div key={indx} className="col-md-6">
                                                                <div className="leaderboard-card">
                                                                    <div className="leaderboard-card-number">
                                                                        {indx + 4}
                                                                    </div>
                                                                    <div className="leaderboard-content">
                                                                        <div className="leaderboard-card-profile">
                                                                            <div className="leaderboard-card-image">
                                                                                <img src={u1} alt="not-found" />
                                                                            </div>
                                                                            <div className="leaderboard-card-user-name">
                                                                                <div className="leaderboard-name text-capitalize">{ele.name}</div>
                                                                                <h4>{ele.total_member} Clients</h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                )
                                                :
                                                null
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={toggle === 2 ? "tab-pane active" : "tab-pane"} id="CactusClub">
                            <div className="leaderboard-top-section">
                                <div className="row align-items-center">

                                    <div className="col-md-4">
                                        {
                                            (rankUser2.club_name || rankUser2.order_for_id) && (
                                                <div className="leaderboard-top-card gradient">
                                                    <div className="leaderboard-top-profile">
                                                        <div className="leaderboard-profile-media">
                                                            <img src={john} alt="not-found" />
                                                        </div>
                                                        <div className="leaderboard-rank"><img src={lead2} alt="not-found" /></div>
                                                    </div>
                                                    <div className="leaderboard-top-text">
                                                        <div className="leaderboard-stock">Buy cost : ${parseFloat(rankUser2.buy_cost ?? 0).toFixed(2)} (Qty-{rankUser2.buy_quantity})</div>
                                                        <div className="leaderboard-stock">Sell cost : ${parseFloat(rankUser2.sell_cost ?? 0).toFixed(2)} (Qty-{rankUser2.sell_quantity})</div>
                                                        <h2 className='text-capitalize'>{rankUser2.club_name ?? "NA"} ({rankUser2.symbol})</h2>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div className="col-md-4">
                                        {
                                            (rankUser1.club_name || rankUser1.order_for_id) && (
                                                <div className="leaderboard-top-card lead1-card gradient">
                                                    <div className="lead1-crown-shape"><img src={lead1crown} alt="not-found" /></div>
                                                    <div className="leaderboard-top-profile">
                                                        <div className="leaderboard-profile-media">
                                                            <img src={john1} alt="not-found" />
                                                        </div>
                                                        <div className="leaderboard-rank"><img src={lead1} alt="not-found" /></div>
                                                    </div>
                                                    <div className="leaderboard-top-text">
                                                        <div className="leaderboard-stock">Buy cost : ${parseFloat(rankUser1.buy_cost ?? 0).toFixed(2)} (Qty-{rankUser1.buy_quantity})</div>
                                                        <div className="leaderboard-stock">Sell cost : ${parseFloat(rankUser1.sell_cost ?? 0).toFixed(2)} (Qty-{rankUser1.sell_quantity})</div>
                                                        <h2 className='text-capitalize'>{rankUser1.club_name ?? "NA"} ({rankUser1.symbol})</h2>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>

                                    <div className="col-md-4">
                                        {
                                            (rankUser3.club_name || rankUser3.order_for_id) && (
                                                <div className="leaderboard-top-card gradient">
                                                    <div className="leaderboard-top-profile">
                                                        <div className="leaderboard-profile-media">
                                                            <img src={john3} alt="not-found" />
                                                        </div>
                                                        <div className="leaderboard-rank"><img src={lead3} alt="not-found" /></div>
                                                    </div>
                                                    <div className="leaderboard-top-text">
                                                        <div className="leaderboard-stock">Buy cost : ${parseFloat(rankUser3.buy_cost ?? 0).toFixed(2)} (Qty-{rankUser3.buy_quantity})</div>
                                                        <div className="leaderboard-stock">Sell cost : ${parseFloat(rankUser3.sell_cost ?? 0).toFixed(2)} (Qty-{rankUser3.sell_quantity})</div>
                                                        <h2 className='text-capitalize'>{rankUser3.club_name ?? "NA"} ({rankUser3.symbol})</h2>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>

                                </div>
                            </div>
                            <div className="leaderboard-bottom-section">
                                <div className="leaderboard-content-list">
                                    <div className="row">

                                        {
                                            userLeaderboard.length !== 0 ?
                                                (
                                                    userLeaderboard.map((ele, indx) => {
                                                        return (
                                                            <div key={indx} className="col-md-6">
                                                                <div className="leaderboard-card">
                                                                    <div className="leaderboard-card-number">
                                                                        {indx + 4}
                                                                    </div>
                                                                    <div className="leaderboard-content">
                                                                        <div className="leaderboard-card-profile">
                                                                            <div className="leaderboard-card-image">
                                                                                <img src={u1} alt="not-found" />
                                                                            </div>
                                                                            <div className="leaderboard-card-user-name">
                                                                                <div className="leaderboard-name text-capitalize">{ele.name}</div>
                                                                                <h4>{ele.total_member} Clients</h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className="leaderboard-value"><i className="las la-angle-up"></i> +44.26</div> */}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                )
                                                :
                                                null
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={toggle === 3 ? "tab-pane active" : "tab-pane"} id="Stocks">
                            <div className="leaderboard-bottom-section">
                                <div className="leaderboard-content-list">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="stocks-card">
                                                <div className="stocks-card-number">
                                                    1
                                                </div>
                                                <div className="stocks-content">
                                                    <div className="stocks-card-profile">
                                                        <div className="stocks-card-image">
                                                            <img src={google} alt="not-found" />
                                                        </div>
                                                        <div className="stocks-card-user-name">
                                                            <div className="stocks-name">GOOGLE</div>
                                                            <p>$170.63 (-1.26%)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="stocks-Shares-value">6 Shares</div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="stocks-card">
                                                <div className="stocks-card-number">
                                                    2
                                                </div>
                                                <div className="stocks-content">
                                                    <div className="stocks-card-profile">
                                                        <div className="stocks-card-image">
                                                            <img src={four} alt="not-found" />
                                                        </div>
                                                        <div className="stocks-card-user-name">
                                                            <div className="stocks-name">HCL Tech</div>
                                                            <p>$170.63 (-1.26%)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="stocks-Shares-value">6 Shares</div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="stocks-card">
                                                <div className="stocks-card-number">
                                                    3
                                                </div>
                                                <div className="stocks-content">
                                                    <div className="stocks-card-profile">
                                                        <div className="stocks-card-image">
                                                            <img src={two} alt="not-found" />
                                                        </div>
                                                        <div className="stocks-card-user-name">
                                                            <div className="stocks-name">Genpact</div>
                                                            <p>$170.63 (-1.26%)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="stocks-Shares-value">6 Shares</div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="stocks-card">
                                                <div className="stocks-card-number">
                                                    4
                                                </div>
                                                <div className="stocks-content">
                                                    <div className="stocks-card-profile">
                                                        <div className="stocks-card-image">
                                                            <img src={three} alt="not-found" />
                                                        </div>
                                                        <div className="stocks-card-user-name">
                                                            <div className="stocks-name">Infosys</div>
                                                            <p>$170.63 (-1.26%)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="stocks-Shares-value">6 Shares</div>
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

export default LeaderBoard