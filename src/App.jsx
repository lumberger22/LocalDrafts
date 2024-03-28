import React, { useState, useEffect } from 'react'
import Card from "./Components/Card.jsx"
import Header from "./Components/Header.jsx"
import Map from "./Components/Map.jsx"
import './App.css'

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchBreweryData = async () => {
      const response = await fetch(
        `https://api.openbrewerydb.org/breweries?by_dist=${latitude},${longitude}&per_page=15`
      );
      const json = await response.json();
      setList(json);
      console.log(json);
    };
  
    if (latitude && longitude) {
      fetchBreweryData().catch(console.error);
    }
  }, [latitude, longitude]);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Geolocation not supported");
  }
  
  function success(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.filter((brewery) =>
        brewery?.name?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list);
    }
    console.log(filteredResults.length);
  };

  const haversineDistance = (coords1, coords2, isMiles = false) => {
    const toRadian = angle => (Math.PI / 180) * angle;
    const distance = (a, b) => (Math.PI / 180) * (b - a);
    const RADIUS_OF_EARTH_IN_KM = 6371;
  
    const dLat = distance(coords1.lat, coords2.lat);
    const dLon = distance(coords1.lng, coords2.lng);
  
    const lat1 = toRadian(coords1.lat);
    const lat2 = toRadian(coords2.lat);
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    let totalDistance = RADIUS_OF_EARTH_IN_KM * c;
  
    if (isMiles) {
      totalDistance /= 1.60934;
    }
  
    return totalDistance;
  };

  const point1 = { lat: latitude, lng: longitude }; // User Location
  let point2 = {};
  if (list.length  > 0) {
    point2 = { lat: list[0].latitude, lng: list[0].longitude };
  }
  

  return (
    <>
      <div className='whole--page'>
        <Header />
        <div className='content--section'>
          <div className='content--head'>
            <div className='card--container'>
              <div className='summary--card'>
                <h2 className='summary-info'>
                  {searchInput.length > 0 ? filteredResults.length : list.length}
                </h2>
                <h2 className='summary--label'>Breweries Shown</h2>
              </div>
              <div className='summary--card'> 
                  {latitude != "" && longitude != "" && list.length > 0 ? (
                    <h2 className='summary--label'>Closest Brewery: {haversineDistance(point1, point2, true).toFixed(2)} Miles</h2>
                  ) : null }
              </div>
            </div>
            {latitude !== ""  && list.length > 0 ? (
              <Map lat={latitude} list={list} filtered={filteredResults} long={longitude}/>
            ): (
              null
            )} 
          </div>
                     
          <div className='brewery--data'>
            <h1>Breweries Near Me</h1>
            <input
              id='search--bar'
              type="text"
              placeholder="Search Name..."
              onChange={(e) => searchItems(e.target.value)}
            />
            <hr />
            <div className='brewery--container'>
              {searchInput.length > 0 ? (
                <>
                  {filteredResults.length > 0 ? (
                    filteredResults.map((brewery, index) => (
                      <Card key={index} brewery={brewery} />
                    ))
                  ) : (
                    <p>No results found.</p>
                  )}
                </>
              ) : list.length > 0 ? (
                list.map((brewery, index) => (
                  <Card key={index} brewery={brewery} />
                ))
              ) : (
                <p>Enable location accessibility to use Local Drafts</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
