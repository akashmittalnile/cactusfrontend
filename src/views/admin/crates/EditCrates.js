import React, { useState, useEffect } from 'react';
import "../../../assets/admin/css/cactus-crates.css";
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../utils/api.utils';
import Loader from '../../common/Loader';
import axios from "axios";

const EditCrates = () => {

    const navigate = useNavigate();
    const [stockList, setStockList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getStockList = async (api) => {
        setLoading(true);
        const response = await axios.get(api);
        console.log(response.data.data);
        if (response.data.status === "ok") {
            setStockList(response.data.data);
        } else setStockList([]);
        setLoading(false);
    }

    useEffect(() => {
        getStockList(api.TwelveDataStock + '?exchange=NASDAQ&country=usa');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="cactuscrates-section">
                <div className="cactuscrates-header">
                    <div className="mr-auto">
                        <Link className="Back-btn" onClick={() => navigate(-1)} to=""><i className="las la-arrow-left"></i> Back</Link>
                    </div>
                </div>

                <div className="cactuscrates-create-form">
                    <h4>Edit Crate</h4>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Crate Name</label>
                                <input type="text" className="form-control" name="" placeholder="Enter Crate Name" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor='category'>Select Category</label>
                                <input list='stocklist' className='form-control' id='category' placeholder='Select' />
                                <datalist id='stocklist'>
                                    {
                                        stockList.map((ele, indx) => {
                                            return (
                                                <option key={indx} value={ele.name} />
                                            )
                                        })
                                    }
                                </datalist>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Start date</label>
                                <input type="date" className="form-control" name="" />
                            </div>
                        </div>


                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Expiry date</label>
                                <input type="date" className="form-control" name="" />
                            </div>
                        </div>


                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Quantity</label>
                                <input type="text" className="form-control" name="" />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Crate Value amount</label>
                                <input type="text" className="form-control" name="" />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label>No.of Usable</label>
                                <input type="text" className="form-control" name="" />
                            </div>
                        </div>

                        {/* <div className="col-md-4">
                            <div className="form-group">
                                <label>No.of Tickets</label>
                                <input type="text" className="form-control" name="" />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Cosmetics</label>
                                <input type="text" className="form-control" name="" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Coins</label>
                                <select className="form-control">
                                    <option>Select</option>
                                </select>
                            </div>
                        </div> */}

                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Price per crates</label>
                                <input type="text" className="form-control" name="" />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Upload Media</label>
                                <div className="upload-media">
                                    <input type="file" name="" id="addfile" className="uploadmediabtn" />
                                    <label htmlFor="addfile">
                                        <div className="upload-file">
                                            <span><i className="las la-upload"></i> Select File or browse</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group">
                                <button type="submit" className="Cancel-btn">Cancel</button>
                                <button type="submit" className="Create-btn mx-2">Create</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCrates