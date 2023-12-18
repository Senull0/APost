import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { debounce } from "lodash";
import toast, { Toaster } from 'react-hot-toast';

import { parcelsAPI, usersAPI } from "../../Instance";
import InputF from './Sending_input'
import Getback from "../../modules/Getback";
import styles from './ParcelSending.module.css';



const getAuthUser_point = '/authUser/getAuthUser';
const Usrsettings = () => {
    const token = localStorage.getItem("token");
    const notification_toast = (type, message, interval) =>
    toast[type](
      message, 
    { duration: interval,
      style: { color: '#163760', },
      iconTheme: { primary: '#163760', }
    });
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        sender_email: '',
        sender_address: '',
        sender_postalCode: '',
        sender_name: '',
    });

    const [parceldata, setparcelData] = useState({
        recipient_name: '',
        recipient_email: '',
        recipient_address: '',
        recipient_postalCode: '',

        parcel_weight: '',
        parcel_height: '',
        parcel_length: '',
        parcel_width: '',
    });

    const handleParcelUpdate = debounce((e) => {
      setparcelData({
        ...parceldata,
        [e.target.name]: e.target.value,
      });
    }, 100)


    useEffect(() => {
        const fetchSettings = async () => {
          document.title = 'APost | Send';
          try {
            const response = await usersAPI.get(getAuthUser_point)
            const userdata = response.data;
            setSettings({
                sender_email: userdata.email,
                sender_address: userdata.address,
                sender_postalCode: userdata.zipcode,
                sender_name: userdata.fullname,
            })
          } catch (error) {
            navigate('/login', {replace: true});
            return;
          }
        };
    
        fetchSettings();
      }, [token]);

      const handleSend = async(e) => {
        e.preventDefault();
        if (parceldata.recipient_email === settings.sender_email) {
          notification_toast("error", "You can't send a parcel to yourself", 650);
          return;
        }
        try {
          const send_req = await parcelsAPI.post('/buy', {
            emailReceiver: parceldata.recipient_email,
            weigh: parceldata.parcel_weight * 1,
            heigh: parceldata.parcel_height / 100 ,
            width: parceldata.parcel_width / 100 ,
            length: parceldata.parcel_length / 100 ,
          })
          const s_toast = notification_toast("success", "Parsel sent", 700);
          setTimeout(() => {
            toast.remove(s_toast);
            navigate(`/parcels`);
          }, 750)
        }
        
        catch (error) {
          notification_toast("error", "Please try again", 700)
          return;
        }
      }





    return (
        <div className = {styles.parent_container}>
          <form onSubmit={handleSend}>
            <Getback/>
          <div className= {styles.input_container}>
            <p className = {styles.pl}>Sending</p>
          </div>

        <div className={styles.input_container}>
          <InputF 
            label = "Your name"
            disabled = {true}
            value = {settings.sender_name || ''}
            name = "sender_name"
            type = "text"
          />
          <InputF 
            label = "Recipient's name"
            onChange = {handleParcelUpdate}
            name = "recipient_name"
            type = "text"
            pattern="^[a-zA-Z]+(\s[a-zA-Z]+)+$"
            required
          /> 
        </div>



        <div className={styles.input_container}>
            <InputF 
              label = "Your email"
              disabled = {true}
              value = {settings.sender_email || ''}
              name = "sender_email"
              type = "email"
            />
            <InputF 
              label = "Recipient's email"
              onChange = {handleParcelUpdate}
              name = "recipient_email"
              type = "email"
              required
            />
        </div>


        <div className={styles.input_container}>
            <InputF 
              label = "Your address"
              disabled = {true}
              value = {settings.sender_address || ''} 
              name = "sender_address"
              type = "text"
            />    
            
            <InputF 
              label = "Recipient's address"
              onChange = {handleParcelUpdate}
              name = "recipient_address"
              type = "text"
              required
            />
        </div>


        <div className={styles.input_container}>
            <InputF 
              label = "Your zip"
              disabled = {true}
              value = {settings.sender_postalCode || ''}
              name = "sender_postalCode"
              type = "number"
            />

            <InputF 
              label = "Recipient's zip"
              onChange = {handleParcelUpdate} 
              name="recipient_postalCode"
              type="text" 
              pattern="\d{5}"
              required
            />
        </div>

        <div className= {styles.input_container}>
            <p className = {styles.pl}>Parcel info</p>
          </div>

        <div className={styles.input_container}>
            <InputF 
              label = "weight (kg)"
              onChange = {handleParcelUpdate}
              name = "parcel_weight"
              type = "number"
              min = "0.1"
              step = "0.1"
              max = "5"
              required 
            />

            <InputF 
              label = "height (cm)"
              onChange = {handleParcelUpdate}
              name = "parcel_height"
              type = "number" 
              min = "5"
              max = "50"
              required
            /> 
        </div>

        <div className={styles.input_container}>
            <InputF 
              label = "length (cm)"
              onChange = {handleParcelUpdate}
              name = "parcel_length"
              type = "number"
              min = "5" 
              max = "50"
              required
            /> 
            
            <InputF 
              label = "width (cm)"
              onChange = {handleParcelUpdate}
              name = "parcel_width"
              type = "number"
              min = "5" 
              max = "50"
              required
            />  
        </div>

        
        

        

        <div className={styles.input_container}>
            <div className={styles.input_child_container}>
            <button className = {styles.buttn} type = "submit">Send a parcel</button>
            </div>
        <Toaster/>    
        </div>
        </form>
        </div> 
        
        )}

export default Usrsettings;