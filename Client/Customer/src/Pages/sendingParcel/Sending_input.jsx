import styles from './ParcelSending.module.css'

const InputF = (props) => {
    const {label, ...inputProps} = props;
    return (
        <div className={styles.input_child_container}>
            <label className={styles.inp_label}>{label}</label>
            <input className={styles.input_box} {...inputProps}/>
        </div>
    )
}

export default InputF;
