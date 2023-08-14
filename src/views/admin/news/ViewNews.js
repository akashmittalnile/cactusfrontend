import React, { useState, useEffect } from 'react';
import "../../../assets/admin/css/news.css";
import { htmlToText } from 'html-to-text';
import { Link, useParams, useNavigate } from 'react-router-dom';
import s1 from "../../../assets/images/admin/s1.webp";
import ApiService from '../../../core/services/ApiService';
import Loader from '../../common/Loader';
import { api } from '../../../utils/api.utils';
import { decode, encode } from 'base-64';

const ViewNews = () => {

    const navigate = useNavigate();
    const [news, setNews] = useState({});
    const [loading, setLoading] = useState(false);
    const [fullContent, setFullContent] = useState("");
    const { id } = useParams();

    const getNewsDetails = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("News details => ", response.data.body);
        if (response.data.headers.success === 1) {
            setNews(response.data.body);
            // if (response.data.body.media && response.data.body.media !== undefined && response.data.body.media !== "") {
            //     setImage(response.data.body.media);
            // }
            setFullContent(response.data.body.full_content)
        } else setNews({});
        setLoading(false);
    }

    useEffect(() => {
        getNewsDetails(api.NewsDetails + `${decode(id)}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="news-section">
                <div className="news-header">
                    <h5>View News</h5>
                    <div className="mr-auto">
                        <Link className="Back-btn" to="/news"><i className="las la-arrow-left"></i> Back</Link>
                    </div>
                </div>

                <div className="news-create-form">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="news-edit-card">
                                <div className="news-edit-heading">{news.title ?? "NA"}</div>
                                <div className="news-edit-descr">{news.short_content}</div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="news-edit-card">
                                <div className="news-edit-heading">Description</div>
                                <div className="news-edit-descr">
                                    <p>{htmlToText(fullContent ?? "NA")}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="news-edit-card">
                                <div className="news-edit-heading">Upload Media</div>
                                <div className="news-edit-descr">
                                    <div className="UploadMedia-info">
                                        <img src={(news.media && news.media !== undefined && news.media !== "") ? news.media : s1} alt="not-found" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="news-edit-card">
                                <div className="news-edit-heading">Video Link</div>
                                <div className="news-edit-descr">
                                    <div className="link-info">
                                        <Link target='_blank' to={news.video_link}>{news.video_link}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-md-12">
                            <div className="form-group">
                                <button type="submit" onClick={() => navigate(-1)} className="Cancel-btn">Cancel</button>
                                <button type="submit" onClick={() => navigate(`/edit-news/${encode(news.id)}`)} className="Create-btn mx-2">Edit</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewNews