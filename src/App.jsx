import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  //Example API Calls
  // https://api.openbrewerydb.org/v1/breweries?by_dist=32.88313237,-117.1649842&per_page=3

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }
  
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <>

    </>
  )
}

export default App
