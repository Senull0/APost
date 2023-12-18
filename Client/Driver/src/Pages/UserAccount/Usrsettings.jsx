import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { usersAPI } from "../../Instance";
import Getback from "../../modules/Getback";
import CustomPrompt from "./P_prompt";
import styles from './Usrsetings.module.css'


const getAuthUser_point = '/authUser/getAuthUser'
const Usrsettings = () => {
    const navigate = useNavigate();
    const [showPrompt, setshowPrompt] = useState(false);
    const [oldEmail, setoldEmail] = useState('');
    const [settings, setSettings] = useState({
        email: '',
        address: '',
        city: '',
        postalCode: '',
        name: '',
    });





    const handleSettingsUpdate = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await usersAPI.get(getAuthUser_point);
                const userdata = response.data;
                setSettings({
                    email: userdata.email,
                    address: userdata.address,
                    city: userdata.city,
                    postalCode: userdata.zipcode,
                    name: userdata.fullname,
                    username: userdata.username,
                })
                setoldEmail(userdata.email);
          } catch (error) {
            navigate("/login", { replace: true});
            return;
          }
        };
    
        fetchSettings();
      }, []);





    const handleDelete = async() => {
        const confirm = prompt(`To confirm this, please type: ${settings.email}`)
        if (confirm !== settings.email) {
            alert("Please try again")
        }
        else {
            try {
                await usersAPI.put('/authUser/deactive');
                localStorage.removeItem("token");
                navigate("/", { replace: true});
                return;
            }
            catch (error) {
                return;
            }
        }
    }


    const handleUpdate = async (e) => {
        e.preventDefault();
        const confirm = prompt(`To confirm this, please type: ${settings.email}`);
      
        if (confirm === settings.email) {
          try {
            const query_params = (
              `fullname=${settings.name}
               ${oldEmail !== `${settings.email}` ? `&email=${settings.email}` : ''}
               &city=${settings.city}
               &address=${settings.address}
               &zipcode=${settings.postalCode}`
            );
      
            const response = await usersAPI.put(`/updateProfile?${query_params}`);
            alert("Updated successfully!");
            localStorage.removeItem("token");
            navigate('/login');
          } catch (error) {
            alert("Failed to update");
            return;
          }
        } else {
          alert("Please try again");
          return;
        }
      };



    return (
        <div className = {styles.parent_container}>
            <Getback/>
        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
                <label>Email</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                value = {settings.email || ''} 
                name = "email" 
                type="email" 
                required
                />
            </div>
            <div className={styles.input_child_container}>
                <label className = {styles.settings_label}>Full name</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                value = {settings.name || ''} 
                name = "name" 
                type="text" 
                pattern="^[a-zA-Z]+(\s[a-zA-Z]+)+$"
                required
                />
            </div>    
        </div>



        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
                <label className = {styles.settings_label}>City</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                value = {settings.city.toLowerCase() || ''} 
                name = "city" 
                type="text" 
                pattern="[A-Za-z]+"
                required
                />
            </div>
            <div className={styles.input_child_container}>
                <label className = {styles.settings_label}>Address</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                value = {settings.address || ''} 
                name = "address" 
                type="text" 
                required
                />
            </div>    
        </div>

        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
                <label className = {styles.settings_label}>Postal code</label>
                <input 
                className = {styles.input_box} 
                onChange = {handleSettingsUpdate}  
                value = {settings.postalCode || ''} 
                name = "postalCode" 
                type="text"
                pattern="\d{5}" 
                required
                />
            </div>
            <div className={styles.input_child_container}>
                <label className = {styles.settings_label}>Username</label>
                <input 
                className = {styles.input_box} 
                disabled = {true}
                value = {settings.username || ''} 
                name = "username" 
                type="text" 
                required
                />
            </div>    
        </div>

        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
            <button className = {styles.buttn} onClick={() => {setshowPrompt(true)}}>Update password</button>
            <button className = {styles.buttn} onClick={handleUpdate}>Update settings</button>
            <button className = {styles.buttn} onClick={handleDelete} type = "button">Deactivate account</button>
            {showPrompt && <CustomPrompt showPrompt={showPrompt} setshowPrompt={setshowPrompt}/>}
            </div>    
        </div>
        </div> 
        
        
        )}

export default Usrsettings;