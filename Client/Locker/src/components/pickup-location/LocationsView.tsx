import styles from "./LocationsView.module.css";
import PickupLocation from "./PickupLocation";
interface Location {
  name: string;
  id: number;
  address: string;
}

interface LocationViewProps {
  locations: Location[];
}


const LocationsView = ({locations} : LocationViewProps) : JSX.Element => {
  return (
    <div className={styles.locations} data-testid="location">
      {locations.map((location) => (
        <PickupLocation
          key={location.id}
          name={location.name}
          id={location.id}
          address={location.address}
        />
      ))}
    </div>
  );
};

export default LocationsView;
