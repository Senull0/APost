import React, {useEffect, useState} from "react";
import { useNavigate, Link } from 'react-router-dom';

import { parcelsAPI } from "../../Instance";
import Parcel from "./Parcel";
import logo from "../../assets/test_logo.svg"
import styles from "./ParcelsView.module.css";



const driver_parcels_point = '/driver';
const ParcelsView = () => {
  const [all_parcels, setAll_parcels] = useState([]);
  const [parcels, setParcels] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  
  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const driver_parcels_raw = await parcelsAPI.get(driver_parcels_point);
        const driver_parcels = driver_parcels_raw.data.map(i => ({...i, role: "DRIVER"}));
        setParcels(driver_parcels);

      } 
      catch (error) {
        navigate('/login', {replace: true});
        return
      }
      finally {
        setLoading(false);
      }
    };



    if (token) {
      fetchParcels();
    } else {
      navigate("/login", {replace: true});
      return
    }
  }, [token, navigate]);

  if (loading) {
    return <></>
  }






  const handleLogout = () => {
    localStorage.removeItem("token");
    return;
  }



     
  return (
    <div>
          <img 
              src = {logo}
              style={{ width: '8%', height: 'auto', maxWidth: '45px', padding: '1.5vh'}}
              alt = "?"
          />
          
          
          <nav className= {styles.testnav}>
                <Link to="/parcels"  className = {styles.myparcels_link} > Parcels </Link>
            <Link to={`/`} className = {styles.myparcels_link} onClick={handleLogout}> Logout  </Link> 
            <Link to={`/Settings`}  className = {styles.myparcels_link}> Settings  </Link> 
          </nav>



          <div className={styles.divP}>
          <div className = {styles.divpTable}>
            <table className = {styles.pTable}>
              <thead>
              <tr>
                <th className = {styles.pth} > Parcel ID </th>
                <th className = {styles.pth} > Date </th>
                <th className = {styles.pth} > Status </th>
              </tr>
             </thead>
              <tbody>
                {parcels.length > 0 ? (
                parcels.map((parcel) => (
                  <Parcel
                    parcelID={parcel.id}
                    date={parcel.dateCreated}
                    status={parcel.status}
                    role={parcel.role}
                    key={parcel.id}
                  />

                ))) : (
                  <tr>
                    <td className = {styles.tableC}></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          </div>
    </div>
  );
};

export default ParcelsView;