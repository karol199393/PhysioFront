import React, { useState, useEffect } from "react";
import axios from "axios";
import './l4.css';

const L4 = () => {
    const [sick_leave, setsick_leave] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Pobierz zalecenia
        axios.get('http://localhost:8080/api/v1/sickleave/getAllSickLeaves')
            .then(response => {
                setsick_leave(response.data);
            })
            .catch(error => {
                console.log('Błąd podczas pobierania L4:', error);
            });

        // Pobierz pacjentów
        axios.get('http://localhost:8080/api/v1/getAllUsers')
            .then(response => {
                console.log('Pobrane dane użytkowników:', response.data);
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    console.error('Dane użytkowników nie są tablicą:', response.data);
                }
            })
            .catch(error => {
                console.log('Błąd podczas pobierania danych użytkowników:', error);
            });
    }, []);

    //Dodaj zalecenie
const addsick_leave = (event) => {
    event.preventDefault();
    const newSickLeave = event.target.elements.sick_leave.value;
    const userId = event.target.elements.userId.value.toString();
    axios.post('http://localhost:8080/api/v1/sickleave/create', {
        sick_leave: newSickLeave,
        userId
    })
        .then(response => {
            console.log('Dodano zalecenie:', response.data);
            setsick_leave([...sick_leave, response.data]);
        })
        .catch(error => {
            console.log('Błąd podczas dodawania L4:', error);
        });
};



    return (
        <div className="L4">
            <h1>L4 Zwolnienia lekarskie</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Powód</th>
                        <th>Pacjent</th>
                    </tr>
                </thead>
                <tbody> 
                    {sick_leave.map(sick_leave => {
                        const user = users.find(user => user.id === sick_leave.user.id);
                        return (
                            <tr key={sick_leave.id}>
                                <td>{sick_leave.id}</td>
                                <td>{sick_leave.sick_leave}</td>
                                <td>{user ? user.username : 'Nieznany'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>


            <form onSubmit={addsick_leave}>
                <label>
                    Powoód:
                    <input type="text" name="sick_leave" />
                </label>
                <label>
                    Użytkownik:
                    <select name="userId">
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Wystaw</button>
            </form>
        </div>
    );
};

export default L4;