import React, { useState } from 'react';
import { debounce } from 'lodash';

import { parcelsAPI } from '../../Instance';
import Getback from '../../modules/Getback';
import styles from "./Track.module.css"



const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [parcelStatus, setParcelStatus] = useState('');
  const [error, setError] = useState(null);
  const findParcel = debounce(async () => {
    
    try {
      setError(false);
      const response = await parcelsAPI.get(`/public/tracking/${trackingNumber}`);
      setParcelStatus(response.data.status.toLowerCase().replace(/_/g, ' '));

    }
      catch (error) {
        setError(true);

      }}, 500);


      const debouncedFindParcel = (e) => {
        e.preventDefault();
        setParcelStatus('');
        findParcel();
      }

      const setTracking = debounce((e) => {
        setTrackingNumber(e.target.value);
      }, 250)



  return (
    <div className={styles.trackingContainer}>
    <Getback/>
    <form onSubmit={debouncedFindParcel} >
      <div className={styles.trackingForm}>
      <h2 className= {styles.h2t}>Track your parcel</h2>

    <label className={styles.l}>Tracking id</label>
        <div className= {styles.trackingContainer_ch}>
        <input
            className = {styles.input_box} 
            onChange={setTracking}
            name = "track" 
            type="text"
            placeholder='...'
            required 
        />
        <button className={styles.trackButton}> Find </button>
        </div>
        {error || parcelStatus == '' ? (
          null
        ) : (
        <div className={styles.details}>
            <div className={styles.parcel_status}><b>Status:</b> {parcelStatus}</div>
        </div>
        )}
      </div>
      </form>
    </div>
    
  );
};

export default Tracking;

