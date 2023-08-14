import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import leaderboardicon from "../../../assets/images/admin/leaderboard-icon.svg";
import u1 from "../../../assets/images/admin/u1.png";
import u2 from "../../../assets/images/admin/u2.png";
import u3 from "../../../assets/images/admin/u3.png";
import tesla_logo from "../../../assets/images/admin/tesla_logo.png";
import profile from "../../../assets/images/admin/profile.png";
import google from "../../../assets/images/admin/google.png";
import { Modal, ModalBody } from "reactstrap";

const ManagerClubDetails = () => {

  const [info, setInfo] = useState(false);
  const [client, setClient] = useState(false);

  return (
    <>
      <div className="user-table-section">
        <div className="user-content-section">
          <div className="club-detail-header">
            <div className="mr-auto">
              <Link className="Back-btn" to="/manager-details"><i className="las la-arrow-left"></i> Back</Link>
              {/* <h4 className="heading-title">Johnson & Johnson</h4> */}
            </div>
            <div className="stockoptions-filter wd30">
              <div className="row g-2">
                <div className="col-md-6">
                  <div className="form-group">
                    <Link className="proposalsbtn" to="/club-proposals">Help Centre</Link>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <Link className="infobtn" to="" onClick={(e) => { e.preventDefault(); setInfo(true); }} data-bs-toggle="modal" data-bs-target="#infoclub">Info</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="club-profit-funds-overview">
            <div className="row">
              <div className="col-md-3">
                <div className="profit-funds-item">
                  <div className="profit-funds-shape">
                  </div>
                  <div className="profit-funds-content">
                    <p>Current Club Profit</p>
                    <h4>$873</h4>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="profit-funds-item bg-profit-funds">
                  <div className="profit-funds-shape">
                  </div>
                  <div className="profit-funds-content">
                    <p>Club Funds</p>
                    <h4>$873</h4>
                  </div>
                </div>
              </div>


              <div className="col-md-3">
                <div className="leaderboard-item-info">
                  <div className="leaderboard-item-info-image">
                    <img src={leaderboardicon} alt="not-found" />
                  </div>
                  <div className="leaderboard-item-info-text">
                    <h3>leaderboard</h3>
                    <p>13</p>
                  </div>
                  <div className="manager-club-manstock stockup">
                    <i className="las la-angle-up"></i> $873
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="clients-content-card">
                  <div className="clients-card-media-info">
                    <div className="userImg"><img src={u1} alt="not-found" /></div>
                    <div className="userImg"><img src={u2} alt="not-found" /></div>
                    <div className="userImg"><img src={u3} alt="not-found" /></div>
                  </div>
                  <div className="clients-content-card-text">
                    <h4>Clients</h4>
                    <p>23</p>
                  </div>
                  <div className="clients-action">
                    <Link to="" data-bs-toggle="modal" onClick={(e)=>{e.preventDefault(); setClient(true); }} data-bs-target="#Clientsinfo"><i className="las la-eye"></i></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="club-detail-content">
            <div className="row">
              <div className="col-md-6">
                <div className="club-chart-card">
                  <div className="club-info-box">
                    <h3>Johnson & Johnson</h3>
                    <h5>$1,527,789.77 <span className="st-text stup stup">44.26 (1.26%)</span></h5>
                  </div>
                  <div className="club-chart-info">
                    <div id="chart"></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="club-comp-share-card downshare-card">
                  <div className="club-comp-info">
                    <div className="club-comp-image">
                      <img src={tesla_logo} alt="not-found" />
                    </div>
                    <div className="club-comp-text">
                      <h3>Tesla</h3>
                      <p>$170.63 (-1.26%)</p>
                    </div>
                  </div>
                  <div className="shares-value-text">6 Shares</div>
                </div>

                <div className="club-comp-share-card upshare-card">
                  <div className="club-comp-info">
                    <div className="club-comp-image">
                      <img src={profile} alt="not-found" />
                    </div>
                    <div className="club-comp-text">
                      <h3>CTUS</h3>
                      <p>$170.63 (-1.26%)</p>
                    </div>
                  </div>
                  <div className="shares-value-text">6 Shares</div>
                </div>


                <div className="club-comp-share-card downshare-card">
                  <div className="club-comp-info">
                    <div className="club-comp-image">
                      <img src={google} alt="not-found" />
                    </div>
                    <div className="club-comp-text">
                      <h3>GOOGLE</h3>
                      <p>$170.63 (-1.26%)</p>
                    </div>
                  </div>
                  <div className="shares-value-text">6 Shares</div>
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
              <button type="button" className="btn-close" onClick={(e) => { e.preventDefault(); setInfo(false); }} data-bs-dismiss="modal" aria-label="Close"></button>

              <div className="club-info-section">
                <div className="percentages-info-section">
                  <h2>% Percentages Stakes</h2>
                  <div className="percentages-info-content">
                    <div className="percentages-stakes-head">
                      <div className="percentages-stakes-th-name">Total Investment</div>
                      <div className="percentages-stakes-th-value">$14,623.22</div>
                      <div className="percentages-stakes-th-pervalue">100%</div>
                    </div>

                    <div className="percentages-stakes-body">
                      <div className="percentages-stakes-item">
                        <div className="percentages-stakes-name">Abhithi Sindhe</div>
                        <div className="percentages-stakes-value">$5,570.75</div>
                        <div className="percentages-stakes-pervalue">45.00%</div>
                      </div>
                      <div className="percentages-stakes-item">
                        <div className="percentages-stakes-name">Sai Hora</div>
                        <div className="percentages-stakes-value">$3,481.72</div>
                        <div className="percentages-stakes-pervalue">25.00%</div>
                      </div>

                      <div className="percentages-stakes-item">
                        <div className="percentages-stakes-name">Jayesh Havanur</div>
                        <div className="percentages-stakes-value">$2,089.03</div>
                        <div className="percentages-stakes-pervalue">15.00%</div>
                      </div>

                      <div className="percentages-stakes-item">
                        <div className="percentages-stakes-name">Shahzad Tripathi</div>
                        <div className="percentages-stakes-value">$2,089.03</div>
                        <div className="percentages-stakes-pervalue">15.00%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group-info-section">
                  <h2>John Club Information</h2>
                  <div className="group-info-list">
                    <div className="group-info-item">
                      <div className="group-info-item-name">Members</div>
                      <div className="group-info-item-value">5</div>
                    </div>
                    <div className="group-info-item">
                      <div className="group-info-item-name">Manager Profit %</div>
                      <div className="group-info-item-value gr-group-text">10</div>
                    </div>

                    <div className="group-info-item">
                      <div className="group-info-item-name">Required Deposits</div>
                      <div className="group-info-item-value">$100</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </div>
      </Modal>

      <Modal isOpen={client} toggle={() => setClient(false)} className="kin-modal" >
        <div className="modal-content">
          <ModalBody className='modal-body'>
            <div className="ro-modal-info">
              <button type="button" className="btn-close" onClick={(e) => { e.preventDefault(); setClient(false); }} data-bs-dismiss="modal" aria-label="Close"></button>

              <div className="club-info-section">
                <div className="club-info-user-list">
                  <h2>Clients List</h2>
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

export default ManagerClubDetails