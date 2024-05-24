import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'

  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

function ProgressChart() {
    const [data, setData] = useState([{}]);

    useEffect(() => {
        const patientId = 1;
        fetch(`http://localhost:8080/api/v1/courseOfTreatment/patient/${patientId}`)
            .then(response => {
                console.log('Response from API:', response);
                return response.json();
            })
            .then(data => {
                console.log('Data from API:', data);

            

                const chartData = {
                    labels: data.map(item =>(item.startDate)),
                    datasets: [{
                        label: 'Progress Rating',
                        data: data.map(item => item.progressRating),
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                };
                setData(chartData);
            });

    }, []);



    return (
        <div>
            <h2>Przebieg leczenia</h2>
            {data && data.datasets && data.datasets.length > 0 && <Line data={data} />}
            <h2>Przebieg leczenia</h2>
            {data && data.datasets && data.datasets.length > 0 && <Line data={data} />}
        </div>
    );
}

export default ProgressChart;