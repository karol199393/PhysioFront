import React, { useState, useEffect } from "react";
import axios from "axios";
import './zalecenia.css';

const Zalecenia = () => {
    const [recommendations, setRecommentadions] = useState([]);
    



    useEffect(() => {
        fetch('http://localhost:8080/api/v1/getAllRecommendations')
        .then(response => response.json())
        .then(data => setRecommentadions(data))
        .catch(error => console.error('Error:', error));
}, []);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/createRecommendations')
            .then(response => {
                setRecommentadions(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

 
    return (
        <div>
            <h1>Zalecenia</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Imie Pacjenta</th>
                        <th>Nazwisko Pacjenta</th>
                        <th>Zalecenia</th>
                    </tr>
                </thead>
                <tbody>
                    {recommendations.map(recommendations => (
                        <tr key={recommendations.id}>
                            <td>{recommendations.id}</td>
                            <td>{recommendations.recommendation}</td>
                            <td>
                                <select onChange={(event) => setSelectedExercise(event.target.value)}>
                                    <option value="">Wybierz ćwiczenie</option>
                                    {exercises.map(exercise => (
                                        <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                    ))}
                                </select>
                                <button onClick={() => assignExerciseToTraining(selectedExercise, training.id)}>Przypisz</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default Zalecenia;