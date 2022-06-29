import React, { useRef, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { toast } from "react-toastify";

import styles from "./Login.module.css";

const Login = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [uname, setUname] = useState("");
    const [token, setToken] = useState("");
    const [expiry, setExpiry] = useState("");

    const fetchUser = useCallback(async (username, password) => {
        const response = await fetch("https://localhost:44375/api/auth", {
            method: 'POST',
            body: JSON.stringify({
              UserAD: username,
              Password: password
            }),
            headers: {
              'Content-Type': 'application/json',
              'Accept': '*/*'
            }}).then(resp => {
                resp.json().then(data => ({
                    data: data,
                    status: resp.status,
                })).then(res => {
                    if (res.data === null) toast.error("Password tidak benar!", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                    })
                    else {
                        setUname(res.data[0].Username);
                        setToken(res.data[0].Token);
                        setExpiry(res.data[0].ExpiresIn);
                    }
                })
            }).catch(e => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        if (uname) {
            dispatch(authActions.login({
                Username: uname,
                Token: token,
                ExpiresIn: expiry
            }));
            toast.success("Berhasil masuk sebagai    " + '\n' + uname, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
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