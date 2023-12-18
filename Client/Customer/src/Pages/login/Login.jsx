import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { usersAPI } from "../../Instance";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { debounce } from "lodash";

import login_lock from "../../assets/login_lock.svg"
import styles from "./Login.module.css";



const login_point = '/signIn';
const Login = () => {
  const navigate = useNavigate();
  const notification_toast = (type, message, interval) =>
  toast[type](
    message, 
  { duration: interval,
    style: { color: '#163760', },
    iconTheme: { primary: '#163760', }
  });

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })
  

  useEffect(() => {
    document.title = 'APost | Login';
    if (localStorage.getItem("token")) {
      navigate("/parcels", { replace: true})
      return;
    }
  }, []);



  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await usersAPI.put(login_point, 
      { 
        email: loginForm.email, 
        password: loginForm.password,
      });


        localStorage.setItem("token", response.data.token);
        if (!response.data.active) {
          const reactivate = confirm("Your account has been deactivated, would you like to reactive it?")
          if (reactivate) {
            try {
            await usersAPI.put("/authUser/reactive");
            }
            catch (error) {
              return;
            }
          }
          else {
            navigate('/');
            return;
          }
        }
        const s_toast = notification_toast('success', 'Success', 700);
        setTimeout(() => {
          toast.remove(s_toast);
          navigate(`/parcels`);
        }, 750)


      } catch (error) {
        notification_toast('error', 'Authentication error', 750);
      }
  };


  const handleChange = debounce((e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    })
  }, 80)



  return (
    <div className={styles.parent_form}>
      <form className={styles.form} onSubmit={loginHandler}>
      <img 
      src = {login_lock}
      style={{ width: '25%', height: 'auto', paddingTop: "25%", paddingBottom: "10%"}}
      alt = 'Login'
      />
      <div>
        <label className={styles.label} htmlFor="email">Email</label><br/>
        <input
          className={styles.login_input}
          autoFocus
          id = "email"
          onChange={handleChange}
          name="email"
          type="email"
          required
          />
      </div>

      <div>
        <label className={styles.label} htmlFor="password">Password</label><br/>
        <input
          className={styles.login_input}
          id = "password"
          onChange={handleChange}
          name="password"
          type="password"
          required
        />
      </div>
      
      <button className={styles.login_button} type="submit">Login</button> <br />
      <Link to={`/RestorePassword`} className={styles.restore_password}>Restore Password</Link>
      <Link to={`/signup`} className={styles.create_account}>Create Account</Link>
    
      </form>
      <Toaster/>
    </div>
  );
};

export default Login;
