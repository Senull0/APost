import React, { useState } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

import { usersAPI } from "../../Instance";
import styles from './Usrsetings.module.css'



const CustomPrompt = ({showPrompt, setshowPrompt}) => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [pwd, updatePwd] = useState({
        current_pwd: '',
        new_pwd: '',
    })

    const handlepwdUpdate = (e) => {
        updatePwd({
            ...pwd,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await usersAPI.put('/authUser/updatePassword', {
                password: pwd.current_pwd,
                newPassword: pwd.new_pwd,
                confirmPassword: pwd.new_pwd,
            })
            setshowPrompt(false);
            localStorage.removeItem("token");
            navigate('/login', {replace: true});
        } 
        catch (error) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 500)
        }
    };

    return (
        <div className={styles.prompt_div}>
            <form className={styles.prompt_form} onSubmit={submitHandler}>
                <div className={styles.prompt_chdiv}>
                    <label className={styles.prompt_label} htmlFor="1"> Password </label>
                    <input
                        className={error ? styles.prompt_input_wrong : styles.prompt_input}
                        id="1"
                        onChange={handlepwdUpdate}
                        value = {pwd.current_pwd}
                        name="current_pwd"
                        type="text"
                        required
                    />
                </div>
                <div className={styles.prompt_chdiv}>
                    <label className={styles.prompt_label} htmlFor="2">New password</label>
                    <input
                        className={styles.prompt_input}
                        id="2"
                        onChange={handlepwdUpdate}
                        value = {pwd.new_pwd}
                        name="new_pwd"
                        type="text"
                        pattern="^(?=.*\d).{10,}$"
                        title="password must contain at least 1 number"
                        required
                    />
                </div>
                <button className={styles.prompt_button} type="submit">Update</button>
                <button
                    className={styles.prompt_button}
                    type="button"
                    onClick={() => setshowPrompt(false)}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default CustomPrompt;
