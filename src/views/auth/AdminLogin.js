import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../Store/slices/auth";
import { clearMessage } from "../../Store/slices/message";
// import logo from "../../assets/images/admin/logo.svg";
import intro from "../../assets/images/admin/intro.png";
import Loader from "../common/Loader";
import "../../assets/admin/css/login.css";

const AdminLogin = (props) => {

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        email: "",
        password: "",
        fcm_token: 'sdfjsdljflsdbfbsdfosufoishdkfbskd',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Please enter valid email!").required("Email address is required!"),
        password: Yup.string().required("Password is required!"),
    });

    const handleLogin = (formValue) => {
        setLoading(true);
        const { email, password, fcm_token } = formValue;
        console.log(formValue);
        dispatch(login({ email, password, fcm_token }))
            .unwrap()
            .then(() => {
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (isLoggedIn) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="auth-section">
                <div className="container">
                    <div className="auth-card">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="auth-content">
                                    <div className="auth-content-info">

                                        <div className="auth-illustration">
                                            <img src={intro} alt="logo" />
                                        </div>
                                        <h2>Virtual Trading App to earn maximum profit</h2>
                                        <p>Grow your portfolio by receiving rewards up to 14.5% on your crypto assets</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 auth-form-info">
                                <div className="auth-form">
                                    <h2>Welcome back!</h2>
                                    <p>Please enter your email and password</p>
                                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
                                        <Form className="pt-4">
                                            <div className="form-group">
                                                <Field type="email" name="email" className="form-control" placeholder="Email Address" />
                                                <Field type="hidden" name="fcm_token" value='sdfjsdljflsdbfbsdfosufoishdkfbskd' />
                                                <ErrorMessage name="email" component="div" className="alert alert-danger" />
                                            </div>
                                            <div className="form-group">
                                                <Field type="password" name="password" className="form-control" placeholder="Password" />
                                                <ErrorMessage name="password" component="div" className="alert alert-danger" />
                                            </div>
                                            <div className="form-group">
                                                <button className="auth-form-btn" type="submit">Sign In</button>
                                            </div>

                                            {/* <div className="mt-1 forgotpsw-text">
                                                <a href="javascript:void(0);">I forgot my password</a>
                                            </div> */}
                                        </Form>
                                    </Formik>
                                    {message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AdminLogin