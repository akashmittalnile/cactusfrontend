import React, { useState, useEffect } from 'react';
import "../../../assets/admin/css/news.css";
import { Link } from 'react-router-dom';
import s1 from "../../../assets/images/admin/s1.webp";
import delete_news from "../../../assets/images/admin/delete-news.svg";
import { Modal, ModalBody } from "reactstrap";
import ApiService from '../../../core/services/ApiService';
import Loader from "../../common/Loader";
import { encode } from 'base-64';
import { api } from '../../../utils/api.utils';
import { htmlToText } from 'html-to-text';
import { toast } from 'react-hot-toast';
import { totalPageCalculator } from '../../../utils/status.utils';

const LIMIT = 3;

const News = () => {

    const [trash, setTrash] = useState({ status: false, id: null });
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [pageNum, setPageNum] = useState(1);

    const getNewsList = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("All News => ", response.data);
        if (response.data.headers.success === 1) {
            setNews(response.data.body.listing);
            setTotal(response.data.body.totalCount);
        } else setNews([]);
        setLoading(false);
    }

    const deleteNews = async (id) => {
        setLoading(true);
        const response = await ApiService.deleteAPIWithAccessToken(api.DeleteNews + `${id}`);
        if (response.data.headers.success === 1) {
            toast.success("News delete successfully!");
        }
        getNewsList(api.AllNews + `&page=${pageNum}&limit=${LIMIT}`);
        setTrash({ status: false, id: null });
        setLoading(false);
    }

    const handleFilter = (e) => {
        let title = ""
        let status = ""
        if (e.target.name === 'title') title = e.target.value;
        if (e.target.name === 'status') status = e.target.value;
        getNewsList(api.AllNews + `&title=${title}&status=${status}&page=${pageNum}&limit=${LIMIT}`);
    }

    useEffect(() => {
        getNewsList(api.AllNews + `&page=${pageNum}&limit=${LIMIT}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum]);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="news-section">
                <div className="news-header">
                    <div className="mr-auto">
                        <h4 className="heading-title">News</h4>
                    </div>
                    <div className="search-filter wd70">
                        <div className="row g-2">
                            <div className="col-md-4">
                                <div className="form-group search-form-group">
                                    <input type="text" name='title' onChange={(e) => handleFilter(e)} className="form-control" placeholder="Search title..." style={{ color: "#000" }} />
                                    <span className="search-icon"><i className="la la-search"></i></span>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group">
                                    <select className="form-control" name='status' onChange={(e) => handleFilter(e)} style={{ height: "44.5px" }}>
                                        <option value="">Show All News</option>
                                        <option value="1">Active News</option>
                                        <option value="2">Inactive News</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group">
                                    <Link className="CreateNews-btn" to="/create-news" style={{ height: "44.5px" }}>Create News</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="news-body">
                    <div className="row">

                        {
                            news.length !== 0 ?
                                (news.map((ele, index) => {
                                    return (
                                        <div key={index} className="col-md-4">
                                            <div className="news-card">
                                                <div className="news-media"><img src={(ele.media && ele.media !== undefined && ele.media !== "") ? ele.media : s1} alt="not-found" /></div>
                                                <div className="news-content">
                                                    <h4>{ele.title ?? "NA"}</h4>
                                                    <Link className={ele.status === 1 ? "user-active-btn mb-2" : "blocked-btn mb-2"} to="">{ele.status === 1 ? "Active" : "Inactive"}</Link>
                                                    <div className="news-descr">{
                                                        ele.short_content.length > 278 ? htmlToText(ele.short_content).substring(0, 278) + '........' : htmlToText(ele.short_content)
                                                    }</div>
                                                    <div className="news-action">
                                                        <Link className="view-btn" to={`/view-news/${encode(ele.id)}`}>View</Link>
                                                        <Link className="edit-btn mx-1" to={`/edit-news/${encode(ele.id)}`}>Edit</Link>
                                                        <Link className="delete-btn" to="" onClick={(e) => { e.preventDefault(); setTrash({ status: true, id: ele.id }); }} data-bs-toggle="modal" data-bs-target="#DeleteNews">Delete</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }))
                                :
                                (
                                    <div className='d-flex mt-5 justify-content-center'>
                                        No news found
                                    </div>
                                )
                        }

                        {
                            news.length !== 0 ?
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


            <Modal isOpen={trash.status} toggle={() => setTrash({ status: false, id: null })} className="kin-modal" >
                <div className="modal-content">
                    <ModalBody className='modal-body'>
                        <div className="deletenews-form-info">
                            <button type="button" className="btn-close" onClick={(e) => { e.preventDefault(); setTrash({ status: false, id: null }); }} data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="deletenews-media">
                                <img src={delete_news} alt='not_found' />
                            </div>
                            <h3>Are you sure want to Delete this News</h3>
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

export default News