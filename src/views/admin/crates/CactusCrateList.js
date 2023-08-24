import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "../../../assets/admin/css/cactus-crates.css";
import createcrate from "../../../assets/images/admin/createcrate-icon.svg";
import up from "../../../assets/images/admin/up-stock.svg";
import down from "../../../assets/images/admin/down-stock.svg";
import nasdaq from "../../../assets/images/admin/nasdaq-logo.png";
import { api } from '../../../utils/api.utils';
import { decode, encode } from 'base-64';
import ApiService from '../../../core/services/ApiService';
import Loader from '../../common/Loader';
import nodata from "../../../assets/images/admin/no_data.png";

const CactusCrateList = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [crates, setCrates] = useState({});
    const [crateList, setCrateList] = useState([]);
    const [stockList, setStockList] = useState([]);

    const getCrateDetails = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        if (response.data.headers.success === 1) {
            setCrates(response.data.body);
        }
        setLoading(false);
    }

    const getStockList = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        if (response.data.headers.success === 1) {
            setStockList(response.data.body);
        } else setStockList([]);
        setLoading(false);
    }

    const getAllCrates = async (api, id) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        if (response.data.headers.success === 1) {
            // console.log("res => ",response.data.body.listing);
            const filteredData = (response.data.body.listing).filter(
                (ele) => ele.id != id
            );
            setCrateList(filteredData);
        } else setCrateList([]);
        setLoading(false);
    }

    const changeCrate = (id) => {
        navigate(`/cactus-crates-list/${encode(id)}`);
        getCrateDetails(api.CrateDetails + `${id}`);
        getStockList(api.CrateStockList + `${id}`);
        getAllCrates(api.AllCrate, id);
    }

    useEffect(() => {
        getCrateDetails(api.CrateDetails + `${decode(id)}`);
        getStockList(api.CrateStockList + `${decode(id)}`);
        getAllCrates(api.AllCrate, `${decode(id)}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="cactuscrates-section">
                <div className="cactuscrates-header">
                    <div className="me-auto">
                        <Link className="Back-btn" to="/cactus-crates"><i className="las la-arrow-left"></i> Back</Link>
                    </div>
                    <div className="cactuscrates-filter wd20">
                        <div className="row g-2">
                            <div className="col-md-12">
                                {/* <div className="form-group">
                                    <Link className="deletedcrates-btn" to="">View Deleted Crates</Link>
                                </div> */}
                            </div>
                            {/* <div className="col-md-6">
                                <div className="form-group">
                                    <Link className="createcrate-btn" to="/cactus-crates-create">Create New Crate</Link>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="createcrate-profile-section">
                            <div className="createcrate-profile-card d-flex flex-column">
                                <div className='d-flex flex-row align-items-center'>
                                    <div className="createcrate-profile-media"><img src={nasdaq} alt="not-found" /></div>
                                    <div className="createcrate-profile-card-text">
                                        <h2 className='text-capitalize'>{crates.name ?? "NA"}</h2>
                                        <div className="createcrate-profile-addre">${parseFloat(crates.amount ?? 0).toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="createcrate-profile-overview">
                                    <div className="row">
                                        <h6 className='text-center mt-4' style={{ color: "#fff" }}>Stocks Added</h6>
                                        {
                                            stockList.length !== 0 ?
                                                (
                                                    stockList.map((ele, indx) => {
                                                        return (
                                                            <div key={indx} className="col-md-6">
                                                                <div className="createcrate-profile-item">
                                                                    {/* <div className="createcrate-profile-icon">
                                                            <img src={down} alt="not-found" />
                                                        </div> */}
                                                                    <div className="createcrate-profile-text">
                                                                        <h3>{ele.c_name ?? ""}, {ele.share_id ?? "NA"}</h3>
                                                                        <h3 className='text-capitalize mb-0 mt-2' style={{ color: "#00ee57" }}>Quantity : {ele.quantity ?? 0}</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                )
                                                :
                                                (
                                                    <div className='d-flex mt-5 justify-content-center'>
                                                        <div className='text-center'>
                                                            <img className='mb-3' src={nodata} alt="no-data" />
                                                            <p style={{ color: "#fff" }}>No stocks found</p>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="createcrate-list">
                            <h2>Other Crates List</h2>

                            {
                                crateList.length !== 0 ?
                                    (
                                        crateList.map((ele, indx) => {
                                            return (
                                                <div key={indx} className="createcrate-list-item">
                                                    <div className="createcrate-list-item-icon">
                                                        <img src={createcrate} alt="not-found" />
                                                    </div>
                                                    <div className="createcrate-list-item-text">
                                                        <h3 className='text-capitalize'>{ele.name ?? "NA"}</h3>
                                                        <div className="createcrate-price">${parseFloat(ele.amount ?? 0).toFixed(2)}</div>
                                                    </div>
                                                    <div className="createcrate-list-item-action">
                                                        <Link className="edit-btn" onClick={() => changeCrate(ele.id)} to=""><i className="las la-eye"></i></Link>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )
                                    :
                                    (
                                        <div className='d-flex mt-5 justify-content-center'>
                                            <div className='text-center'>
                                                <img className='mb-3' src={nodata} alt="no-data" />
                                                <p>No other crates found</p>
                                            </div>
                                        </div>
                                    )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CactusCrateList