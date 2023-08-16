import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api.utils';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../../../core/services/ApiService';
import Loader from '../../common/Loader';
import { totalPageCalculator } from '../../../utils/status.utils';

const LIMIT = 5;

const TransactionStatement = () => {

    const [transaction, setTransaction] = useState([]);
    const [total, setTotal] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const id = (JSON.parse(localStorage.getItem('cactus'))).userId;
    const navigate = useNavigate();

    const getTransactionList = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("all transaction list => ", response.data.body);
        if (response.data.headers.success === 1) {
            setTotal(response.data.body.totalCount);
            setTransaction(response.data.body.listing);
        }
        else setTransaction([]);
        setLoading(false);
    }

    useEffect(() => {
        getTransactionList(api.TransactionStatement + `?owner_id=${id}&owner_type=admin&page=${pageNum}&limit=${LIMIT}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum]);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="user-table-section">
                <div className="heading-section">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="mr-auto">
                            <h4 className="heading-title">Admin Transaction Statement</h4>
                        </div>
                        <div className='mx-3'>
                            <Link className="Back-btn" to="" onClick={(e) => { e.preventDefault(); navigate(-1); }} ><i className="las la-arrow-left"></i> Back</Link>
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
                                        <th>Name</th>
                                        <th>Balance</th>
                                        <th>Club Name</th>
                                        <th>Type</th>
                                        <th>Comment</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        transaction.length !== 0 ?
                                            (
                                                transaction.map((ele, indx) => {
                                                    return (
                                                        <tr key={indx}>
                                                            <td>{indx + 1}</td>
                                                            <td className='text-capitalize'>{ele.first_name ?? "NA"} {ele.last_name ?? ""}</td>
                                                            <td>{parseFloat(ele.balance).toFixed(2) ?? 0}</td>
                                                            <td>{ele.club_name ?? "NA"}</td>
                                                            <td>{ele.type ?? "NA"}</td>
                                                            <td>{ele.comment ?? "NA"}</td>
                                                        </tr>
                                                    )
                                                })
                                            )
                                            :
                                            (
                                                <tr className='text-center'>
                                                    <td colSpan={6}>No record found</td>
                                                </tr>
                                            )
                                    }

                                    {
                                        transaction.length !== 0 ?
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
            </div>
        </>
    )
}

export default TransactionStatement