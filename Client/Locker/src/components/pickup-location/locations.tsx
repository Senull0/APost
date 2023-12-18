const locations = [
  {
    id: 1,
    name: "Automaatti Sokos Herkku Oulu",
    address: "Isokatu 25, 90104 OULU",
  },
  {
    id: 2,
    name: "Automaatti Isokatu 33",
    address: "Isokatu 33, 90105 OULU",
  },
  {
    id: 3,
    name: "Automaatti Kauppakortteli Pekuri",
    address: "Kauppurienkatu 10, 90104 OULU",
  },
  {
    id: 4,
    name: "Automaatti Lidl Oulu keskusta",
    address: "Isokatu 51, 90104 OULU",
  },
  {
    id: 5,
    name: "Automaatti K-Market Asemantorni",
    address: "Rautatienkatu 13, 90104 OULU",
  },

];

// Dummy function for fetching location details (this would be replaced by an API call in a real-world app)
export const getLocationById = (id : number) => {
  return locations.find((location) => {
    return location.id === id;
  });
};

// Dummy function for fetching all locations (this would be replaced by an API call in a real-world app)
export const getAllLocations = () => {
  return locations;
};
