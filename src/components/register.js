import React ,{ useState } from "react";
import "./register.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isDoctor, setIsDoctor] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpoint = isDoctor ? "http://localhost:8080/api/v1/registerStuff" : "http://localhost:8080/api/v1/registerPatient";
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, username, password }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
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
      <label>
        Zarejstruj się jako Personel:
        <input
          type="checkbox"
          checked={isDoctor}
          onChange={(event) => setIsDoctor(event.target.checked)}
        />
      </label>
      <button type="submit">Register</button>
</form>
    );
};

export default Register;