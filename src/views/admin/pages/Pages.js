import React, { useState, useEffect } from 'react';
import "../../../assets/admin/css/users.css";
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle } from "reactstrap";
import ApiService from '../../../core/services/ApiService';
import Loader from "../../common/Loader";
import { Modal, ModalBody } from "reactstrap";
import { encode } from 'base-64';
import { api } from '../../../utils/api.utils';
import { htmlToText } from 'html-to-text';
import delete_news from "../../../assets/images/admin/delete-news.svg";
import { toast } from 'react-hot-toast';
import { totalPageCalculator } from '../../../utils/status.utils';

const LIMIT = 5;

const Pages = () => {

    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trash, setTrash] = useState({ status: false, id: null });
    const [total, setTotal] = useState(0);
    const [pageNum, setPageNum] = useState(1);

    const getPagesList = async (api) => {
        setLoading(true);
        console.log(api);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("All pages => ", response.data.body);
        if (response.data.headers.success === 1) {
            setPages(response.data.body.listing);
            setTotal(response.data.body.totalCount);
        } else setPages([]);
        setLoading(false);
    }

    const deletePage = async (id) => {
        setLoading(true);
        const response = await ApiService.deleteAPIWithAccessToken(api.DeletePage + `${id}`);
        if (response.data.headers.success === 1) {
            toast.success("Page delete successfully!");
        }
        getPagesList(api.GetAllPages + `&page=${pageNum}&limit=${LIMIT}`);
        setTrash({ status: false, id: null });
        setLoading(false);
    }

    const handleFilter = (e) => {
        let slug = ""
        if (e.target.name === 'slug') slug = e.target.value;
        getPagesList(api.GetAllPages + `&slug=${slug}&page=${pageNum}&limit=${LIMIT}`);
    }

    useEffect(() => {
        getPagesList(api.GetAllPages + `&page=${pageNum}&limit=${LIMIT}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum]);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="user-table-section">
                <div className="heading-section">
                    <div className="d-flex align-items-center">
                        <div className="mr-auto">
                            <h4 className="heading-title">Pages</h4>
                        </div>
                        <div className="btn-option-info wd80">
                            <div className="search-filter">
                                <div className="row g-2 d-flex justify-content-end">
                                    <div className="col-md-4">
                                        <div className="form-group search-form-group">
                                            <input type="text" name='slug' onChange={(e) => handleFilter(e)} className="form-control" placeholder="Search..." style={{ color: "#000" }} />
                                            <span className="search-icon"><i className="la la-search"></i></span>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <Link style={{ height: "44.5px" }} className="Approve-User-btn" to="/create-page"><i className="las la-plus"></i> Create pages</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="user-content-section">
                    <div className="user-table-card">

                        <div className="table-responsive">
                            <table className="table table-users">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        pages.length !== 0 ?
                                            (
                                                pages.map((ele, indx) => {
                                                    return (
                                                        <tr key={indx}>
                                                            <td>
                                                                <span className="sno">{indx + 1}</span>
                                                            </td>

                                                            <td>
                                                                {ele.title}
                                                            </td>

                                                            <td width={900}>
                                                                {
                                                                    ele.full_content.length > 260 ? htmlToText(ele.full_content).substring(0, 260) + '........' : htmlToText(ele.full_content)
                                                                }
                                                            </td>

                                                            <td>
                                                                <Link className={ele.status === 1 ? "user-active-btn" : "blocked-btn"} to="">{ele.status === 1 ? "Active" : "Inactive"}</Link>
                                                            </td>

                                                            <td>
                                                                <UncontrolledDropdown className='action-btn-info'>
                                                                    <DropdownToggle className="action-btn dropdown-toggle" nav>
                                                                        <i className="las la-ellipsis-v"></i>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu className='dropdown-menu' end>
                                                                        <DropdownItem to={`/edit-page/${encode(ele.id)}`} tag={Link} className='dropdown-item'>
                                                                            <i className="las la-eye"></i> Edit
                                                                        </DropdownItem>
                                                                        <DropdownItem to="" tag={Link} onClick={(e) => { e.preventDefault(); setTrash({ status: true, id: ele.id }); }} className='dropdown-item'>
                                                                            <i className="las la-trash"></i> Delete
                                                                        </DropdownItem>
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            )
                                            :
                                            (
                                                <tr className='text-center'>
                                                    <td colSpan="4">No record found</td>
                                                </tr>
                                            )
                                    }

                                    {
                                        pages.length !== 0 ?
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

                                </tbody>
                            </table>
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
                                <h3>Are you sure want to Delete this Page</h3>
                                <div className="deletenews-action">
                                    <Link className="no-btn" onClick={(e) => { e.preventDefault(); setTrash({ status: false, id: null }); }} to="">No</Link>
                                    <Link className="yes-btn mx-2" to="" onClick={() => deletePage(trash.id)}>Yes</Link>
                                </div>
                            </div>
                        </ModalBody>
                    </div>
                </Modal>


            </div>
        </>
    )
}

export default Pages