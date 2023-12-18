import { useNavigate } from 'react-router-dom'
import styles from './RoleSelector.module.css'

const RoleSelector: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.choose_role_container}>
      <div>
        <button className={styles.drop_off_button} onClick={() => {
          navigate("/code", {
            state: { role: "drop-off" }
          })
        }}>
          Drop off the parcel
        </button>
      </div>
      <div>
        <button className={styles.pick_up_button} onClick={() => {
          navigate("/code", { state: {role: "pick-up" }})
        }}>
          Pick up of the parcel
        </button>
      </div>
    </div>
  );
}
export default RoleSelector;