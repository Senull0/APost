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
      const locker = parcelDetails.cabinet?.locker?.name ?? '';
      const locker_location = parcelDetails.cabinet.locker?.address ?? '';
      const locker_zip = parcelDetails.cabinet.locker?.zipcode ?? '';
      const code = parcelDetails.cabinet?.code ?? '';
      return (
        <tr>
          <td>
            <div className={styles.window_alert_div}>
              <div className={styles.window_alert_chdiv}>
                <div className={styles.window_alert_parcelid}>
                  <span><b>Note:</b> after you drop off the parcel, please update the page to get the latest details</span>
                  <br />
                </div>
                  
                  
                  <b>Size: </b> 
                  {Math.round(height * 100)} x {Math.round(width * 100)} x {Math.round(length * 100)} 
                  &nbsp; cm |&nbsp; {Math.round(weight)} kg  <br/>
                   
                   <b>Status:</b> {parcelDetails.status.toLowerCase().replace(/_/g, ' ')} <br/>
                   <b>Location: </b> {locker_location} | {locker_zip} <br/>
                   <b>Locker: </b> {locker} <br/>
                   {code ? (
                    <>
                    <b>Code:</b> <u>{code}</u> <br/>
                    </>
                   ) : (null)}
                
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