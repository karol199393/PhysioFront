import React, { useState } from "react";
import './courseOfTreatment.css';

const CourseOfTreatment = () => {
    const [form, setForm] = useState({
        name: "",
        stuffId: "",
        patientId: "",
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
            stuff: { id: form.stuffId },
            patient: { id: form.patientId },
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
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
            <input type="number" name="stuffId" value={form.stuffId} onChange={handleChange} placeholder="Stuff ID" />
            <input type="number" name="patientId" value={form.patientId} onChange={handleChange} placeholder="Patient ID" />
            <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" />
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} placeholder="Start Date" />
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} placeholder="End Date" />
            <input type="number" name="progressRating" value={form.progressRating} onChange={handleChange} placeholder="Progress Rating" />
            <input type="number" name="muscleStrength" value={form.muscleStrength} onChange={handleChange} placeholder="Muscle Strength" />
            <input type="number" name="endurance" value={form.endurance} onChange={handleChange} placeholder="Endurance" />
            <input type="text" name="visitNotes" value={form.visitNotes} onChange={handleChange} placeholder="Visit Notes" />
            <button type="submit">Wyślij</button>
        </form>
    </div>
);
};
export default CourseOfTreatment;