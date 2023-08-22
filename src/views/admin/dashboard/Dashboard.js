import React, { useEffect, useState } from 'react';
import "../../../assets/admin/css/dasboard.css";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, PieChart, Pie, Label, Cell, BarChart, Bar } from 'recharts';
import ApiService from '../../../core/services/ApiService';
import user from "../../../assets/images/admin/user-large.svg";
import manage from "../../../assets/images/admin/manager-large.svg";
import club from "../../../assets/images/admin/clubs-large.svg";
import crate from "../../../assets/images/admin/crates-large.svg";
import Loader from "../../common/Loader";
import { api } from '../../../utils/api.utils';
import { userStatus } from '../../../utils/status.utils';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Modal, ModalBody } from "reactstrap";
import { toast } from 'react-hot-toast';
import deleteImg from "../../../assets/images/admin/delete-news.svg";
import u1 from "../../../assets/images/admin/u1.png";
import u2 from "../../../assets/images/admin/u2.png";
import u3 from "../../../assets/images/admin/u3.png";
import { encode } from 'base-64';
import john from "../../../assets/images/admin/john-doe.png";
import john1 from "../../../assets/images/admin/john-doe1.png";
import lsexp from "../../../assets/images/admin/leadershipexperience.svg";
import credit from "../../../assets/images/admin/credit.svg";
import debit from "../../../assets/images/admin/debit.svg";

const data2 = [
    {
        name: 'Page A',
        uv: 6000,
        pv: 2400,
        amt: 4000,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 8210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 7290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 5000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 4181,
    },
    {
        name: 'Page F',
        uv: 7390,
        pv: 3800,
        amt: 3500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 2300,
        amt: 1100,
    },
];
const data01 = [{ name: 'Group A', value: 5, color: "Green" }, { name: 'Group B', value: 4, color: "Red" },
{ name: 'Group C', value: 1, color: "Blue" }, { name: 'Group D', value: 1, color: "yellow" }];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {

    const [dashboard, setDashboard] = useState({});
    const [users, setUser] = useState([]);
    const [managers, setManager] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userClubs, setUserClub] = useState([]);
    const [managerClubs, setManagerClub] = useState([]);
    const [isDelete, setDelete] = useState({ status: false, id: "", statusNumber: "", title: "" });
    const [data1, setData1] = useState([]);
    const [creditDebit, setCreditDebit] = useState({ total_credit: 0, user_club_credit: 0, manager_club_credit: 0, total_debit: 0, user_club_debit: 0, manager_club_debit: 0 });

    const getDashboardData = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        console.log("dashboard => ", response.data.body);
        if (response.data.headers.success === 1) {
            setDashboard(response.data.body);
            setUserClub(response.data.body.userClub);
            setManagerClub(response.data.body.managerClub);
            setData1(response.data.body.graph);
            let total_credit = 0, total_debit = 0, user_total_debit = 0, user_total_credit = 0, manager_total_debit = 0, manager_total_credit = 0;
            if (response.data.body.graph.length > 0) {
                (response.data.body.graph).map((ele) => {
                    total_debit += ele.total_debit;
                    total_credit += ele.total_credit;
                    user_total_credit += ele.User_club_total_credit;
                    user_total_debit += ele.User_club_total_debit;
                    manager_total_credit += ele.manager_club_total_credit;
                    manager_total_debit += ele.manager_club_total_debit;
                });
            }
            setCreditDebit({ total_credit: total_credit, user_club_credit: user_total_credit, manager_club_credit: manager_total_credit, total_debit: total_debit, user_club_debit: user_total_debit, manager_club_debit: manager_total_debit });
        }
        else setDashboard({});
        setLoading(false);
    }

    const getUserList = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        // console.log("approved users list => ", response.data.body);
        if (response.data.headers.success === 1) setUser(response.data.body.listing);
        else setUser([]);
        setLoading(false);
    }

    const getManagerList = async (api) => {
        setLoading(true);
        const response = await ApiService.getAPIWithAccessToken(api);
        // console.log("all managers list => ", response.data.body);
        if (response.data.headers.success === 1) setManager(response.data.body.listing);
        else setManager([]);
        setLoading(false);
    }

    const handleChangeStatus = async (id, status) => {
        setLoading(true);
        let data = {
            status
        };
        const response = await ApiService.putAPIWithAccessToken(api.UserStatusChange + `${id}`, data);
        if (response.data.headers.success === 1) { toast.success('Status changed!'); getUserList(api.AllUser + `?status=1`); }
        setDelete({ status: false, id: "", statusNumber: "", title: "" });
        setLoading(false);
    }

    useEffect(() => {
        getDashboardData(api.Dashboard);
        getUserList(api.AllUser + `?status=1`);
        getManagerList(api.AllManager + `?status=1`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? <Loader /> : null}
            <div className="overview-section">
                <div className="row">
                    <div className="col-md-3">
                        <div className="overview-item gr-overview">
                            <Link to="/users">
                                <div className="overview-overlay-media">
                                    <img src={user} alt="not-found" />
                                </div>
                                <div className="overview-item-content">
                                    <div className="overview-tag-info">Clients</div>
                                    <p>Total Users</p>
                                    <h2>{dashboard.total_user}</h2>
                                </div>
                            </Link>

                            {/* <div className="overview-chart">
                                <div id="NewCustomers">
                                    <LineChart width={320} height={100} data={data1} margin={{ top: 5, right: 20, left: 10, bottom: 5 }} >
                                        <Tooltip />
                                        <Line type="monotone" dataKey="amt" stroke="#20f16c" strokeWidth={4} dot={false} />
                                    </LineChart>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="overview-item re-overview">
                            <div className="overview-item-content">
                                <Link to="/manager">
                                    <div className="overview-overlay-media">
                                        <img src={manage} alt="not-found" />
                                    </div>
                                    <div className="overview-tag-info">Clubs Managers</div>
                                    <p>Total Managers</p>
                                    <h2>{dashboard.total_manager}</h2>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="overview-item or-overview">
                            <Link to="/clubs">
                                <div className="overview-overlay-media">
                                    <img src={club} alt="not-found" />
                                </div>
                                <div className="overview-item-content">
                                    <div className="overview-tag-info">Clubs</div>
                                    <p>Total Clubs</p>
                                    <h2>{dashboard.total_club}</h2>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="overview-item bl-overview">
                            <Link to="/cactus-crates">
                                <div className="overview-overlay-media">
                                    <img src={crate} alt="not-found" />
                                </div>
                                <div className="overview-item-content">
                                    <div className="overview-tag-info">Crates</div>
                                    <p>Total Cactus Crates</p>
                                    <h2>{dashboard.crates}</h2>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="user-content-section mt-4">
                    <div className="user-table-card">
                        <div className='row'>
                            <div className="col-md-6">
                                <div className="manager-overview-card">
                                    <div className="manager-overview-card-content">
                                        <p>Total credit amount</p>
                                        <h3>{creditDebit.total_credit ?? 0}</h3>
                                    </div>
                                    <div className="manager-overview-card-icon">
                                        <img src={credit} alt="not-found" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="manager-overview-card">
                                    <div className="manager-overview-card-content">
                                        <p>Total debit amount</p>
                                        <h3>{creditDebit.total_debit ?? 0}</h3>
                                    </div>
                                    <div className="manager-overview-card-icon">
                                        <img src={debit} alt="not-found" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <AreaChart width={1200} height={250} data={data1}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00EE57" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#00EE57" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ff0a32" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#ff0a32" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" name='Month' />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="monotone" name='Total Credit' dataKey="total_credit" stroke="#00EE57" fillOpacity={1} fill="url(#colorUv)" />
                            <Area type="monotone" name='Total Debit' dataKey="total_debit" stroke="#ff0a32" fillOpacity={1} fill="url(#colorPv)" />
                        </AreaChart>
                    </div>
                </div>

                <div className="row">
                    <div className="user-content-section mt-4 w-50">
                        <div className="user-table-card">
                            <div className='row'>
                                <div className="col-md-6">
                                    <div className="manager-overview-card">
                                        <div className="manager-overview-card-content">
                                            <p>Total credit amount in cactus clubs</p>
                                            <h3>{creditDebit.user_club_credit ?? 0}</h3>
                                        </div>
                                        <div className="manager-overview-card-icon">
                                            <img src={credit} alt="not-found" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="manager-overview-card">
                                        <div className="manager-overview-card-content">
                                            <p>Total debit amount in cactus clubs</p>
                                            <h3>{creditDebit.user_club_debit ?? 0}</h3>
                                        </div>
                                        <div className="manager-overview-card-icon">
                                            <img src={debit} alt="not-found" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <BarChart width={550} height={250} data={data1}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis  dataKey="month" name='Month' />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar name='User club total credit' dataKey="User_club_total_credit" fill="#00EE57" />
                                <Bar name='User club total debit' dataKey="User_club_total_debit" fill="#ff0a32" />
                            </BarChart>
                        </div>
                    </div>

                    <div className="user-content-section mt-4 w-50">
                        <div className="user-table-card">
                            <div className='row'>
                                <div className="col-md-6">
                                    <div className="manager-overview-card">
                                        <div className="manager-overview-card-content">
                                            <p>Total credit amount in manager clubs</p>
                                            <h3>{creditDebit.manager_club_credit ?? 0}</h3>
                                        </div>
                                        <div className="manager-overview-card-icon">
                                            <img src={credit} alt="not-found" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="manager-overview-card">
                                        <div className="manager-overview-card-content">
                                            <p>Total debit amount in manager clubs</p>
                                            <h3>{creditDebit.manager_club_debit ?? 0}</h3>
                                        </div>
                                        <div className="manager-overview-card-icon">
                                            <img src={debit} alt="not-found" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <BarChart width={550} height={250} data={data1}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis  dataKey="month" name='Month' />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar name='Manager club total credit' dataKey="manager_club_total_credit" fill="#00EE57" />
                                <Bar name='Manager club total debit' dataKey="manager_club_total_debit" fill="#ff0a32" />
                            </BarChart>
                        </div>
                    </div>
                </div>

                <div className="user-content-section mt-4">
                    <div className="user-table-card">
                        <div className="overview-tag-info">Recent Users</div>
                        <div className="table-responsive mt-2" style={{ maxHeight: "36vh", minHeight: "12vh" }}>
                            <table className="table table-users">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Profile Image</th>
                                        <th>Name</th>
                                        <th>Email ID</th>
                                        <th>Date of Birth</th>
                                        <th>Contact Number </th>
                                        <th>Address</th>
                                        <th>Approval Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.length !== 0 ?
                                            (
                                                users.map((ele, indx) => {
                                                    return (
                                                        <tr key={indx}>
                                                            <td>
                                                                <span className="sno">{indx + 1}</span>
                                                            </td>

                                                            <td>
                                                                {
                                                                    (ele.image_url === "" || ele.image_url === null || ele.image_url === undefined) ? (
                                                                        <div className="side-profile-media" style={{ width: "50px", height: "50px" }}><img src={john} alt="not-found" /></div>
                                                                    ) :
                                                                        (
                                                                            <div className="side-profile-media" style={{ width: "50px", height: "50px" }}><img src={ele.image_url} alt="not-found" /></div>
                                                                        )
                                                                }
                                                            </td>

                                                            <td>
                                                                <div className="user-table-info text-capitalize">
                                                                    <div className="user-table-value">
                                                                        <h2>{ele.first_name + ' ' + ele.last_name}</h2>
                                                                        <div className={ele.status === "2" ? "user-status-text st-active" : "user-status-text st-inactive"}>
                                                                            {userStatus(ele.status)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                {ele.emailid}
                                                            </td>

                                                            <td>
                                                                {moment(ele.DOB).format('MMMM Do, YYYY')}
                                                            </td>

                                                            <td>
                                                                {ele.phone_number}
                                                            </td>

                                                            <td>
                                                                {ele.Address ?? "NA"}
                                                            </td>

                                                            <td>
                                                                <div className="approve-text">
                                                                    <Link className="reject-btn mx-1" onClick={() => setDelete({ status: true, id: ele.id, statusNumber: 4, title: "user" })} href="">Reject</Link>
                                                                    <Link className="approve-btn" onClick={() => handleChangeStatus(ele.id, 2)} href="">Approve</Link>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    )
                                                })
                                            )
                                            :
                                            (
                                                <tr className='text-center'>
                                                    <td colSpan="9">No users found</td>
                                                </tr>
                                            )
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                <div className="user-content-section mt-4">
                    <div className="user-table-card">
                        <div className="overview-tag-info" style={{ background: "#ff0a32" }}>Recent Managers</div>
                        <div className="table-responsive mt-2" style={{ maxHeight: "36vh", minHeight: "12vh" }}>
                            <table className="table table-users">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Profile Image</th>
                                        <th>Name</th>
                                        <th>Email ID</th>
                                        <th>Date of Birth</th>
                                        <th>Contact Number </th>
                                        <th>Address</th>
                                        <th>Approval Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        managers.length !== 0 ?
                                            (
                                                managers.map((ele, indx) => {
                                                    return (
                                                        <tr key={indx}>
                                                            <td>
                                                                <span className="sno">{indx + 1}</span>
                                                            </td>

                                                            <td>
                                                                {
                                                                    (ele.image_url === "" || ele.image_url === null || ele.image_url === undefined) ? (
                                                                        <div className="side-profile-media" style={{ width: "50px", height: "50px" }}><img src={john1} alt="not-found" /></div>
                                                                    ) :
                                                                        (
                                                                            <div className="side-profile-media" style={{ width: "50px", height: "50px" }}><img src={ele.image_url} alt="not-found" /></div>
                                                                        )
                                                                }
                                                            </td>

                                                            <td>
                                                                <div className="user-table-info text-capitalize">
                                                                    <div className="user-table-value">
                                                                        <h2>{ele.first_name + ' ' + ele.last_name}</h2>
                                                                        <div className={ele.status === "2" ? "user-status-text st-active" : "user-status-text st-inactive"}>
                                                                            {userStatus(ele.status)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                {ele.emailid}
                                                            </td>

                                                            <td>
                                                                {moment(ele.DOB).format('MMMM Do, YYYY')}
                                                            </td>

                                                            <td>
                                                                {ele.phone_number}
                                                            </td>

                                                            <td>
                                                                {ele.Address ?? "NA"}
                                                            </td>

                                                            <td>
                                                                <div className="approve-text">
                                                                    <Link className="reject-btn mx-1" onClick={() => setDelete({ status: true, id: ele.id, statusNumber: 4, title: "manager" })} href="">Reject</Link>
                                                                    <Link className="approve-btn" onClick={() => handleChangeStatus(ele.id, 2)} href="">Approve</Link>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    )
                                                })
                                            )
                                            :
                                            (
                                                <tr className='text-center'>
                                                    <td colSpan="9">No managers found</td>
                                                </tr>
                                            )
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                <div className='row'>
                    <div className="user-content-section mt-4 w-50">
                        <div className="user-table-card">
                            <div className="overview-tag-info" style={{ background: "#ffc107" }}>Manager Clubs</div>
                            <div className="table-responsive mt-2" style={{ maxHeight: "36vh", minHeight: "12vh" }}>
                                <table className="table table-users">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Club Image</th>
                                            <th>Club Name</th>
                                            <th>Member</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            managerClubs.length !== 0 ?
                                                (
                                                    managerClubs.map((ele, indx) => {
                                                        return (
                                                            <tr key={indx}>
                                                                <td>
                                                                    <span className="sno">{indx + 1}</span>
                                                                </td>

                                                                <td>
                                                                    <div className="clubs-card-image">
                                                                        {
                                                                            (ele.image_url === "" || ele.image_url === null || ele.image_url === undefined) ? (
                                                                                <>
                                                                                    <div className="userImg"><img alt="not-found" src={u1} /></div>
                                                                                    <div className="userImg"><img alt="not-found" src={u2} /></div>
                                                                                    <div className="userImg"><img alt="not-found" src={u3} /></div>
                                                                                </>
                                                                            )
                                                                                :
                                                                                (
                                                                                    <div className="userImg"><img alt="not-found-image" src={ele.image_url} /></div>
                                                                                )
                                                                        }
                                                                    </div>
                                                                </td>

                                                                <td className='text-capitalize'>
                                                                    {ele.name ?? "NA"}
                                                                </td>

                                                                <td>
                                                                    {ele.total_member ?? 0}
                                                                </td>

                                                                <td>
                                                                    <div className="clubs-card-action" style={{ display: "contents" }}>
                                                                        <Link to={`/club-details/${encode(ele.id)}/${encode('manager')}`}>View</Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                                :
                                                (
                                                    <tr className='text-center'>
                                                        <td colSpan="9">No managers club found</td>
                                                    </tr>
                                                )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="user-content-section mt-4 w-50">
                        <div className="user-table-card">
                            <div className="overview-tag-info" style={{ background: "#ffc107" }}>Cactus Clubs</div>
                            <div className="table-responsive mt-2" style={{ maxHeight: "36vh", minHeight: "12vh" }}>
                                <table className="table table-users">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Club Image</th>
                                            <th>Club Name</th>
                                            <th>Member</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userClubs.length !== 0 ?
                                                (
                                                    userClubs.map((ele, indx) => {
                                                        return (
                                                            <tr key={indx}>
                                                                <td>
                                                                    <span className="sno">{indx + 1}</span>
                                                                </td>

                                                                <td>
                                                                    <div className="clubs-card-image">
                                                                        {
                                                                            (ele.image_url === "" || ele.image_url === null || ele.image_url === undefined) ? (
                                                                                <>
                                                                                    <div className="userImg"><img alt="not-found" src={u1} /></div>
                                                                                    <div className="userImg"><img alt="not-found" src={u2} /></div>
                                                                                    <div className="userImg"><img alt="not-found" src={u3} /></div>
                                                                                </>
                                                                            )
                                                                                :
                                                                                (
                                                                                    <div className="userImg"><img alt="not-found-image" src={ele.image_url} /></div>
                                                                                )
                                                                        }
                                                                    </div>
                                                                </td>

                                                                <td className='text-capitalize'>
                                                                    {ele.name ?? "NA"}
                                                                </td>

                                                                <td>
                                                                    {ele.total_member ?? 0}
                                                                </td>

                                                                <td>
                                                                    <div className="clubs-card-action" style={{ display: "contents" }}>
                                                                        <Link to={`/club-details/${encode(ele.id)}/${encode('user')}`}>View</Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                                :
                                                (
                                                    <tr className='text-center'>
                                                        <td colSpan="9">No cactus club found</td>
                                                    </tr>
                                                )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                <Modal isOpen={isDelete.status} toggle={() => { setDelete({ status: false, id: "", statusNumber: "", title: "" }); }} className="njmep-modal">
                    <div className="modal-content">
                        <ModalBody className='modal-body'>
                            <div className="deletenews-form-info">
                                <button
                                    type="button"
                                    onClick={() => { setDelete({ status: false, id: "", statusNumber: "", title: "" }); }}
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                >
                                </button>
                                <div className="deletenews-media">
                                    <img src={deleteImg} alt="not found" />
                                </div>
                                <h3>Are you sure want to reject this {isDelete.title} ?</h3>
                                <div className="deletenews-action">
                                    <Link className="no-btn mx-2" onClick={() => { setDelete({ status: false, id: "", statusNumber: "", title: "" }); }} to="">No</Link>
                                    <Link className="yes-btn" onClick={() => handleChangeStatus(isDelete.id, isDelete.statusNumber)} to="">Yes</Link>
                                </div>
                            </div>
                        </ModalBody>
                    </div>
                </Modal>

            </div>
        </>
    )
}

export default Dashboard