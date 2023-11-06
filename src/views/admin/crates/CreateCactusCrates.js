import React, { useState, useEffect } from 'react';
import "../../../assets/admin/css/cactus-crates.css";
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../utils/api.utils';
import Loader from '../../common/Loader';
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import up from "../../../assets/images/admin/upload.png";
import ApiService from '../../../core/services/ApiService';
import { toast } from 'react-hot-toast';


const CreateCactusCrates = () => {

    const navigate = useNavigate();
    const [stockList, setStockList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState([{ stock: "", percentage: null, price: 0, symbol: "", name: "" }]);
    const [image, setImage] = useState(up);
    const [imgError, setImgError] = useState(false);
    const [perError, setPerError] = useState(false);
    const [file, setFile] = useState();
    const [error, setError] = useState(false);

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
        'name': "",
        'amount': "",
        'usabe_no': "",
        'start_date': "",
        'end_date': "",
        'status': "",
        'file': "",
    };

    const validateSchema = Yup.object().shape({
        name: Yup.string().required(`Crate name is required`),
        status: Yup.string().required(`Status is required`)
    });

    const addCrates = async (formValue) => {
        if (file === "" || file === null || !file) {
            setImgError(true);
            return;
        } else setImgError(false);
        if(getTotalPercentage() != 100){
            setPerError(true);
            return;
        }
        else setPerError(false);
        if(getTotal() == 0.00){
            setError(true);
            return;
        }
        else setError(false);
        setLoading(true);
        // console.log("Create crate form data => ", formValue);
        let form = new FormData();
        form.append("name", formValue.name);
        form.append("amount", null);
        form.append("start_date", null);
        form.append("end_date", null);
        form.append("usabe_no", null);
        form.append("status", formValue.status);
        form.append("file", file);
        count.forEach((ele, index) => {
            form.append(`club_share[${index}][share_id]`, ele.symbol);
            form.append(`club_share[${index}][quantity]`, 1);
            form.append(`club_share[${index}][percentage]`, ele.percentage);
            form.append(`club_share[${index}][name]`, ele.name);
        });
        const response = await ApiService.postAPIWithAccessTokenMultiPart(api.CreateCrate, form);
        if (response.data.headers.success === 1) {
            toast.success('New crate added successfully!');
            navigate('/cactus-crates');
        }
        for (let [key, value] of form) {
            console.log(`${key}: ${value}`)
        }
        setLoading(false);
    }

    const handleImgChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        if (!(e.target.files[0])) {
            setImgError(true);
        } else setImgError(false);
    }

    const addStockInput = () => {
        setCount([...count, { stock: "", percentage: null, price: 0, symbol: "", name: "" }]);
    }

    const removeStockInput = (index) => {
        const list = [...count];
        console.log(index);
        list.splice(index, 1);
        setCount(list);
    }

    const twelevePrice = async (symbol, index) => {
        const response = await axios.get(api.TwelveDataPrice + `?symbol=${symbol}&apikey=6b7ad9bbb1014db4baff00e7719f7689`);
        const list = [...count];
        list[index]['price'] = response.data.price ?? 0;
        setCount(list);
    }

    const handleChangeStock = (e, index) => {
        const { value } = e.target;
        const splitVal = value.split(",");
        const list = [...count];
        list[index]['stock'] = value;
        list[index]['symbol'] = splitVal[splitVal.length - 1];
        let charIndex = value.indexOf(splitVal[splitVal.length - 1]);
        list[index]['name'] = value.substring(0, charIndex - 1);
        twelevePrice(splitVal[splitVal.length - 1], index)
        setCount(list);
    }

    const handleChangeQuantity = (e, index) => {
        const { value } = e.target;
        const list = [...count];
        list[index]['percentage'] = value;
        setCount(list);
    }

    const getTotal = () => {
        let total = count.reduce((n, { percentage, price }) => parseFloat(n) + ((parseFloat((percentage === "" || !percentage) ? 0 : percentage/100)) * parseFloat(price ?? 0)), 0);
        // console.log(total);
        if(total === "" || total === 0 || total === null || total === undefined) return 0;
        return parseFloat(total ?? 0).toFixed(2);
    }

    const getTotalPercentage = () => {
        let total = count.reduce((n, { percentage, price }) => parseFloat(n) + parseFloat((percentage === "" || !percentage) ? 0 : percentage), 0);
        if(total === "" || total === 0 || total === null || total === undefined) return 0;
        return parseFloat(total ?? 0).toFixed(2);
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
                    <h5>Create Crate</h5>
                    <div className="mr-auto">
                        <Link className="Back-btn" onClick={() => navigate(-1)} to=""><i className="las la-arrow-left"></i> Back</Link>
                    </div>
                </div>

                <div className="cactuscrates-create-form">
                    <Formik initialValues={initialValue} validateOnChange={true} validationSchema={validateSchema} onSubmit={addCrates}>
                        <Form>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Crate Name</label>
                                        <Field type="text" className="form-control" name="name" placeholder="Enter Crate Name" />
                                        <ErrorMessage name="name" component="div" className="alert alert-danger" />
                                    </div>
                                </div>

                                {/* <div className="col-md-6">
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
                                </div> */}

                                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Price per crate</label>
                                        <Field type="text" className="form-control" name="price_per_crate" placeholder="Price Per Crate" />
                                        <ErrorMessage name="price_per_crate" component="div" className="alert alert-danger" />
                                    </div>
                                </div> */}
                            </div>

                            {
                                count.map((curEle, index) => {
                                    return (
                                        <div key={index} className="row">
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <label htmlFor='category'>Crate Stock/Share</label>
                                                    <input required list='stocklist' onChange={(e) => handleChangeStock(e, index)} className='form-control' name='stockname' id='category' placeholder='Select Stock' defaultValue={curEle.stock} />
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

                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label>Stock/Share Probability <small className='text-danger' style={{fontWeight:"600"}}>(in %)</small></label>
                                                    <input required type="number" min="0.1" max="100" step="0.1" onChange={(e) => handleChangeQuantity(e, index)} className="form-control" name="stockquantity" placeholder='Probability (in %)' value={curEle.percentage} />
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className='row mt-4'>
                                                    {
                                                        (curEle.percentage !== "" && curEle.percentage && curEle.percentage !== undefined && curEle.stock !== "" && curEle.stock !== undefined) && (
                                                            parseFloat(curEle.percentage/100).toFixed(2) + ' X ' + parseFloat(curEle.price).toFixed(2) + ' = ' + parseFloat(curEle.price * (curEle.percentage/100)).toFixed(2)
                                                        )
                                                    }

                                                </div>
                                            </div>

                                            <div className="col-md-1 mt-4">
                                                <div className="form-group">
                                                    {
                                                        count.length > 1 && (
                                                            <Link className={"blocked-btn px-3 py-2"} onClick={() => removeStockInput(index)} to="">Cancel</Link>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-1 mt-4">
                                                <div className="form-group">
                                                    {
                                                        count.length - 1 === index && (
                                                            <Link onClick={() => addStockInput()} className={"user-active-btn px-3 py-2"} to=""><i className='las la-plus'></i> Add</Link>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            {
                                perError ? (
                                    <div className="alert alert-danger">
                                        Probability cannot be greater or less than 100%
                                    </div>
                                ) : null
                            }

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
                                    <div>
                                        <b>Expected value : </b><b><span className="text-success">{getTotal() ?? 0}</span></b>
                                    </div>
                                    <div>
                                        <b>Total crate amount : </b><b><span className="text-success">{parseFloat(getTotal()/0.8).toFixed(2) ?? 0}</span></b>
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
                                        {
                                            imgError && (
                                                <div className='alert alert-danger'>Image is required</div>
                                            )
                                        }
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <img src={image} alt="upload image" className='img-fuild rounded' width={100} />
                                    </div>

                                </div>

                                {
                                    error ? (
                                        <div className="alert alert-danger">
                                            API limit reached price not available
                                        </div>
                                    ) : null
                                }

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <button type="submit" onClick={() => navigate(-1)} className="Cancel-btn">Cancel</button>
                                        <button type="submit" className="Create-btn mx-2">Create</button>
                                    </div>
                                </div>

                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default CreateCactusCrates