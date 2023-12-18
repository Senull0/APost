import React, { useState} from 'react';
import styles from './ParcelFinder.module.css'
import LocationsView from "../pickup-location/LocationsView";



interface ParcelFinderState {
  zipCode: string;
  locations: any[];
  searchStatus: string;
}


const ParcelFinder: React.FC = () =>  {
  const baseURL: string = import.meta.env.VITE_APP_BASEURL;

  const [state, setState] = useState<ParcelFinderState>({
    zipCode: '',
    locations: [],
    searchStatus: '',
  });


  const findZIPCode = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${baseURL}/api/lockers/zipcode/${state.zipCode}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setState({
            ...state,
            searchStatus: "ok",
            locations: data,
        })
        } else {
          setState({
            ...state,
            searchStatus: "No lockers found here. Please enter a different ZIP",
        })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }



 
  return (
    <div className={styles.container}>
        <div className = {styles.parent_mainText}>
          <div role = "welcomeText" className = {styles.mainText}>
            <p><span className = {styles.trackWord}>Pickup</span></p>
            <p><span className = {styles.andWord}>Your</span></p>
            <p><span className = {styles.traceWord}>Parcel</span></p>
          </div>


          


        <div className={styles.searchBox} data-testid="searchBox">
          <form onSubmit={findZIPCode}  className={styles.searchBox}>
          <input 
              aria-label="zip" 
              name="zip" 
              type="text" 
              placeholder="ZIP Code" 
              className={styles.searchinput} 
              onChange={(event) => setState({ ...state, zipCode: event.target.value })} 
              value={state.zipCode}
              pattern="[0-9]{5}" 
              required
            />
          <button type = "submit">Find</button>
          </form>
        </div>
        {(state.locations.length > 0 && state.searchStatus === 'ok') ? (<LocationsView locations={state.locations} />) : (<p className={styles.status}>{state.searchStatus}</p>)}
        </div>
      </div>
  );
}

export default ParcelFinder;
