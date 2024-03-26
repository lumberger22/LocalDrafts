import React, { useState, useEffect } from 'react'
import Card from "./Components/Card.jsx"
import Header from "./Components/Header.jsx"
import List from "./Components/List.jsx"
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
      <div className='whole--page'>
        <Header/>
        <div className='content--section'>
          <div className='card--container'>
            <Card/>
            <Card/>
            <Card/>
          </div>
          <List/>
        </div>
      </div>
    </>
  )
}

export default App
