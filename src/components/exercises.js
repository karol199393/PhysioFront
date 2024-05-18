import React, { useEffect, useState } from "react";
import './exercises.css';

const Exercises = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/exercises') // replace with your backend URL
            .then(response => response.json())
            .then(data => setExercises(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const addExercise = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/api/v1/addExercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: event.target.name.value
            })
        })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h1>Ćwiczenia</h1>
            <form onSubmit={addExercise}>
                <label htmlFor="name">Nazwa:</label>
                <input type="text" id="name" name="name" required />
                <button type="submit">Dodaj</button>
            </form>
    
    
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nazwa Ćwiczenia</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map(exercise => (
                    <tr key={exercise.id}>
                        <td>{exercise.id}</td>
                        <td>{exercise.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};


    


export default Exercises;