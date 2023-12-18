import styles from "./SignUp.module.css";



const InputField = (props) => {
    const {label, ...inputProps} = props;
    return (
        <div className={styles.input_boxp}>
            <label className={styles.labels}>{label}</label><br/>
            <input className={styles.input_box} {...inputProps}/>
        </div>
    )
}

export default InputField;