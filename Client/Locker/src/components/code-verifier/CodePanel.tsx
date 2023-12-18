import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import CodeCell from "./CodeCell";
import styles from './CodePanel.module.css'



const CodePanel : React.FC = () => {
  const [codeNumber, setCodeNumber] = useState<string>("");
  const { role } = useLocation().state;
  const [status, setStatus] = useState<string>("");
  const navigate = useNavigate()
  const baseURL: string | undefined = import.meta.env.VITE_APP_BASEURL;


  const handleOK = () => {
    let lockerId = localStorage.getItem("lockerId");

    if (!lockerId) {
      navigate("/")
      return;
    }

    fetch(`${baseURL}/api/parcels/public/${role}/locker/${lockerId}/code/`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: codeNumber
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.isOpen) {
          setStatus("Door " + data.num + " is open")
          handleSuccess();
        } else {
          setStatus("The provided code is not correct")
        }
      })
      .catch(error => {
          console.log(error)
          setStatus("The provided code is not correct")
        })

  }

  const handleSuccess = () => {
    setTimeout(() => {
      navigate("/")
    }, 5000)
  }

  return (
    <div className={styles.CodePanel}>
      <div className={styles.CodePanel_child}>
      {status && (<p className={styles.status}>{status}</p>)}
      <div className={styles.searchBox}>
        <input 
        type="number" 
        placeholder="----" 
        className={styles.searchinput} 
        value={codeNumber} 
        maxLength={4} 
        pattern="[0-9]{4}"
        readOnly
        required />
        <button onClick={handleOK}>OK</button>
      </div>
      <div className={styles.buttons_container}>
        <CodeCell code={codeNumber} setCode={setCodeNumber} />
      </div>
      </div>
    </div>
  )
}

export default CodePanel