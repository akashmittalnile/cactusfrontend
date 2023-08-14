import React, { useState } from 'react';
import "../../../assets/admin/css/users.css";
import { Link } from 'react-router-dom';
import leaderboardicon from "../../../assets/images/admin/leaderboard-icon.svg";
import club1 from "../../../assets/images/admin/club1.png";
import u1 from "../../../assets/images/admin/u1.png";
import { Modal, ModalBody } from "reactstrap";

const ViewClub = () => {

    const [info, setInfo] = useState(false);

    return (
        <>
            <div className="user-table-section">
                <div className="user-content-section">
                    <div className="club-detail-header">
                        <div className="mr-auto">
                            <Link className="Back-btn" to="/user-details"><i className="las la-arrow-left"></i> Back</Link>
                            {/* <h4 className="heading-title">Johnson & Johnson</h4> */}
                        </div>
                        <div className="stockoptions-filter wd40">

                        </div>
                    </div>
                    <div className="club-detail-content">
                        <div className="stockoptions-header">
                            <div className="mr-auto">
                                <div className="club-info-box">
                                    <h3>Cameron Williamson</h3>
                                    <h5>23 Clients</h5>
                                </div>
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
                                    <div className="managerclubs-item-card">
                                        <div className="managerclubs-card-content">
                                            <div className="managerclubs-card">
                                                <div className="managerclubs-card-image">
                                                    <img src={club1} alt='not-found' />
                                                </div>
                                                <div className="managerclubs-card-text">
                                                    <h5>Club 1</h5>
                                                    <p>23 Clients</p>
                                                    <div className="portfolio-text">Portfolio:
                                                        <span>$1478.00 </span>
                                                    </div>
                                                </div>
                                                <div className="manstock stockup">
                                                    <i className="las la-angle-up"></i> $873
                                                </div>
                                            </div>

                                            <div className="leaderboard-card">
                                                <div className="leaderboard-card-image">
                                                    <img src={leaderboardicon} alt='not-found' />
                                                </div>
                                                <div className="leaderboard-card-text">
                                                    leaderboard
                                                </div>
                                                <div className="leaderboard-card-value">
                                                    13
                                                </div>
                                            </div>
                                        </div>
                                        <div className="managerclubs-card-action">
                                            <Link to="" onClick={(e)=>{e.preventDefault(); setInfo(true);}} data-bs-toggle="modal" data-bs-target="#viewclubinfo">Info</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="managerclubs-item-card">
                                        <div className="managerclubs-card-content">
                                            <div className="managerclubs-card">
                                                <div className="managerclubs-card-image">
                                                    <img src={club1} alt='not-found' />
                                                </div>
                                                <div className="managerclubs-card-text">
                                                    <h5>Club 2 </h5>
                                                    <p>23 Clients</p>
                                                    <div className="portfolio-text">Portfolio:
                                                        <span>$1478.00 </span>
                                                    </div>
                                                </div>
                                                <div className="manstock stockup">
                                                    <i className="las la-angle-up"></i> $873
                                                </div>
                                            </div>

                                            <div className="leaderboard-card">
                                                <div className="leaderboard-card-image">
                                                    <img src={leaderboardicon} alt='not-found' />
                                                </div>
                                                <div className="leaderboard-card-text">
                                                    leaderboard
                                                </div>
                                                <div className="leaderboard-card-value">
                                                    13
                                                </div>
                                            </div>
                                        </div>
                                        <div className="managerclubs-card-action">
                                            <Link to="" onClick={(e)=>{e.preventDefault(); setInfo(true);}} data-bs-toggle="modal" data-bs-target="#viewclubinfo">Info</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="managerclubs-item-card">
                                        <div className="managerclubs-card-content">
                                            <div className="managerclubs-card">
                                                <div className="managerclubs-card-image">
                                                    <img src={club1} alt='not-found' />
                                                </div>
                                                <div className="managerclubs-card-text">
                                                    <h5>Club 3 </h5>
                                                    <p>23 Clients</p>
                                                    <div className="portfolio-text">Portfolio:
                                                        <span>$1478.00 </span>
                                                    </div>
                                                </div>
                                                <div className="manstock stockup">
                                                    <i className="las la-angle-up"></i> $873
                                                </div>
                                            </div>

                                            <div className="leaderboard-card">
                                                <div className="leaderboard-card-image">
                                                    <img src={leaderboardicon} alt='not-found' />
                                                </div>
                                                <div className="leaderboard-card-text">
                                                    leaderboard
                                                </div>
                                                <div className="leaderboard-card-value">
                                                    13
                                                </div>
                                            </div>
                                        </div>
                                        <div className="managerclubs-card-action">
                                            <Link to="" onClick={(e)=>{e.preventDefault(); setInfo(true);}} data-bs-toggle="modal" data-bs-target="#viewclubinfo">Info</Link>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Modal isOpen={info} toggle={() => setInfo(false)} className="kin-modal" >
                <div className="modal-content">
                    <ModalBody className='modal-body'>
                        <div className="ro-modal-info">
                            <button type="button" className="btn-close" onClick={(e)=>{e.preventDefault(); setInfo(false);}} data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="club-info-section">
                                <div className="club-profit-funds-overview">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="profit-funds-item">
                                                <div className="profit-funds-shape">
                                                </div>
                                                <div className="profit-funds-content">
                                                    <p>Current Club Profit</p>
                                                    <h4>$873</h4>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="profit-funds-item bg-profit-funds">
                                                <div className="profit-funds-shape">
                                                </div>
                                                <div className="profit-funds-content">
                                                    <p>Club Funds</p>
                                                    <h4>$873</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="club-info-user-list">
                                    <h2>Group Members</h2>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="club-info-user-item">
                                                <div className="club-info-user-item-image">
                                                    <img src={u1} alt="not-found" />
                                                </div>
                                                <div className="club-info-user-item-text">
                                                    <h3>Jane Cooper</h3>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="club-info-user-item">
                                                <div className="club-info-user-item-image">
                                                    <img src={u1} alt="not-found" />
                                                </div>
                                                <div className="club-info-user-item-text">
                                                    <h3>Jane Cooper</h3>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="club-info-user-item">
                                                <div className="club-info-user-item-image">
                                                    <img src={u1} alt="not-found" />
                                                </div>
                                                <div className="club-info-user-item-text">
                                                    <h3>Jane Cooper</h3>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="club-info-user-item">
                                                <div className="club-info-user-item-image">
                                                    <img src={u1} alt="not-found" />
                                                </div>
                                                <div className="club-info-user-item-text">
                                                    <h3>Jane Cooper</h3>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="club-info-user-item">
                                                <div className="club-info-user-item-image">
                                                    <img src={u1} alt="not-found" />
                                                </div>
                                                <div className="club-info-user-item-text">
                                                    <h3>Jane Cooper</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </div>
            </Modal>
        </>
    )
}

export default ViewClub