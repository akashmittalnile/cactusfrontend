import React, { useState } from 'react';
import "../../../assets/admin/css/news.css";
import { Link, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik, Field, Form, ErrorMessage } from "formik";
import Loader from '../../common/Loader';
import ApiService from '../../../core/services/ApiService';
import up from "../../../assets/images/admin/upload.png";
import { api } from '../../../utils/api.utils';
import * as Yup from "yup";
import { toast } from 'react-hot-toast';



const CreateNews = () => {

    const [loading, setLoading] = useState(false);
    const [fullContent, setFullContent] = useState("");
    const [formError, setFormError] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [file, setFile] = useState();
    const [image, setImage] = useState(up);
    const navigate = useNavigate();

    const initialValue = {
        'title': "",
        'short_content': "",
        'post_type': "news",
        'video_link': "",
        'status': "1",
    };

    const validateSchema = Yup.object().shape({
        title: Yup.string().required(`News headline is required`),
        short_content: Yup.string().required(`Short description is required`),
        video_link: Yup.string().required(`Video link is required`),
        status: Yup.string().required(`Status is required`),
    });

    const addNews = async (formValue) => {
        if (file === "" || file === null || !file) {
            setImgError(true);
            return;
        } else setImgError(false);
        if (fullContent.length === 0) {
            setFormError(true);
            return;
        } else setFormError(false);
        setLoading(true);
        let form = new FormData();
        form.append("file", file);
        form.append("title", formValue.title);
        form.append("short_content", formValue.short_content);
        form.append("full_content", fullContent);
        form.append("status", formValue.status);
        form.append("post_type", 'news');
        form.append("video_link", formValue.video_link);
        const response = await ApiService.postAPIWithAccessTokenMultiPart(api.CreateNews, form);
        // console.log(response);
        if (response.data.headers.success === 1) {
            toast.success('News added successfully!');
            navigate('/news');
        }
        setLoading(false);
    }

    const handleImgChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        if (!(e.target.files[0])) {
            setImgError(true);
        } else setImgError(false);
        setFile(e.target.files[0]);
    }

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="news-section">
                <div className="news-header">
                    <h5>Create News</h5>
                    <div className="mr-auto">
                        <Link className="Back-btn" to="/news"><i className="las la-arrow-left"></i> Back</Link>
                    </div>
                </div>

                <div className="news-create-form">
                    <Formik initialValues={initialValue} validateOnChange={true} validationSchema={validateSchema} onSubmit={addNews}>
                        <Form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>News Headline</label>
                                        <Field type="text" className="form-control" name="title" placeholder="News Headline" />
                                        <ErrorMessage name="title" component="div" className="alert alert-danger" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Video Link</label>
                                        <Field type="text" className="form-control" name="video_link" placeholder="Copy & Paste hyperlink here…" />
                                        <ErrorMessage name="video_link" component="div" className="alert alert-danger" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Short Description</label>
                                        <Field as="textarea" name="short_content" className="form-control" placeholder="Short Description"></Field>
                                        <ErrorMessage name="short_content" component="div" className="alert alert-danger" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Long Description</label>
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
                                                (fullContent.length === 0) ? setFormError(true) : setFormError(false);
                                            }}
                                            onFocus={(event, editor) => {
                                                // console.log('Focus.', editor.getData());
                                            }}
                                        />
                                        {
                                            formError && (
                                                <div className='alert alert-danger'>Long description is required</div>
                                            )
                                        }
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
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Status</label>
                                        <Field as="select" className="form-control" name="status" >
                                            <option value="1">Active</option>
                                            <option value="2">Inactive</option>
                                        </Field>
                                        <ErrorMessage name="status" component="div" className="alert alert-danger" />
                                    </div>
                                </div>


                                <div className="col-md-12">
                                    <div className="form-group">
                                        <button type="button" onClick={() => navigate(-1)} className="Cancel-btn">Cancel</button>
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

export default CreateNews