import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parcelsAPI } from "../../Instance";

import styles from "./ParcelsView.module.css";



export default function Parcel({ parcelID, date, status, role }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [parcelDetails, setParcelDetails] = useState({});
  const parcel_details_point = `/parcel/${parcelID}/role/${role}`;

  const displayDetails = () => {
    if (loading) {
      return (
        <tr>
          <td>
            <div className={styles.window_alert_div}>
              <div className={styles.window_alert_chdiv}>
                Loading...
              </div>
            </div>
          </td>
        </tr>
      )
    }


    if (parcelDetails) {
      const weight = parcelDetails.weigh ?? '';
      const height = parcelDetails.height ?? '';
      const width = parcelDetails.width ?? '';
      const length = parcelDetails.length ?? '';
      const sender_name = parcelDetails.sender?.fullname ?? '';
      const receiver_name = parcelDetails.receiver?.fullname ?? '';
      const sender_city = parcelDetails.sender.city ?? '';
      const receiver_city = parcelDetails.receiver.city;
      const locker = parcelDetails.cabinet?.locker?.name ?? '';
      const locker_zip = parcelDetails.cabinet?.locker?.zipcode ?? '';
      const code = parcelDetails.cabinet?.code ?? '';

      
      return (
        <tr>
          <td>
            <div className={styles.window_alert_div}>
              <div className={styles.window_alert_chdiv}>
                <div className={styles.window_alert_parcelid}>
                {code ? 
                (
                    <>
                    <b>Location:</b> {locker} <br/>
                    <b>Location zip:</b> {locker_zip} <br/>
                    <b>Code:</b> <u>{code}</u> <br/>
                    </>
                )   : 
                (   <>
                    <b>Tracking number:</b>
                    <br />
                    <span>{parcelDetails.trackingNumber ? parcelDetails.trackingNumber : ''}</span>
                    </>
                   )
                   }
                </div>


                  <b>Size: </b> 
                  {Math.round(height * 100)} x {Math.round(width * 100)} x {Math.round(length * 100)} 
                  &nbsp; cm |&nbsp; {Math.round(weight)} kg  <br/>

                   <b>Sender:</b> {sender_name.toLowerCase()} <br/>
                   <b>Receiver:</b> {receiver_name.toLowerCase()} <br/>
                   <b>Sent from: </b> {sender_city.toLowerCase()} <br/>
                   <b>Sent to: </b> {receiver_city.toLowerCase()} <br/>
                   <b>Status:</b> {parcelDetails.status.toLowerCase().replace(/_/g, ' ')} <br/>
                   <b>Ready to pickup:</b> {parcelDetails.sendDateDriver ? parcelDetails.sendDateDriver.slice(0,10): '-'} <br/>
                   <b>Picked up:</b> {parcelDetails.pickupDate ? parcelDetails.pickupDate.slice(0,10): '-'} <br/>

                   
                <button onClick = {() => setShow(false)}className={styles.alert_button}>close</button>
              </div>
            </div>
          </td>
        </tr>
      );
    }
    return null;
  };

  const fetchParcelDetails = async () => {
    setShow(!show);
    setLoading(true);
    try {
      const raw_parcelDetails = await parcelsAPI.get(parcel_details_point);
      setParcelDetails(raw_parcelDetails.data);
    } 
    catch (error) {
      navigate("/login", { replace: true});
      return;

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <tr onClick={fetchParcelDetails} className={styles.tableRow}>
        <td className={styles.tableC}>{parcelID}</td>
        <td className={styles.tableC}>{date.slice(0, 10)}</td>
        <td className={styles.tableC}>
          {status.toLowerCase().replace(/_/g, " ")}
        </td>
      </tr>
      {show && displayDetails()}
    </>
  );
}