import React, { useEffect, useState } from 'react';
import "../../../assets/admin/css/users.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
// import tesla_logo from "../../assets/images/admin/tesla_logo.png";
// import profile from "../../assets/images/admin/profile.png";
import google from "../../../assets/images/admin/google.png";
import u1 from "../../../assets/images/admin/u1.png";
import u2 from "../../../assets/images/admin/u2.png";
import u3 from "../../../assets/images/admin/u3.png";
import ApiService from '../../../core/services/ApiService';
import { decode } from 'base-64';
import { Modal, ModalBody } from "reactstrap";
import axios from 'axios';
import Loader from "../../common/Loader";
import { api } from '../../../utils/api.utils';
import nodata from "../../../assets/images/admin/no_data.png";
import { geSuggestiont, getAbstain, getAbstainPenalties, getExplusion, getGroupInvite, getPropSubLimit, getProposalCancellation, getPublicStatsVal, getRequestToJoinVal, getSettingChanges, getVotingPeriod } from '../../../utils/cactus.utils';

const ClubDetails = () => {

    const navigate = useNavigate();
    const { id: clubId, type } = useParams();
    const [club, setClub] = useState({});
    const [info, setInfo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [votes, setVotes] = useState([]);
    const [shareList, setShareList] = useState([]);
    const [joinMember, setJoinMember] = useState([]);
    const [clientMember, setClientMember] = useState([]);

    const clubDetails = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("club details => ", response.data.body);
        if (response.data.headers.success === 1) {
            setClub(response.data.body);
            if (response.data.body.join_members !== null)
                setJoinMember(JSON.parse(response.data.body.join_members))
            if (response.data.body.club_member_balance !== null)
                setClientMember(JSON.parse(response.data.body.club_member_balance))
        }
        else setClub([]);
        setLoading(false);
    }

    const getClubShareList = async () => {
        setLoading(true);
        let response = [];
        if (decode(type) == 'manager') {
            response = await ApiService.getAPIWithAccessToken(api.ClubShareManager + `${decode(clubId)}?status=1`);
        } else {
            response = await ApiService.getAPIWithAccessToken(api.ClubShareUser + `${decode(clubId)}`);
        }
        if (response.data.headers.success === 1) {
            const investmentData = [];
            for (const key in response.data.body) {
                if (Object.hasOwnProperty.call(response.data.body, key)) {
                    const res = await axios.get(api.TwelveDataPrice + `?symbol=${response.data.body[key].symbol}&apikey=6b7ad9bbb1014db4baff00e7719f7689`);
                    response.data.body[key].twelve = res.data.price ?? 0;
                    const itemData = response.data.body[key];
                    investmentData.push(itemData);
                }
            }
            console.log(" Club share list => ", investmentData);
            setShareList(investmentData);
        }
        setLoading(false);
    }

    useEffect(() => {
        clubDetails(api.ClubDetails + `${decode(clubId)}`);
        getClubShareList();
        // getProposalVotes(api.ClubProposalVotes + `${decode(clubId)}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="user-table-section">
                <div className="user-content-section">
                    <div className="club-detail-header">
                        <div className="mr-auto">
                            <Link className="Back-btn" to="" onClick={(e) => { e.preventDefault(); navigate(-1); }}><i className="las la-arrow-left"></i> Back</Link>
                            {/*  <h4 className="heading-title">Johnson & Johnson</h4> */}
                        </div>

                        <div className="stockoptions-filter wd40">
                            <div className="row g-2">
                                <div className="col-md-4">
                                    {
                                        (decode(type) === 'manager') ? null :
                                            (<div className="form-group">
                                                <Link className="proposalsbtn" to={`/club-proposals/${clubId}`}>Proposals</Link>
                                            </div>)
                                    }
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <Link className="tradehistorybtn" to={`/club-trade-history/${clubId}`}>Trade History</Link>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <Link className="infobtn" to="" onClick={(e) => { e.preventDefault(); setInfo(true); }} data-bs-toggle="modal" data-bs-target="#infoclub">Info</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <nav className='p-0'>
                            <ol className="cd-breadcrumb m-0">
                                <li><Link to="/clubs">Clubs</Link></li>
                                <li className="current"><em>Club Details</em></li>
                            </ol>
                        </nav>
                    </div>

                    <div className="club-detail-content mt-3">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="club-chart-card d-flex">
                                    <div className="clubs-card-image d-flex align-items-start">
                                        {
                                            (club.image_url === "" || club.image_url === null || club.image_url === undefined) ? (
                                                <>
                                                    <div className="userImg"><img alt="not-found" src={u1} /></div>
                                                    <div className="userImg"><img alt="not-found" src={u2} /></div>
                                                    <div className="userImg"><img alt="not-found" src={u3} /></div>
                                                </>
                                            )
                                                :
                                                (
                                                    <div className="userImg" style={{ width: "50px", height: "50px" }}><img alt="not-found-image" src={club.image_url} /></div>
                                                )
                                        }
                                    </div>
                                    <div className="club-info-box d-flex align-items-start flex-column">
                                        <h3 className='text-capitalize'>{club.name ?? "NA"}</h3>
                                        <h5 className='mt-3'>${parseFloat(club.total_balance ?? 0).toFixed(2)} <span className="st-text stup stup"> ({parseFloat(club.required_stake ?? 0).toFixed(1)}%)</span></h5>
                                        <p style={{ fontSize: "14px" }}><b>Cactus Club Holding : </b>${parseFloat(club.club_holding ?? 0).toFixed(2)}</p>
                                        <p style={{ fontSize: "14px" }}><b>Current Club P&L : </b>-${parseFloat(club.club_holding ?? 0).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h5>Club Shares List</h5>
                                {
                                    shareList.length !== 0 ?
                                        (shareList.map((ele, indx) => {
                                            return (
                                                <div key={indx} className="club-comp-share-card downshare-card">
                                                    <div className="club-comp-info">
                                                        <div className="club-comp-image">
                                                            <img src={google} alt='not-found' />
                                                        </div>
                                                        <div className="club-comp-text">
                                                            <h3>{ele.name ?? ""} ({ele.symbol ?? ""})</h3>
                                                            <p><b style={{ color: "#000" }}>Total Price : </b>{parseFloat(ele.total_price ?? 0).toFixed(2)}</p>
                                                            <p><b style={{ color: "#000" }}>Current Price : </b>{parseFloat(ele.twelve).toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="shares-value-text text-capitalize">Quantity : {ele.quantity ?? 0}</div>
                                                </div>
                                            )
                                        }))
                                        :
                                        (
                                            <div className="d-flex justify-content-center mt-4">
                                                <div className='text-center'>
                                                    <img className='mb-3' src={nodata} alt="no-data" />
                                                    <p>No shares found</p>
                                                </div>
                                            </div>
                                        )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <Modal isOpen={info} toggle={() => setInfo(false)} className="kin-modal" >
                <div className="modal-content">
                    <ModalBody className='modal-body'>
                        <div className="ro-modal-info">
                            <button type="button" className="btn-close" onClick={(e) => { e.preventDefault(); setInfo(false); }} data-bs-dismiss="modal" aria-label="Close"></button>
                            {
                                decode(type) === 'manager' ?
                                    (
                                        <div className="club-info-section">
                                            <div className="percentages-info-section">
                                                <h2>Percentages Stakes</h2>
                                                <div className="percentages-info-content">
                                                    <div className="percentages-stakes-head">
                                                        <div className="percentages-stakes-th-name">Total Investment</div>
                                                        <div className="percentages-stakes-th-value">${parseFloat(club.total_investment ?? 0).toFixed(2)}</div>
                                                        <div className="percentages-stakes-th-pervalue">100%</div>
                                                    </div>

                                                    <div className="percentages-stakes-body">

                                                        {
                                                            clientMember.length !== 0 ?
                                                                (
                                                                    clientMember.map((ele, indx) => {
                                                                        return (
                                                                            <div key={indx} className="percentages-stakes-item">
                                                                                <div className="percentages-stakes-name">{ele.first_name + ' ' + ele.last_name}</div>
                                                                                <div className="percentages-stakes-value">${parseFloat(ele.member_contribution ?? 0).toFixed(2)}</div>
                                                                                <div className="percentages-stakes-pervalue">{parseFloat((ele.member_contribution * 100) / club.total_investment).toFixed(2)}%</div>
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

                                            <div className="group-info-section">
                                                <h2>Group Information</h2>
                                                <div className="group-info-list">

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Members</div>
                                                        <div className="group-info-item-value">{club.member_count ?? 0}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name w-50">Manager Profit (Taken annually) (Cactus takes 5% of manager profit)</div>
                                                        <div className="group-info-item-value">{parseFloat(club.manager_profit ?? 0).toFixed(1)}%</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Entrance Fee</div>
                                                        <div className="group-info-item-value">${parseFloat(club.entrance_fee ?? 0).toFixed(1)}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Monthly Fee (Cactus takes 10%)</div>
                                                        <div className="group-info-item-value">${parseFloat(club.monthly_fee ?? 0).toFixed(1)}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Public Stats</div>
                                                        <div className="group-info-item-value">{getPublicStatsVal(club.stats_privacy)}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Request to Join</div>
                                                        <div className="group-info-item-value">{getRequestToJoinVal(club.join_privacy)}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Required Cash Maintenance</div>
                                                        <div className="group-info-item-value">{parseFloat(club.required_cash_maintenance ?? 0).toFixed(1)}%</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name w-50">Manager stake required to place transactions</div>
                                                        <div className="group-info-item-value">{parseFloat(club.manager_stake ?? 0).toFixed(1)}%</div>
                                                    </div>

                                                </div>
                                            </div>


                                            <div className="club-info-user-list">
                                                <h2>Group Members</h2>
                                                <div className="row">

                                                    {
                                                        joinMember.length !== 0 ?
                                                            (
                                                                joinMember.map((ele, indx) => {
                                                                    return (
                                                                        <div key={indx} className="col-md-6">
                                                                            <div className="club-info-user-item">
                                                                                <div className="club-info-user-item-image">
                                                                                    {
                                                                                        (ele.img_url === "" || ele.img_url === null || ele.img_url === undefined) ? (
                                                                                            <img src={u1} alt="not-found" />
                                                                                        )
                                                                                            :
                                                                                            (
                                                                                                <img src={ele.img_url} alt="not-found" />
                                                                                            )
                                                                                    }
                                                                                </div>
                                                                                <div className="club-info-user-item-text text-capitalize">
                                                                                    <h3>{ele.first_name + ' ' + ele.last_name}</h3>
                                                                                    <p style={{ color: "#00ee57", fontSize: "12px" }}>{ele.role}</p>
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
                                    )
                                    :
                                    (
                                        <div className="club-info-section">
                                            <div className="percentages-info-section">
                                                <h2>Percentages Stakes</h2>
                                                <div className="percentages-info-content">
                                                    <div className="percentages-stakes-head">
                                                        <div className="percentages-stakes-th-name">Total Investment</div>
                                                        <div className="percentages-stakes-th-value">${parseFloat(club.total_investment ?? 0).toFixed(2)}</div>
                                                        <div className="percentages-stakes-th-pervalue">100%</div>
                                                    </div>

                                                    <div className="percentages-stakes-body">

                                                        {
                                                            clientMember.length !== 0 ?
                                                                (
                                                                    clientMember.map((ele, indx) => {
                                                                        return (
                                                                            <div key={indx} className="percentages-stakes-item">
                                                                                <div className="percentages-stakes-name">{ele.first_name + ' ' + ele.last_name}</div>
                                                                                <div className="percentages-stakes-value">${parseFloat(ele.member_contribution ?? 0).toFixed(2)}</div>
                                                                                <div className="percentages-stakes-pervalue">{parseFloat((ele.member_contribution * 100) / club.total_investment).toFixed(2)}%</div>
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

                                            <div className="group-info-section">
                                                <h2>Group Information</h2>
                                                <div className="group-info-list">

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Members</div>
                                                        <div className="group-info-item-value w-50">{club.member_count ?? 0}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Voting Period</div>
                                                        <div className="group-info-item-value w-50">{getVotingPeriod(club.voting_period)}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Vote Time</div>
                                                        <div className="group-info-item-value w-50">{club.vote_time ?? "NA"}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Required Votes</div>
                                                        <div className="group-info-item-value w-50">{club.required_votes ?? 0}%</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Required Stake</div>
                                                        <div className="group-info-item-value w-50">{club.required_stake ?? 0}%</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Cash Maintenance</div>
                                                        <div className="group-info-item-value w-50">{club.cash_maintenance ?? 0}%</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Cash Maintenance Amount</div>
                                                        <div className="group-info-item-value w-50">${club.cash_maintain_amount ?? 0}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Abstain Setting</div>
                                                        <div className="group-info-item-value w-50">{getAbstain(club.abstain)}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Abstain Penalties</div>
                                                        <div className="group-info-item-value w-50">{getAbstainPenalties(club.abstain_penalties)}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Group Invite</div>
                                                        <div className="group-info-item-value w-50">{getGroupInvite(club.group_invite)}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Suggestion</div>
                                                        <div className="group-info-item-value w-50">{geSuggestiont(club.suggestion)}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Proposal Cancellation</div>
                                                        <div className="group-info-item-value w-50">{getProposalCancellation(club.proposal_cancel)}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Proposal Submission Limit</div>
                                                        <div className="group-info-item-value w-50">{getPropSubLimit(club.proposal_submission_limit)}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Setting Changes</div>
                                                        <div className="group-info-item-value w-50">{getSettingChanges(club.setting_changes)}</div>
                                                    </div>

                                                    <div className="group-info-item">
                                                        <div className="group-info-item-name">Expulsion</div>
                                                        <div className="group-info-item-value w-50">{getExplusion(club.expulsion)}</div>
                                                    </div>

                                                </div>
                                            </div>


                                            <div className="club-info-user-list">
                                                <h2>Group Members</h2>
                                                <div className="row">

                                                    {
                                                        joinMember.length !== 0 ?
                                                            (
                                                                joinMember.map((ele, indx) => {
                                                                    return (
                                                                        <div key={indx} className="col-md-6">
                                                                            <div className="club-info-user-item">
                                                                                <div className="club-info-user-item-image">
                                                                                    {
                                                                                        (ele.img_url === "" || ele.img_url === null || ele.img_url === undefined) ? (
                                                                                            <img src={u1} alt="not-found" />
                                                                                        )
                                                                                            :
                                                                                            (
                                                                                                <img src={ele.img_url} alt="not-found" />
                                                                                            )
                                                                                    }
                                                                                </div>
                                                                                <div className="club-info-user-item-text text-capitalize">
                                                                                    <h3>{ele.first_name + ' ' + ele.last_name}</h3>
                                                                                    <p style={{ color: "#00ee57", fontSize: "12px" }}>{ele.role}</p>
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
                                    )
                            }
                        </div>
                    </ModalBody>
                </div>
            </Modal>
        </>
    )
}

export default ClubDetails