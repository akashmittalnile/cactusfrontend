import React, { useState, useEffect } from 'react';
import "../../../assets/admin/css/cactus-crates.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../utils/api.utils';
import Loader from '../../common/Loader';
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import up from "../../../assets/images/admin/upload.png";
import ApiService from '../../../core/services/ApiService';
import { toast } from 'react-hot-toast';
import { decode } from 'base-64';
import { Modal, ModalBody } from "reactstrap";
import deleteImg from "../../../assets/images/admin/delete-news.svg";
import { currentPrice } from '../../../utils/status.utils';

const EditCactusCrates = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [crates, setCrates] = useState({});
    const [stockList, setStockList] = useState([]);
    const [isDelete, setDelete] = useState({ status: false, id: "", index: "" });
    const [add, setAdd] = useState({ status: false });
    const [count, setCount] = useState([]);
    const [newCount, setNewCount] = useState([{ stock: "", quantity: null, price: 0, symbol: "", name: "" }]);
    const [image, setImage] = useState(up)
    const [file, setFile] = useState({})

    const getCrateDetails = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("Crate details => ", response.data.body);
        if (response.data.headers.success === 1) {
            setCrates(response.data.body);
            if (response.data.body.media && response.data.body.media !== undefined && response.data.body.media !== "") {
                setImage(response.data.body.media);
            }
        }
        setLoading(false);
    }

    const twelevePrice = async (symbol) => {
        const response = await axios.get(api.TwelveDataPrice + `?symbol=${symbol}&apikey=6b7ad9bbb1014db4baff00e7719f7689`);
        return response.data.price ?? 0;
    }

    const getCrateShareDetails = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("Crate Share list => ", response.data.body);
        if (response.data.headers.success === 1) {
            // (response.data.body).map((element, i) => {
            //     element.twelve = await twelevePrice(element.share_id);
            // });
            setCount(response.data.body);
        } else setCount([]);
        setLoading(false);
    }

    const getStockList = async (api) => {
        setLoading(true);
        const response = await axios.get(api);
        // console.log(response.data.data);
        if (response.data.status === "ok") {
            setStockList(response.data.data);
        } else setStockList([]);
        setLoading(false);
    }

    const todayDate = (day) => {
        var today = new Date();
        var dd = today.getDate() + day;
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    const initialValue = {
        'name': crates.name ?? "",
        'amount': crates.amount ?? "",
        'usabe_no': crates.usabe_no ?? "",
        'start_date': crates.start_date,
        'end_date': crates.end_date,
        'status': crates.status,
        'file': "",
    };

    const initialValueAdd = {
        'stock': "",
        'quantity': "",
    };

    const validateSchema = Yup.object().shape({
        name: Yup.string().required(`Crate name is required`),
        amount: Yup.number().typeError('Crate amount must be digit').required(`Crate amount is required`),
        start_date: Yup.date().required("Start date is required"),
        end_date: Yup.date().required("End date is required"),
        usabe_no: Yup.number().typeError('Number of Usable must be digit').required(`Number of Usable is required`),
        status: Yup.string().required(`Status is required`)
    });

    const editCrates = async (formValue) => {
        setLoading(true);
        console.log("Edit crate form data => ", formValue);
        let form = new FormData();
        form.append("name", formValue.name);
        form.append("amount", formValue.amount);
        form.append("start_date", formValue.start_date);
        form.append("end_date", formValue.end_date);
        form.append("usabe_no", formValue.usabe_no);
        form.append("status", formValue.status);
        form.append("file", file);
        count.forEach((ele, index) => {
            form.append(`club_share[${index}][id]`, ele.crate_share_id);
            form.append(`club_share[${index}][share_id]`, ele.symbol);
            form.append(`club_share[${index}][quantity]`, ele.quantity);
            form.append(`club_share[${index}][name]`, ele.name);
        });
        const response = await ApiService.putAPIWithAccessTokenMultiPart(api.EditCrateDetails + `${decode(id)}`, form);
        if (response.data.headers.success === 1) {
            toast.success('Crate updated successfully!');
            navigate(-1);
        }
        setLoading(false);
    }

    const removeStock = async (stockid, index) => {
        setLoading(true);
        const response = await ApiService.deleteAPIWithAccessToken(api.DeleteCrateStock + `${stockid}`);
        if (response.data.headers.success === 1) {
            toast.success('Stock/Share remove successfully!');
            getCrateDetails(api.CrateDetails + `${decode(id)}`);
            const list = [...count];
            list.splice(index, 1);
            setCount(list);
        }
        setLoading(false);
    }

    const handleImgChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const addStock = async (formValue, { resetForm }) => {
        setLoading(true);
        const data = {
            "crate_id": decode(id),
            "share_id": newCount[0].symbol,
            "name": newCount[0].name,
            "quantity": newCount[0].quantity,
            "status": 1
        }
        // console.log(data);
        const response = await ApiService.postAPIWithAccessToken(api.AddCrateStock, data);
        if (response.data.headers.success === 1) {
            toast.success('New stock/share added successfully!');
            getCrateDetails(api.CrateDetails + `${decode(id)}`);
        }
        resetForm();
        getCrateShareDetails(api.CrateShareDetails + `${decode(id)}`);
        setNewCount([{ stock: "", quantity: null, price: 0, symbol: "", name: "" }]);
        setAdd({ status: false });
        setLoading(false);
    }

    const handleChangeStock = (e, index) => {
        const { value } = e.target;
        const splitVal = value.split(",");
        const list = [...count];
        list[index]['share_id'] = value;
        list[index]['symbol'] = splitVal[splitVal.length - 1];
        let charIndex = value.indexOf(splitVal[splitVal.length - 1]);
        list[index]['name'] = value.substring(0, charIndex - 1);
        setCount(list);
    }

    const handleNewChangeStock = async (e, index = 0) => {
        const { value } = e.target;
        const splitVal = value.split(",");
        const list = [...newCount];
        list[index]['stock'] = value;
        list[index]['symbol'] = splitVal[splitVal.length - 1];
        list[index]['price'] = await twelevePrice(splitVal[splitVal.length - 1]);
        let charIndex = value.indexOf(splitVal[splitVal.length - 1]);
        list[index]['name'] = value.substring(0, charIndex - 1);
        setNewCount(list);
    }

    const handleChangeQuantity = (e, index) => {
        const { value } = e.target;
        const list = [...count];
        list[index]['quantity'] = value;
        setCount(list);
    }

    const handleNewChangeQuantity = (e, index = 0) => {
        const { value } = e.target;
        const list = [...newCount];
        list[index]['quantity'] = value;
        setNewCount(list);
    }

    const getTotal = () => {
        let total = newCount.reduce((n, { quantity, price }) => parseFloat(n) + (parseFloat((quantity === "") ? 0 : quantity) * parseFloat(price ?? 0)), 0);
        // console.log(total);
        if(total === "" || total === 0 || total === null || total === undefined) return 0;
        return parseFloat(total ?? 0).toFixed(2);
    }

    useEffect(() => {
        getCrateDetails(api.CrateDetails + `${decode(id)}`);
        getStockList(api.TwelveDataStock + '?exchange=NASDAQ&country=usa');
        getCrateShareDetails(api.CrateShareDetails + `${decode(id)}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="cactuscrates-section">
                <div className="cactuscrates-header">
                    <h5>Edit Crate</h5>
                    <div className="mr-auto">
                        <Link className="Back-btn" onClick={() => navigate(-1)} to=""><i className="las la-arrow-left"></i> Back</Link>
                    </div>
                </div>

                <div className="cactuscrates-create-form">
                    <Formik initialValues={initialValue} validateOnChange={true} validationSchema={validateSchema} enableReinitialize onSubmit={editCrates}>
                        <Form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Crate Name</label>
                                        <Field type="text" className="form-control" name="name" placeholder="Enter Crate Name" />
                                        <ErrorMessage name="name" component="div" className="alert alert-danger" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Crate amount</label>
                                        <Field type="text" className="form-control" name="amount" placeholder="Enter Crate Amount" />
                                        <ErrorMessage name="amount" component="div" className="alert alert-danger" />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Start date</label>
                                        <Field type="date" className="form-control" min={todayDate(1)} name="start_date" />
                                        <ErrorMessage name="start_date" component="div" className="alert alert-danger" />
                                    </div>
                                </div>


                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Expiry date</label>
                                        <Field type="date" className="form-control" min={todayDate(7)} name="end_date" />
                                        <ErrorMessage name="end_date" component="div" className="alert alert-danger" />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Number of Usable</label>
                                        <Field type="text" className="form-control" name="usabe_no" placeholder="Number of Usable" />
                                        <ErrorMessage name="usabe_no" component="div" className="alert alert-danger" />
                                    </div>
                                </div>

                                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Price per crate</label>
                                        <Field type="text" className="form-control" name="price_per_crate" placeholder="Price Per Crate" />
                                        <ErrorMessage name="price_per_crate" component="div" className="alert alert-danger" />
                                    </div>
                                </div> */}
                            </div>

                            {
                                count.map((ele, index) => {
                                    return (
                                        <div key={index} className="row">
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <label htmlFor='category'>Crate Stock/Share</label>
                                                    <input required list='stocklist' onChange={(e) => handleChangeStock(e, index)} className='form-control' name='stockname' id='category' placeholder='Select Stock' defaultValue={ele.c_name + ',' + ele.share_id} />
                                                    <datalist id='stocklist'>
                                                        {
                                                            stockList.map((ele, indx) => {
                                                                return (
                                                                    <option key={indx} value={[ele.name, ele.symbol]} />
                                                                )
                                                            })
                                                        }
                                                    </datalist>
                                                </div>
                                            </div>

                                            <input type="hidden" name="cs_id" value={ele.crate_share_id} />

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Stock/Share Quantity</label>
                                                    <input required type="number" onChange={(e) => handleChangeQuantity(e, index)} className="form-control" name="stockquantity" placeholder='Quantity' value={ele.quantity} />
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                {/* <div className='row mt-4'>
                                                    {
                                                        (ele.quantity !== "" && ele.quantity !== undefined && ele.stock !== "" && ele.stock !== undefined) && (
                                                            parseFloat(ele.quantity).toFixed(1) + ' X ' + parseFloat(curEle.price).toFixed(1) + ' = ' + parseFloat(curEle.price * curEle.quantity).toFixed(2)
                                                        )
                                                    }
                                                </div> */}
                                            </div>

                                            <div className="col-md-1 mt-4">
                                                <div className="form-group">
                                                    {
                                                        count.length > 1 && (
                                                            <Link className={"blocked-btn px-3 py-2"} onClick={() => setDelete({ status: true, id: ele.crate_share_id, index })} to="">Remove</Link>
                                                        )
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }

                            <div className="col-md-3">
                                <div className="form-group">
                                    <Link onClick={() => setAdd({ status: true })} className={"user-active-btn px-3 py-2"} to=""><i className='las la-plus'></i> Add More Crates Stock/Share</Link>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Status</label>
                                        <Field as="select" type="text" className="form-control" name="status" defaultValue={"1"} >
                                            <option value="">Select status</option>
                                            <option value="1">Active</option>
                                            <option value="2">Inactive</option>
                                        </Field>
                                        <ErrorMessage name="status" component="div" className="alert alert-danger" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Upload Image</label>
                                        <div className="upload-media">
                                            <input type="file" name="file" id="addfile" accept="image/*" onChange={handleImgChange} className="uploadmediabtn" />
                                            <label htmlFor="addfile">
                                                <div className="upload-file">
                                                    <span><i className="las la-upload"></i> Select File or browse</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        {/* <img src={(crates.media !== '' && crates.media !== undefined && crates.media) ? crates.media : image} alt="upload image" className='img-fuild rounded' width={100} /> */}
                                        <img src={image} alt="upload image" className='img-fuild rounded' width={100} />
                                    </div>

                                </div>

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <button type="button" onClick={() => navigate(-1)} className="Cancel-btn">Cancel</button>
                                        <button type="submit" className="Create-btn mx-2">Update</button>
                                    </div>
                                </div>

                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>


            <Modal isOpen={isDelete.status} toggle={() => { setDelete({ status: false, id: "", index: "" }); }} className="njmep-modal">
                <div className="modal-content">
                    <ModalBody className='modal-body'>
                        <div className="deletenews-form-info">
                            <button
                                type="button"
                                onClick={() => { setDelete({ status: false, id: "", index: "" }); }}
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                            </button>
                            <div className="deletenews-media">
                                <img src={deleteImg} alt="not found" />
                            </div>
                            <h3>Are you sure want to Reject this Stock/Share ?</h3>
                            <div className="deletenews-action">
                                <Link className="no-btn mx-2" onClick={() => { setDelete({ status: false, id: "", index: "" }); }} to="">No</Link>
                                <Link className="yes-btn" onClick={() => removeStock(isDelete.id, isDelete.index)} to="">Yes</Link>
                            </div>
                        </div>
                    </ModalBody>
                </div>
            </Modal>


            <Modal isOpen={add.status} toggle={() => { setAdd({ status: false }); setNewCount([{ stock: "", quantity: null, price: 0, symbol: "", name: "" }]); }} className="njmep-modal">
                <div className="modal-content">
                    <ModalBody className='modal-body'>
                        <div className="deletenews-form-info">
                            <button
                                type="button"
                                onClick={() => { setAdd({ status: false }); setNewCount([{ stock: "", quantity: null, price: 0, symbol: "", name: "" }]); }}
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                            </button>
                            <h3>New Crates Stock/Share</h3>
                            <div className="cactuscrates-create-form">
                                <Formik initialValues={initialValueAdd} onSubmit={addStock}>
                                    <Form>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor='category'>Crate Stock/Share</label>
                                                    <input required list='stocklist' onChange={(e) => handleNewChangeStock(e)} className='form-control' name='stock' id='category' placeholder='Select Stock' defaultValue={newCount.stock} />
                                                    <datalist id='stocklist'>
                                                        {
                                                            stockList.map((ele, indx) => {
                                                                return (
                                                                    <option key={indx} value={[ele.name, ele.symbol]} />
                                                                )
                                                            })
                                                        }
                                                    </datalist>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Stock/Share Quantity</label>
                                                    <input required type="number" onChange={(e) => handleNewChangeQuantity(e)} className="form-control" name="quantity" placeholder='Quantity' value={newCount.quantity} />
                                                </div>
                                            </div>
                                            <div className='col-md-12 my-3'>
                                                {
                                                    (newCount[0].quantity && newCount[0].stock) ?
                                                        (
                                                            parseFloat(newCount[0].quantity).toFixed(1) + ' X ' + parseFloat(newCount[0].price).toFixed(1) + ' = ' + parseFloat(newCount[0].quantity * newCount[0].price).toFixed(2)
                                                        )
                                                        :
                                                        null
                                                }
                                            </div>
                                            <div className='mb-3'>
                                                <b>Total : </b><b><span className="text-success">{getTotal() ?? 0}</span></b>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <button onClick={() => { setAdd({ status: false }); setNewCount([{ stock: "", quantity: null, price: 0, symbol: "", name: "" }]); }} type="button" className="Cancel-btn">Cancel</button>
                                                    <button type="submit" className="Create-btn mx-2">Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </ModalBody>
                </div>
            </Modal>

        </>
    )
}

export default EditCactusCrates