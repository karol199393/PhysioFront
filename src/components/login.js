import React ,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [isDoctor, setIsDoctor] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const endpoint = isDoctor ? "http://localhost:8080/api/v1/loginforStuff" : "http://localhost:8080/api/v1/loginforPatient";
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
                setLoginStatus("Logged in successfully");
            } else {
                setLoginStatus("Failed to log in");
            }
        } catch (error) {
            console.error('There was an error!', error);
            setLoginStatus("Failed to log in");
        }
    };
    return (
       <form onSubmit={handleSubmit} className="login-form">
           <label>
               Username:
               <input
                   type="text"
                   value={username}
                   onChange={(event) => setUsername(event.target.value)}
               />
           </label>
           <label>
               Password:
               <input
                   type="password"
                   value={password}
                   onChange={(event) => setPassword(event.target.value)}
               />
           </label>
           <label>
               Login as Stuff:
               <input
                   type="checkbox"
                   checked={isDoctor}
                   onChange={(event) => setIsDoctor(event.target.checked)}
               />
           </label>
           <button type="submit">Login</button>
           <div>{loginStatus}</div> {/* Wyświetl status logowania */}
       </form>
    );
};


export default Login;