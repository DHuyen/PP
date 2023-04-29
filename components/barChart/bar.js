import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js';
import { Bar } from "react-chartjs-2"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



const BarChart = ({ _options, _data }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Price Chart',
            },
        },
    };

    const labels = _data;

    const data = {
        labels,
        datasets: [
            {
                label: `Total price: ${_options?.reduce((i1, i2) => i1 + i2)}`,
                data: _options,
                backgroundColor: 'rgba(5, 131, 64, 0.8)',
            },
        ],
    };
    return (
        <Bar options={options} data={data} />
    )
}

export default BarChart