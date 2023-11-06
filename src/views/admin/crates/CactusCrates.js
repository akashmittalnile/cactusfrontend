import React, { useEffect, useState } from 'react';
import "../../../assets/admin/css/cactus-crates.css";
import { Link } from 'react-router-dom';
import up from "../../../assets/images/admin/up-stock.svg";
import down from "../../../assets/images/admin/down-stock.svg";
import cr1 from "../../../assets/images/admin/cr-1.png";
import nasdaqcomposite from "../../../assets/images/admin/nasdaq-composite.jpeg";
import otc from "../../../assets/images/admin/otc_market.jpeg.jpg";
import { api } from '../../../utils/api.utils';
import ApiService from '../../../core/services/ApiService';
import Loader from '../../common/Loader';
import { encode } from 'base-64';
import { totalPageCalculator } from '../../../utils/status.utils';
import delete_news from "../../../assets/images/admin/delete-news.svg";
import { Modal, ModalBody } from "reactstrap";
import { toast } from 'react-hot-toast';
import nodata from "../../../assets/images/admin/no_data.png";

const LIMIT = 12;


const CactusCrates = () => {

    const [loading, setLoading] = useState(false);
    const [trash, setTrash] = useState({ status: false, id: null });
    const [crates, setCrates] = useState([]);
    const [total, setTotal] = useState(0);
    const [pageNum, setPageNum] = useState(1);

    const getAllCrates = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("Crates list => ", response.data.body);
        if (response.data.headers.success === 1) {
            setTotal(response.data.body.totalCount);
            setCrates(response.data.body.listing);
        } else setCrates([]);
        setLoading(false);
    }

    const deleteNews = async (id) => {
        setLoading(true);
        const response = await ApiService.deleteAPIWithAccessToken(api.DeleteCrate + `${id}`);
        if (response.data.headers.success === 1) {
            toast.success("Crates delete successfully!");
        }
        getAllCrates(api.AllCrate + `?page=${pageNum}&limit=${LIMIT}`)
        setTrash({ status: false, id: null });
        setLoading(false);
    }

    const handleFilter = (e) => {
        let name = ""
        if (e.target.name === 'name') name = e.target.value;
        getAllCrates(api.AllCrate + `?name=${name}&page=${pageNum}&limit=${LIMIT}`);
    }

    useEffect(() => {
        getAllCrates(api.AllCrate + `?page=${pageNum}&limit=${LIMIT}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum]);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="cactuscrates-section">
                <div className="cactuscrates-header">
                    <div className="mr-auto">
                        <h4 className="heading-title">Cactus Crates</h4>
                    </div>
                    <div className="cactuscrates-filter wd50">
                        <div className="row g-2">
                            <div className="col-md-6">
                                <div className="form-group search-form-group">
                                    <input type="text" name="name" onChange={(e) => handleFilter(e)} className="form-control" placeholder="Search..." style={{ color: "#000", height: "41.5px" }} />
                                    <span className="search-icon"><i className="la la-search"></i></span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <Link className="createcrate-btn" to="/cactus-crates-create">Create New Crate</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cactuscrates-body">
                    <div className="row g-2">

                        {
                            crates.length !== 0 ?
                                (crates.map((ele, indx) => {
                                    return (
                                        <div key={indx} className="col-md-3">
                                            <div className="cactuscrates-card">
                                                <div className="cactuscrates-media"><img src={(ele.media && ele.media !== undefined && ele.media !== "") ? ele.media : cr1} alt="not-found" /></div>
                                                <div className="cactuscrates-content">
                                                    <div className="cactuscrates-content-inner">
                                                        <h4 className='text-capitalize'>{ele.name ?? "NA"}</h4>
                                                        <div className="cactuscrates-price">${parseFloat(ele.amount ?? 0).toFixed(2)}</div>
                                                        <div className="cactuscrates-action">
                                                            <Link to={`/view-cactus-crates/${encode(ele.id)}`}>View</Link>
                                                            <Link to={`/cactus-crates-edit/${encode(ele.id)}`}>Edit</Link>
                                                            <Link to="" onClick={() => setTrash({ status: true, id: ele.id })}>Delete</Link>
                                                        </div>
                                                    </div>
                                                    <div className="cactuscrates-stock crates-stock-up">
                                                        <img src={up} alt="not-found" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }))
                                :
                                (
                                    <div className='d-flex mt-5 justify-content-center'>
                                        <div className='text-center'>
                                            <img className='mb-3' src={nodata} alt="no-data" />
                                            <p>No crates found</p>
                                        </div>
                                    </div>
                                )
                        }

                        {
                            crates.length !== 0 ?
                                (
                                    <div className="cactus-table-pagination">
                                        <ul className="cactus-pagination">
                                            {pageNum !== 1 && <li className="disabled" id="example_previous" onClick={() => setPageNum(pageNum - 1)}>
                                                <a href="#" aria-controls="example" data-dt-idx="0" tabIndex="0" className="page-link">Previous</a>
                                            </li>}

                                            {
                                                totalPageCalculator(total, LIMIT).length === 1 ? null :
                                                    (totalPageCalculator(total, LIMIT).map((pageNo, indx) => {
                                                        return (
                                                            <li className={pageNo === pageNum ? "active" : ""} key={indx} onClick={() => setPageNum(pageNo)}>
                                                                <a href="#" className="page-link">{pageNo}</a>
                                                            </li>
                                                        )
                                                    }))
                                            }

                                            {pageNum !== Math.ceil(total / LIMIT) && <li className="next" id="example_next" onClick={() => setPageNum(pageNum + 1)}>
                                                <a href="#" aria-controls="example" data-dt-idx="7" tabIndex="0" className="page-link">Next</a>
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

            <Modal isOpen={trash.status} toggle={() => setTrash({ status: false, id: null })} className="kin-modal" >
                <div className="modal-content">
                    <ModalBody className='modal-body'>
                        <div className="deletenews-form-info">
                            <button type="button" className="btn-close" onClick={(e) => { e.preventDefault(); setTrash({ status: false, id: null }); }} data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="deletenews-media">
                                <img src={delete_news} alt='not_found' />
                            </div>
                            <h3>Are you sure want to Delete this Crates</h3>
                            <div className="deletenews-action">
                                <Link className="no-btn" onClick={(e) => { e.preventDefault(); setTrash({ status: false, id: null }); }} to="">No</Link>
                                <Link className="yes-btn mx-2" to="" onClick={() => deleteNews(trash.id)}>Yes</Link>
                            </div>
                        </div>
                    </ModalBody>
                </div>
            </Modal>
        </>
    )
}

export default CactusCrates