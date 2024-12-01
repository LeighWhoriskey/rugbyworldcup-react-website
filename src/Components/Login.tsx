import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

interface Props{
    login: () => void;
}
function Login({login}: Props){

    const [loginError, setLoginError] = useState("");
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const history = useHistory();

    const handleSubmit = (event : FormEvent) =>{
        event.preventDefault();

        if(emailRef.current != null && passwordRef.current !=null){
            axios.post("http://localhost:3000/login/",
            {
                email: emailRef.current.value,
                password: passwordRef.current.value
            }).then(res =>{
                if( res.status === 200){
                    setLoginError("");
                    if(emailRef.current != null)
                        localStorage.setItem("email", emailRef.current.value);
                    login(); 
                    history.push("/resultsAdmin");
                }else{
                    setLoginError("Invalid email or password");
                }

            }).catch(err =>{
                console.log(err)
                setLoginError("Error occurred during login.")
            });
        }
        
    }

    return <>
        <h1>Login</h1>
        <hr></hr>

        <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" 
            ref={emailRef} required placeholder="Email address"></input>
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" 
            ref={passwordRef} required placeholder="Password"></input>
            <br></br>
            <div>{loginError}</div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </>
}

export default Login;