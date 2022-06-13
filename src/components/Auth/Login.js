import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
    
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        console.log(username, password);
        navigate("/home");
    }

    return (
        <div className={styles.background}>
            <section className={styles.auth}>
                <h1>Login</h1>
                <form onSubmit={submitHandler}>
                    <div className={styles.control}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" ref={usernameRef}/>
                    </div>
                    <div className={styles.control}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" ref={passwordRef}/>
                    </div>
                    <div className={styles.actions}>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Login;