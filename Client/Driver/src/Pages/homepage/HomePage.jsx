import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

import styles from './HomePage.module.css'
import logo from "../../assets/test_logo.svg"



const HomePage = () => {
  const [currentForm, setCurrentForm] = useState('');

  const navigate = useNavigate();
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const handleMyPost = () => {
    navigate('login');
  }

  const handleTracking = () => {
    navigate('track');
  }


  return (
      <div className = {styles.parent_container}>
        <div className = {styles.footer}>
          <img 
              src = {logo}
              style={{ width: '8%', height: 'auto', maxWidth: '45px'}}
          />
          <Link to = "login" className= {styles.loginLink}> Login </Link>
        </div>

        <div className = {styles.parent_mainText}>
          <div className = {styles.mainText}>
            <p><span className = {styles.word1}>Steering dreams</span></p>
            <p><span className = {styles.word2}>Into</span></p>
            <p><span className = {styles.word3}>Reality</span></p>
          </div>



        </div>


      </div>
    );
};

export default HomePage;