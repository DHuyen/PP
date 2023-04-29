import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import valid from "../utils/valid";
import { patchData } from "../utils/fetchData";
import { imageUpload } from "../utils/imageUpload";
import Head from "next/head";
import Link from "next/link";
import { Tab, Tabs } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import moment from 'moment'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Infor = () => {
    const initialSate = {
        avatar: "",
        name: "",
        password: "",
        cf_password: "",
    };
    const [data, setData] = useState(initialSate);
    const { avatar, name, password, cf_password } = data;
    const [tabKey, initTabKey] = useState("one");

    const { state, dispatch } = useContext(DataContext);
    const { auth, notify, orders, cart } = state;
    console.log(state, 'state')
    useEffect(() => {
        if (auth.user) setData({ ...data, name: auth.user.name });
    }, [auth.user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        dispatch({ type: "NOTIFY", payload: {} });
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        if (password) {
            const errMsg = valid(name, auth.user.email, password, cf_password);
            if (errMsg)
                return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
            updatePassword();
        }

        if (name !== auth.user.name || avatar) updateInfor();
    };

    const updatePassword = () => {
        dispatch({ type: "NOTIFY", payload: { loading: true } });
        patchData("user/resetPassword", { password }, auth.token).then((res) => {
            if (res.err)
                return dispatch({ type: "NOTIFY", payload: { error: res.err } });
            return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
        });
    };

    const changeAvatar = (e) => {
        const file = e.target.files[0];
        if (!file)
            return dispatch({
                type: "NOTIFY",
                payload: { error: "The file does not exist." },
            });

        if (file.size > 1024 * 1024)
            //1mb
            return dispatch({
                type: "NOTIFY",
                payload: { error: "The maximum image size is 1 MB." },
            });

        if (file.type !== "image/jpeg" && file.type !== "image/png")
            //1mb
            return dispatch({
                type: "NOTIFY",
                payload: { error: "The image format is incorrect." },
            });

        setData({ ...data, avatar: file });
    };

    const updateInfor = async () => {
        let media;
        dispatch({ type: "NOTIFY", payload: { loading: true } });

        if (avatar) media = await imageUpload([avatar]);

        patchData(
            "user",
            {
                name,
                avatar: avatar ? media[0].url : auth.user.avatar,
            },
            auth.token
        ).then((res) => {
            if (res.err)
                return dispatch({ type: "NOTIFY", payload: { error: res.err } });

            dispatch({
                type: "AUTH",
                payload: {
                    token: auth.token,
                    user: res.user,
                },
            });
            return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
        });
    };
    const newConvertUrl = orders?.map((item) => item?.cart[0]?.images[0]?.url)
    console.log(Object?.values(newConvertUrl)[0], '123321')

    //chart&table

    const options = {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Line Chart - Multi Axis',
          },
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      };
    
      const labels = orders?.map((item) => new Date(item?.createdAt).toLocaleDateString());
    
      const dataChart = {
        labels,
        datasets: [
          {
            label: 'All Order',
            data: orders?.map((item) => item?.total),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',
          },
          {
            label: 'Success Order',
            data: orders?.map((item) => item?.paid === true ? item?.total : 0),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'y1',
          },
        ],
      };
    
      if (!auth.user) return null;

    // if (!auth.user) return null;
    return (
        <section class="profile_page_infor h-100 gradient-custom-2">
            <div class="rounded-top text-white d-flex flex-row background_img">
                <div className="avatars">
                    <img
                        src={avatar ? URL.createObjectURL(avatar) : auth?.user?.avatar}
                        alt="avatars"
                        class="w-100 rounded-3"
                    />
                    <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input
                            name="file"
                            id="file_up"
                            accept="image/*"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                        />
                    </span>
                </div>
            </div>

            <span data-toggle="modal" data-target="#exampleModalCenter" />

            {/* Popup update */}
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Update profile</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body profile_page_infors">
                            <div className="col-md-12">
                                <h3 className="text-center text-uppercase">
                                    {auth?.user?.role === "User" ? "User profile" : "Admin profile"}
                                </h3>

                                <div className="avatars_modal">
                                    <img
                                        src={avatar ? URL.createObjectURL(avatar) : auth?.user?.avatar}
                                        alt="avatars_modal"
                                    />
                                    <span>
                                        <i className="fas fa-camera"></i>
                                        <p>Change</p>
                                        <input
                                            type="file"
                                            name="file"
                                            id="file_up"
                                            accept="image/*"
                                            onChange={changeAvatar}
                                        />
                                    </span>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        className="form-control"
                                        placeholder="Your name"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        defaultValue={auth?.user?.email}
                                        className="form-control"
                                        disabled={true}
                                    />
                                </div>

                                <div className="form-group">
            <label htmlFor="role">Account type</label>
            <input
              type="text"
              name="role"
              defaultValue={auth.user.role}
              className="form-control"
              disabled={true}
            />
          </div>

                                <div className="form-group">
                                    <label htmlFor="password">New password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        className="form-control"
                                        placeholder="Your new password"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cf_password">Confirm new password</label>
                                    <input
                                        type="password"
                                        name="cf_password"
                                        value={cf_password}
                                        className="form-control"
                                        placeholder="Confirm new password"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" >Cancel</button>
                            <button type="button" class="btn btn-primary" disabled={notify.loading} onClick={handleUpdateProfile}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col col-lg-9 col-xl-12">
                        <div class="card">
                            <div class="p-4 text-black bg-light">
                                <div class="d-flex justify-content-end text-center py-1">
                                    <div>
                                        <p class="mb-1 h5">{orders?.length}</p>
                                        <p class="small text-muted mb-0">Total</p>
                                    </div>
                                    <div class="px-3">
                                        <p class="mb-1 h5">{orders?.filter((item) => item?.paid === true)?.length}</p>
                                        <p class="small text-muted mb-0">Successfully</p>
                                    </div>
                                    <div>
                                        <p class="mb-1 h5">{orders?.filter((item) => item?.paid === false)?.length}</p>
                                        <p class="small text-muted mb-0">Failed</p>
                                    </div>
                                    {
                                        auth?.user?.role !== "admin" ?
                                            <div class="px-5">
                                                <p class="mb-1 h5">{cart?.length}</p>
                                                <p class="small text-muted mb-0">Cart</p>
                                            </div>
                                            : <></>
                                    }
                                </div>
                            </div>
                            <div class="card-body p-4 text-black">
                                <div class="mb-5">
                                    <u class="lead fw-normal mb-1 font-weight-bold">Details about my account:</u>
                                    <div class="p-4 bg-light">
                                        <p class="font-nomal mb-1">Name: {auth?.user?.name}</p>
                                        <p class="font-nomal mb-1">Email: {auth?.user?.email}</p>
                                        <p class="font-nomal mb-0">Account type: {auth?.user?.role}</p>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center mb-4">
                                    <p class="lead fw-normal mb-0">Recent order</p>
                                    <p class="mb-0">
                                        <a href="#!" class="text-muted">
                                            Show all
                                        </a>
                                    </p>
                                </div>
                                <div class="row g-2">
                                    {orders && orders?.length > 0 && orders?.map((item, index) => {
                                        return(
                                            <div class="col mb-2">
                                                <img
                                                    src={Object?.values(newConvertUrl)[index]}
                                                    alt="image 1"
                                                    class="w-100 rounded-3"
                                                />
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
          <Tabs activeKey={tabKey} onSelect={(e) => initTabKey(e)}>
            <Tab eventKey="one" title="Table">
              <div className="my-3 table-responsive">
                <table
                  className="table-bordered table-hover w-100 text-uppercase"
                  style={{ minWidth: "600px", cursor: "pointer" }}
                >
                  <thead className="bg-light font-weight-bold">
                    <tr>
                      <td className="p-2">no.</td>
                      <td className="p-2">id</td>
                      <td className="p-2">name</td>
                      <td className="p-2">date</td>
                      <td className="p-2">total</td>
                      <td className="p-2">address</td>
                      <td className="p-2">delivered</td>
                      <td className="p-2">paid</td>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order, idx) => (
                      <tr key={order._id}>
                        <td className="p-2">
                            <a>{idx}</a>
                        </td>
                        <td className="p-2">
                          <Link href={`/order/${order._id}`}>
                            <a>{order._id}</a>
                          </Link>
                        </td>

                        {/* Display for case admin */}
                        <td className="p-2">
                           {order?.user?.name}
                        </td>

                        <td className="p-2">
                        {moment(order.createdAt).format('DD/MM/YY hh:mm:ss')}
                        </td>
                        <td className="p-2">${order.total}</td>
                        <td className="p-2">{order.address}</td>
                        <td className="p-2">
                          {order.delivered ? (
                            <i className="fas fa-check text-success"></i>
                          ) : (
                            <i className="fas fa-times text-danger"></i>
                          )}
                        </td>
                        <td className="p-2">
                          {order.paid ? (
                            <i className="fas fa-check text-success"></i>
                          ) : (
                            <i className="fas fa-times text-danger"></i>
                          )}
                        </td>
                      </tr>
                    )).reverse()}
                    {/* sort for dashboard */}
                  </tbody>
                </table>
              </div>
            </Tab>
            <Tab eventKey="two" title="Chart">
              <Line options={options} data={dataChart} />
            </Tab>
          </Tabs>
        </div>
        </section>
    );
};

export default Infor;
