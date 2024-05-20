import React, { useState, useEffect } from "react";
import axios from "axios";
import './zalecenia.css'

const Zalecenia = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // Pobierz zalecenia
        axios.get('http://localhost:8080/api/v1/recommendations/getAllRec')
            .then(response => {
                setRecommendations(response.data);
            })
            .catch(error => {
                console.log('Błąd podczas pobierania zaleceń:', error);
            });

        // Pobierz pacjentów
        axios.get('http://localhost:8080/api/v1/patients/getAll')
            .then(response => {
                console.log('Pobrane dane pacjentów:', response.data);
                if (Array.isArray(response.data)) {
                    setPatients(response.data);
                } else {
                    console.error('Dane pacjentów nie są tablicą:', response.data);
                }
            })
            .catch(error => {
                console.log('Błąd podczas pobierania danych pacjentów:', error);
            });
    }, []);

    //Dodaj zalecenie
    const addRecommendation = (event) => {
        event.preventDefault();
        const recommendation = event.target.recommendation.value;
        const patientId = event.target.patientId.value;
        axios.post('http://localhost:8080/api/v1/recommendations/create', {
            recommendation,
            patientId
        })
            .then(response => {
                console.log('Dodano zalecenie:', response.data);
                setRecommendations([...recommendations, response.data]);
            })
            .catch(error => {
                console.log('Błąd podczas dodawania zalecenia:', error);
            });
    };

    //pobierz pacjenta po surname


    const getPatientName = (patientId) => {
        const patient = patients.find(p => p.id === patientId);
        return patient ? `${patient.name} ${patient.surname}` : 'Nieznany pacjent';
    }

    const getPatientBySurname = (surname) => {
        axios.get(`http://localhost:8080/api/v1/patients/getPatientBySurname/${surname}`)
            .then(response => {
                console.log('Pobrane dane pacjenta:', response.data);
                // Tutaj możesz zrobić coś z danymi pacjenta
            })
            .catch(error => {
                console.log('Błąd podczas pobierania danych pacjenta:', error);
            });
    }
    return (
        <div className="Zalecenia">
            <h1>Zalecenia</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Zalecenia</th>
                        <th>Pacjent</th>
                    </tr>
                </thead>
                <tbody>
                    {recommendations.map(recommendation => (
                        <tr key={recommendation.id}>
                            <td>{recommendation.id}</td>
                            <td>{recommendation.recommendation}</td>
                            <td>{getPatientName(recommendation.patientId)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form onSubmit={addRecommendation}>
                <label>
                    Zalecenie:

                    <input type="text" name="recommendation" />

                </label>
<label>
    Pacjent:
    <select name="patientId" onChange={event => getPatientBySurname(event.target.value)}>
        {patients.map(patient => (
            <option key={patient.surname} value={patient.surname}>
                {patient.surname}
            </option>
        ))}
    </select>
</label>
                <button type="submit">Dodaj zalecenie</button>
            </form>
        </div>
    );
};

export default Zalecenia;
