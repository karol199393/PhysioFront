import React, { useState } from "react";
import "./register.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("DOCTOR");
    const roleToId = {
        "DOCTOR": 1,
        "PATIENT": 2
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            alert("Niepoprawny adres email");
            return;
        }
        if (!validateUsername(username)) {
            alert("Niepoprawna nazwa użytkownika. Nazwa użytkownika powinna zawierać co najmniej 3 znaki i składać się tylko z liter i cyfr.");
            return;
        }
        if (!validatePassword(password)) {
            alert("Niepoprawne hasło. Hasło powinno zawierać co najmniej 8 znaków, w tym co najmniej jedną literę i jedną cyfrę.");
            return;
        }

        const endpoint = "http://localhost:8080/api/v1/register";
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, username, password, role: roleToId[role] }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const validateUsername = (username) => {
        const re = /^[a-zA-Z0-9]+$/;
        return re.test(String(username).toLowerCase());
    }

    const validatePassword = (password) => {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        return re.test(String(password));
    }


    return (
        <form onSubmit={handleSubmit} className="register-form">
            <label>
                Email:
                <input
                    type="text"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </label>
            <label>
                Nazwa Użytkownika:
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </label>
            <label>
                Hasło:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <label>  {/* new label for role selection */}
                Rola:
                <select value={role} onChange={(event) => setRole(event.target.value)}>
                    <option value="">Wybierz rolę</option>
                    <option value="DOCTOR">Lekarz</option>
                    <option value="PATIENT">Pacjent</option>
                </select>
            </label>
            <button type="submit">Zarejstruj</button>
        </form>
    );
};

export default Register;