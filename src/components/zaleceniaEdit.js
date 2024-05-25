import React, { useState, useEffect } from "react";
import axios from "axios";
import './zalecenia.css'

const ZaleceniaEdit = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [users, setUsers] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentRecommendation, setCurrentRecommendation] = useState({});

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

    // Edytuj zalecenie
    const editRecommendation = (recommendation) => {
        setEditing(true);
        setCurrentRecommendation(recommendation);
    };

    // Aktualizuj zalecenie
    const updateRecommendation = (event) => {
        event.preventDefault();
        const recommendation = event.target.recommendation.value;
        const userId = event.target.userId.value;
        axios.put(`http://localhost:8080/api/v1/recommendations/update/${currentRecommendation.id}`, {
            recommendation,
            userId
        })
            .then(response => {
                console.log('Zaktualizowano zalecenie:', response.data);
                setRecommendations(recommendations.map(rec => rec.id === currentRecommendation.id ? response.data : rec));
                setEditing(false);
            })
            .catch(error => {
                console.log('Błąd podczas aktualizacji zalecenia:', error);
            });
    };

    // Pobierz nazwę użytkownika po ID
    const getUserName = (id) => {
        const user = users.find(user => user.id === id);
        return user ? user.surname : 'Nieznany';
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
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {recommendations.map(recommendation => (
                        <tr key={recommendation.id}>
                            <td>{recommendation.id}</td>
                            <td>{recommendation.recommendation}</td>
                            <td>{getUserName(recommendation.UserId)}</td>
                            <td>
                                <button onClick={() => editRecommendation(recommendation)}>Edytuj</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editing && (
                <form onSubmit={updateRecommendation}>
                    <label>
                        Zalecenie:
                        <input type="text" name="recommendation" defaultValue={currentRecommendation.recommendation} />
                    </label>
                    <label>
                        Użytkownik:
                        <select name="userId" defaultValue={currentRecommendation.userId}>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.surname}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Aktualizuj zalecenie</button>
                </form>
            )}
        </div>
    );
};

export default ZaleceniaEdit;