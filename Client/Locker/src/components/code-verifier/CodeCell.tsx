import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './CodeCell.module.css'


interface CellProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}


const CodeCell : React.FC<CellProps> = ({code, setCode}) => {
  const navigate = useNavigate()

  const handleClick = (event : React.MouseEvent<HTMLButtonElement>) => {
    const element = event.currentTarget;
    if (element.textContent === "C") {
      setCode(""); 
      return;
    }

    else if (element.textContent === "Close") {
      handleCancel()
    }

    else {
      if (code.length >= 4) {
        return 
      }
    }

    setCode((prevState : string) => {
      if (prevState === "") {
        return element.textContent || ''
      } else if (isNaN(Number(prevState))) {
        return "";
      }
      return prevState + element.textContent;
    })
  }

  const handleCancel = () => {
    navigate("/")
  }

  return (
    <div className={styles.CodeCell}>
      <div className={styles.buttons_container}>
        <button className={styles.btn} onClick={handleClick}>1</button>
        <button className={styles.btn} onClick={handleClick}>2</button>
        <button className={styles.btn} onClick={handleClick}>3</button>
      </div>
      <div className={styles.buttons_container}>
        <button className={styles.btn} onClick={handleClick}>4</button>
        <button className={styles.btn} onClick={handleClick}>5</button>
        <button className={styles.btn} onClick={handleClick}>6</button>
      </div>
      <div className={styles.buttons_container}>
        <button className={styles.btn} onClick={handleClick}>7</button>
        <button className={styles.btn} onClick={handleClick}>8</button>
        <button className={styles.btn} onClick={handleClick}>9</button>
      </div>
      <div className={styles.buttons_container}>
        <button className={styles.btn} onClick={handleClick}>C</button>
        <button className={styles.btn} onClick={handleClick}>0</button>
        <button className={styles.btn} onClick={handleClick}>Close</button>
      </div>
    </div>
  );
}

export default CodeCell;
