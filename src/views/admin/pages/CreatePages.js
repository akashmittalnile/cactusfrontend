import React, { useState } from 'react';
import "../../../assets/admin/css/news.css";
import { Link, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik, Field, Form, ErrorMessage } from "formik";
import Loader from '../../common/Loader';
import ApiService from '../../../core/services/ApiService';
import { api } from '../../../utils/api.utils';
import * as Yup from "yup";
import { toast } from 'react-hot-toast';


const CreatePages = () => {

    const [loading, setLoading] = useState(false);
    const [fullContent, setFullContent] = useState("");
    const [formError, setFormError] = useState(false);
    const navigate = useNavigate();

    const initialValue = {
        'title': "",
        'status': ""
    };

    const validateSchema = Yup.object().shape({
        title: Yup.string().required(`Title is required`),
        status: Yup.string().required(`Status is required`)
    });

    const addPages = async (formValue) => {
        if(fullContent.length===0){
           setFormError(true);
           return; 
        } else setFormError(false);
        setLoading(true);
        const data = {
            title: formValue.title,
            full_content: fullContent,
            status: formValue.status,
            post_type: 'page'
        }
        console.log("Create page form data => ",data);
        const response = await ApiService.postAPIWithAccessToken(api.CreatePage, data);
        console.log("Create pages => ", response.data.body);
        if (response.data.headers.success === 1) {
            toast.success('Page added successfully!');
            navigate('/pages');
        }
        setLoading(false);
    }

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="news-section">
                <div className="news-header">
                    <h5>Create Page</h5>
                    <div className="mr-auto">
                        <Link className="Back-btn" to="/pages"><i className="las la-arrow-left"></i> Back</Link>
                    </div>
                </div>

                <div className="news-create-form">
                    <Formik initialValues={initialValue} validateOnChange={true} validationSchema={validateSchema} onSubmit={addPages}>
                        <Form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Page Title</label>
                                        <Field type="text" className="form-control" name="title" placeholder="Title..." />
                                        <ErrorMessage name="title" component="div" className="alert alert-danger" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Page Status</label>
                                        <Field as="select" name="status" id="" className='form-control'>
                                            <option value="">Select status</option>
                                            <option value="1">Active</option>
                                            <option value="2">Inactive</option>
                                        </Field>
                                        <ErrorMessage name="status" component="div" className="alert alert-danger" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Description</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data=""
                                            onReady={editor => {
                                                // You can store the "editor" and use when it is needed.
                                                // console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setFullContent(data);
                                            }}
                                            onBlur={(event, editor) => {
                                                (fullContent.length===0) ? setFormError(true) : setFormError(false);
                                            }}
                                            onFocus={(event, editor) => {
                                                // console.log('Focus.', editor.getData());
                                            }}
                                        />
                                        {
                                            formError && (
                                                <div className='alert alert-danger'>Description is required</div>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Link to="/pages" className="Cancel-btn">Cancel</Link>
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

export default CreatePages