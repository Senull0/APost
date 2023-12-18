import styles from "./PickupLocation.module.css";
import {useNavigate} from "react-router-dom"

interface PickupLocationProps {
  id: number,
  name: string,
  address: string,
}

export default function PickupLocation({ id, name, address } : PickupLocationProps) : JSX.Element {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.setItem("lockerId", id.toString());
    navigate("role")
  }

  return (
    <div className={styles.location} key={id} data-testid={`location-${id}`}>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.address}>{address}</div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleClick}>Choose</button>
      </div>
    </div>
  );
}
