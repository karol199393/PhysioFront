import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function ProgressChart() {
    const [data, setData] = useState(null);

    const patientId = 1;

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/courseOfTreatment/patient/${patientId}`)
            .then(response => response.json())
            .then(data => {
                const chartData = {
                    labels: data.map(item => new Date(item.startDate)),
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

    useEffect(() => {
        const newCourseOfTreatment = {
            name: "New Course",
            stuff: { id: 1 },
            patient: { id: 1 },
            description: "New course description",
            startDate: "2022-01-01",
            endDate: "2022-12-31",
            progressRating: 5,
            muscleStrength: 5.0,
            endurance: 5.0,
            visitNotes: "First visit notes"
        };

        fetch(`http://localhost:8080/api/v1/courseOfTreatment/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCourseOfTreatment)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log('There was a problem with the fetch operation: ' + error.message);
            });
    }, []);

    return (
        <div>
            <h2>Progress Chart</h2>
            {data && <Line data={data} />}
        </div>
    );
}

export default ProgressChart;