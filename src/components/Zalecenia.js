import React, { useState, useEffect } from "react";
import axios from "axios";
import './zalecenia.css'

const Zalecenia = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [users, setUsers] = useState([]);

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
    const addRecommendation = (event) => {
        event.preventDefault();
        const recommendation = event.target.elements.recommendation.value;
        const userId = event.target.elements.userId.value.toString();
        axios.post('http://localhost:8080/api/v1/recommendations/create', {
            recommendation,
            userId
        })
            .then(response => {
                console.log('Dodano zalecenie:', response.data);
                setRecommendations([...recommendations, response.data]);
            })
            .catch(error => {
                console.log('Błąd podczas dodawania zalecenia:', error);
            });
    };



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
                    {recommendations.map(recommendation => {
                        const user = users.find(user => user.id === recommendation.user.id);
                        return (
                            <tr key={recommendation.id}>
                                <td>{recommendation.id}</td>
                                <td>{recommendation.recommendation}</td>
                                <td>{user ? user.username : 'Nieznany'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>


            <form onSubmit={addRecommendation}>
                <label>
                    Zalecenie:
                    <input type="text" name="recommendation" />
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
                <button type="submit">Dodaj zalecenie</button>
            </form>
        </div>
    );
};

export default Zalecenia;