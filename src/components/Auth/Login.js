import React, { useRef, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

import styles from "./Login.module.css";

const Login = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [uname, setUname] = useState("");

    const err = {
        "ERROR": 'Error'
    }

    const fetchUser = useCallback(async (username, password) => {
        const response = await fetch("https://localhost:44375/api/auth", {
            method: 'POST',
            
            body: JSON.stringify({
              UserAD: username,
              Password: password
            }),
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*',
              'Accept-Encoding': 'gzip, deflate, br',
              'Connection': 'keep-alive'
            }}).then(resp => {
                resp.json().then(data => ({
                    data: data,
                    status: resp.status,
                })).then(res => {
                    console.log(res.data[0]);
                    if (res.data[0] === err) console.log("data error")
                    setUname(res.data[0].Username);
                    console.log(res.status, res.result);
                })
            }).catch(e => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        if (uname) {
            dispatch(authActions.login(uname));
            console.log(uname);
            navigate("/home");
        }
    }, [uname])

    const submitHandler = () => { 
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        fetchUser(username, password);
    }

    return (
        <div className={styles.background}>
            <section className={styles.auth}>
                <h1>Login</h1>
                <form onSubmit={e => {e.preventDefault();
                    submitHandler()}}>
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