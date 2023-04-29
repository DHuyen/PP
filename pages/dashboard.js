import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";
import moment from 'moment'
import valid from "../utils/valid";
import { patchData } from "../utils/fetchData";

import { imageUpload } from "../utils/imageUpload";
import { Tab, Tabs } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js';
import BarChart from "../components/barChart/bar";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Profile = () => {
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
    const { auth, notify, orders } = state;

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
                text: 'Order Status Chart',
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
                label: `Order false: ${orders?.filter((item) => item?.paid === false ? item?.total : 0)?.length}`,
                data: orders?.map((item) => item?.paid === false ? item?.total : 0),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y',
            },
            {
                label: `Order success: ${orders?.filter((item) => item?.paid === true ? item?.total : 0)?.length}`,
                data: orders?.map((item) => item?.paid === true ? item?.total : 0),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1',
            }
        ],
    };

    // Bar chart
    const dataPrice = orders?.filter((item) => item?.paid === true)
    const sumDataPrice = dataPrice?.map((item) => {
        const sumItem = item?.cart?.map((values) => values?.price * values?.quantity)
        return sumItem[0]
    })
    const labelsBar = dataPrice?.map((item) => new Date(item?.createdAt).toLocaleDateString());

    if (!auth.user) return null;

    return (
        <div className="profile_page">
            <Head>
                <title>Dashboard</title>
            </Head>
            <section className="row text-secondary my-3">
                <div className="col-md-12"><br></br><br></br>
                    <h1 class="text-center font-weight-bold">Orders Dashboard</h1>
                </div>
            </section>

            <section className="row text-secondary my-3">
                <div className="col-md-12">
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
                            <div className="mt-4"/>
                            <BarChart _options={sumDataPrice} _data={labelsBar} />
                        </Tab>
                    </Tabs>
                </div>
            </section>
        </div>
    );
};

export default Profile;
