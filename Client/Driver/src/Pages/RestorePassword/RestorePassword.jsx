import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { usersAPI } from "../../Instance";
import { debounce } from "lodash";
import toast, { Toaster } from 'react-hot-toast';

import restore_psw from "../../assets/restore_psw.svg"
import styles from "./RestorePassword.module.css";




export default function RestorePassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const enc_email = encodeURIComponent(email);
  const token = localStorage.getItem("token");
  
  const notification_toast = (type, message, interval) =>
  toast[type](
    message, 
  { duration: interval,
    style: { color: '#163760', },
    iconTheme: { primary: '#163760', }
  });



  const restorePassword = async (e) => {
    e.preventDefault()
    if (token) {
      localStorage.removeItem("token");
    }

    try {
      await usersAPI.put(`/forgotPassword?email=${enc_email}`)
    } catch (error) {
     }

    notification_toast("success", "A new password has been sent to your email", 1000)
    setTimeout(() => {
      toast.remove();
      navigate('/login');
    }, 1500);
  }

  const handleChange = debounce((e) => {
    setEmail(e.target.value);
  }, 250)
  

  return (
    <div className={styles.parent_form}>
      <form className={styles.form} onSubmit={restorePassword}>
      <img 
      src = {restore_psw}
      style={{ width: '25%', height: 'auto', paddingTop: "25%", paddingBottom: "10%"}}
      alt = "Restore password"
      />
      <div>
        <label className={styles.label} htmlFor="email">Email</label><br/>
        <input
          className={styles.input_box}
          id = "email"
          onChange={handleChange}
          name="email"
          type="email"
          required
          />

      </div>
      <button className={styles.restore_button} type="submit">Restore</button> <br />
      <Link to={`/login`} className={styles.bottom_link}>Login</Link>
      <Link to={`/signup`} className={styles.bottom_link}>Create Account</Link>
    </form>
    <Toaster/>
    </div>
)}
