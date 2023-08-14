import React, { useEffect, useState } from 'react';
import "../../../assets/admin/css/proposals-info.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../utils/api.utils';
import { decode } from 'base-64';
import Loader from '../../common/Loader';
import ApiService from '../../../core/services/ApiService';
import john1 from "../../../assets/images/admin/john-doe1.png";
import check from "../../../assets/images/admin/check-gr.svg";

const ProposalDetails = () => {

    const navigate = useNavigate();
    const { id: proDetailId } = useParams();
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({});

    const getProposalDetail = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("Proposal details => ", response.data.body);
        if(response.data.headers.success === 1){
            setDetails(response.data.body);
        } else setDetails({});
        setLoading(false);
    }

    const optionType = (value) => {
        if(value==='group_invite') return 'Group Invite';
        else if(value==='expulsion') return 'Explusion';
        else if(value==='stock') return 'Stock';
        else if(value==='setting_changes') return 'Setting Changes';
        else return "NA";
    }

    useEffect(() => {
        getProposalDetail(api.ClubProposalDetails + `${decode(proDetailId)}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="body-main-content">
                <div className="user-table-section">
                    <div className="user-content-section">
                        <div className="club-detail-header">
                            <div className="mr-auto">
                                <Link className="Back-btn" to="" onClick={(e) => { e.preventDefault(); navigate(-1) }}><i className="las la-arrow-left"></i> Back</Link>

                            </div>
                            <div className="stockoptions-filter wd40">
                            </div>
                        </div>
                        <div className="club-detail-content">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="club-profile-card">
                                        <div className="club-profile-card-image">
                                            <img src={john1} alt='not found' />
                                        </div>
                                        <div className="club-info-box">
                                            <h3>{details.first_name + ' ' + details.last_name}</h3>
                                            <h5>{details.emailid ?? "NA"}</h5>
                                            <h5>{details.symbol ?? "NA"}</h5>
                                            <div className="proposal-voted-text">
                                                <img src={check} alt='not found' />
                                                <p>{optionType(details.option_type)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="proposals-info-results-section">
                                        <h2>Results</h2>
                                        <div className="proposals-info-results-item">
                                            <div className="proposals-info-results-left">
                                                <div className="results-status-icon">
                                                    <i className="las la-check"></i>
                                                </div>
                                                <div className="results-status-text">
                                                    Aye
                                                </div>
                                            </div>
                                            <div className="results-status-progress">
                                                <div className="results-status-progress-use-text"><span>6 Members</span>
                                                </div>
                                                <div className="results-progress-bar">
                                                    <div className="progress-bar-user" style={{ left: "60%" }}><i className="las la-user"></i></div>
                                                    <div className="progress">
                                                        <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "60%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="proposals-info-results-item red-results-item">
                                            <div className="proposals-info-results-left">
                                                <div className="results-status-icon">
                                                    <i className="las la-times"></i>
                                                </div>
                                                <div className="results-status-text">
                                                    Nay
                                                </div>
                                            </div>
                                            <div className="results-status-progress">
                                                <div className="results-status-progress-use-text"><span>6 Members</span>
                                                </div>
                                                <div className="results-progress-bar">
                                                    <div className="progress-bar-user" style={{ left: "30%" }}><i className="las la-user"></i></div>
                                                    <div className="progress">
                                                        <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "30%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="proposals-info-results-item black-results-item">
                                            <div className="proposals-info-results-left">
                                                <div className="results-status-icon">
                                                    <i className="las la-minus-circle"></i>
                                                </div>
                                                <div className="results-status-text">
                                                    Abstain
                                                </div>
                                            </div>
                                            <div className="results-status-progress">
                                                <div className="results-status-progress-use-text"><span>6 Members</span>
                                                </div>
                                                <div className="results-progress-bar">
                                                    <div className="progress-bar-user" style={{ left: "20%" }}><i className="las la-user"></i></div>
                                                    <div className="progress">
                                                        <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "20%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                        <div className="proposals-info-results-item sky-results-item">
                                            <div className="proposals-info-results-left">
                                                <div className="results-status-icon">
                                                    <i className="las la-lightbulb"></i>
                                                </div>
                                                <div className="results-status-text">
                                                    NV
                                                </div>
                                            </div>
                                            <div className="results-status-progress">
                                                <div className="results-status-progress-use-text"><span>6 Members</span>
                                                </div>
                                                <div className="results-progress-bar">
                                                    <div className="progress-bar-user" style={{ left: "40%" }}><i className="las la-user"></i></div>
                                                    <div className="progress">
                                                        <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "40%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
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

export default ProposalDetails