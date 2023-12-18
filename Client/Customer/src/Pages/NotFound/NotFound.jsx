import React, { useEffect } from "react";
import styles from './NotFound.module.css'



const NotFound = () => {
    useEffect(() => {
        document.title = 'APost | 404';
        }, []);
    return (
    <div className= {styles.pdiv}>
        <p className = {styles.p1}> 404 </p>
        <p className = {styles.p2}> <b> Not Found </b> </p>
    </div>
    )
}



export default NotFound;