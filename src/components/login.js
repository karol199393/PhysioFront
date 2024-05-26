import React ,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateUsername(username)) {
            alert("Niepoprawna nazwa użytkownika. Nazwa użytkownika powinna zawierać co najmniej 3 znaki i składać się tylko z liter i cyfr.");
            return;
        }
        if (!validatePassword(password)) {
            alert("Niepoprawne hasło. Hasło powinno zawierać co najmniej 8 znaków, w tym co najmniej jedną literę i jedną cyfrę.");
            return;
        }

        const endpoint = "http://localhost:8080/api/v1/login";
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setLoginStatus(`Logged in successfully as ${data.role}`);
            } else {
                setLoginStatus("Failed to log in");
            }
        } catch (error) {
            console.error('There was an error!', error);
            setLoginStatus("Failed to log in");
        }
    };

    const validateUsername = (username) => {
        const re = /^[a-zA-Z0-9]+$/;
        return re.test(String(username).toLowerCase());
    }

    const validatePassword = (password) => {  
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        return re.test(String(password));
    }
    return (
       <form onSubmit={handleSubmit} className="login-form">
           <label>
               Nazwa Użytkownika
               <input
                   type="text"
                   value={username}
                   onChange={(event) => setUsername(event.target.value)}
               />
           </label>
           <label>
               Hasło
               <input
                   type="password"
                   value={password}
                   onChange={(event) => setPassword(event.target.value)}
               />
           </label>
           <button type="submit">Login</button>
           <div>{loginStatus}</div> {/* Wyświetl status logowania */}
       </form>
    );
};


export default Login;