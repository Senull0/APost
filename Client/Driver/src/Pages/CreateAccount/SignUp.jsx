import React, { useState } from "react";
import { debounce } from "lodash";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import new_account from "../../assets/new_account.svg"
import InputField from "./SignUp_input";
import styles from "./SignUp.module.css";
import axios from "axios";




const signup_point = import.meta.env.VITE_APP_USERS_BASEURL + '/signup-driver';
const SignUp = (props) => {
    const navigate = useNavigate();
    const notification_toast = (type, message, interval) =>
    toast[type](
      message, 
    { duration: interval,
      style: { color: '#163760', },
      iconTheme: { primary: '#163760', }
    });


    const [form, setForm] = useState({
      email: '',
      name: '',
      city: '',
      driverCode: '',
      postalCode: '',
      password: '',
    })


    const handleForm = debounce((e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      })
    }, 100)



    const submitHandler = async (e) => {
        e.preventDefault();
        const usrnm = Math.random().toString(24).slice(2,12); // username gen

        try {
          const response = await axios.post(signup_point, 
            
            {        
            username: usrnm,
            email: form.email,
            fullname: form.name,
            city: form.city,
            address: '',
            zipcode: form.postalCode,
            password: form.password,
            driverCode: form.driverCode,
            }, {
              headers: {
                'Content-Type': 'application/json',
              }
            })
            alert(`Your username: ${usrnm}`);
            navigate("/login", { replace: true}); 
            return

        } catch (error) {
          notification_toast("error", "Error", 800);
          return;
        }
      };


    return (
        <div className={styles.parent_form}>
          <form className={styles.form} onSubmit={submitHandler}>
            <img 
              src = {new_account}
              style={{ width: '20%', height: 'auto', paddingTop: "8%", paddingBottom: "8%"}}
              alt = 'Create an account'
            />

            {/* Email */}
            <InputField
              autoFocus
              label = "Email"
              id = "email"
              onChange={handleForm}
              name="email"
              type="email"
              required
            />


            {/* Full name */}
            <InputField
              label = "Full name"
              id = "name"
              onChange={handleForm}
              name="name"
              type="text"
              pattern="^[a-zA-Z]+(\s[a-zA-Z]+)+$"
              required
            />
            

            {/* City */}
            <InputField
              label = "City"
              id = "city"
              onChange={handleForm}
              name="city"
              type="text"
              pattern="[A-Za-z]+"
              required
            />

            {/* Postal code */}
            <InputField
              label = "Postal code"
              id = "postalCode"
              onChange={handleForm}
              name="postalCode"
              type="text"
              pattern="\d{5}"
              required
            />

            {/* Password */}
            <InputField
              label = "Password (>10) "
              id = "password"
              onChange={handleForm}
              name="password"
              type="password"
              pattern="^(?=.*\d).{10,}$"
              title="password must contain at least 1 number"
              required
            />

            {/* Driver Code */}
            <InputField
              label = "Driver code"
              id = "driverCode"
              onChange={handleForm}
              name="driverCode"
              type="text"
              required
            />

        <button className={styles.create_button} type="submit">Create</button>
        <Link to={`/login`} className={styles.account_already}>Already have an account?</Link>
        </form>
        <Toaster />
    </div>
    )
}

export default SignUp