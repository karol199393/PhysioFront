import React, { useState } from "react";
import './courseOfTreatment.css';

const CourseOfTreatment = () => {
    const [form, setForm] = useState({
        name: "",
        userId: "",
        description: "",
        startDate: "",
        endDate: "",
        progressRating: "",
        muscleStrength: "",
        endurance: "",
        visitNotes: ""
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

const handleSubmit = (event) => {
    event.preventDefault();

    const newCourseOfTreatment = {
        name: form.name,
        userId: form.userId, 
        description: form.description,
        startDate: form.startDate,
        endDate: form.endDate,
        progressRating: form.progressRating,
        muscleStrength: form.muscleStrength,
        endurance: form.endurance,
        visitNotes: form.visitNotes
    };

    fetch(`http://localhost:8080/api/v1/courseOfTreatment/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCourseOfTreatment)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('Error:', error));
};

return (
    <div>
        <h1>CourseOfTreatment</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Imie" />
            <input type="number" name="userId" value={form.userId} onChange={handleChange} placeholder="User ID" />
            <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Opis" />
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} placeholder="Start" />
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} placeholder="Koniec" />
            <input type="number" name="progressRating" value={form.progressRating} onChange={handleChange} placeholder="Progress" />
            <input type="number" name="muscleStrength" value={form.muscleStrength} onChange={handleChange} placeholder="Siła mięśni" />
            <input type="number" name="endurance" value={form.endurance} onChange={handleChange} placeholder="Wytrzymalosc" />
            <input type="text" name="visitNotes" value={form.visitNotes} onChange={handleChange} placeholder="Adnotacja wizyty" />
            <button type="submit">Wyślij</button>
        </form>
    </div>
);
};
export default CourseOfTreatment;