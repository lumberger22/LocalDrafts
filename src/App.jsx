import React, { useState, useEffect } from 'react'
import Card from "./Components/Card.jsx"
import Header from "./Components/Header.jsx"
import Map from "./Components/Map.jsx"
import About from "./Components/About.jsx"
import './App.css'

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    const fetchBreweryData = async () => {
      const response = await fetch(
        `https://api.openbrewerydb.org/breweries?by_dist=${latitude},${longitude}&per_page=15`
      );
      const json = await response.json();
      setList(json);
      setFilteredResults(json);
      console.log(json);
    };
  
    if (latitude && longitude) {
      fetchBreweryData().catch(console.error);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    filterBreweries();
  }, [list, searchInput, selectedTypes]);

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

  const filterBreweries = () => {
    let result = list;
  
    if (searchInput) {
      result = result.filter((brewery) =>
        brewery?.name?.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
  
    if (selectedTypes.length > 0) {
      result = result.filter((brewery) =>
        selectedTypes.includes(brewery.brewery_type)
      );
    }
    
    console.log('Filtering by types:', selectedTypes);
    console.log('Filtered Results:', result);
    setFilteredResults(result);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
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

  const toggleFilter = (value) => {
    setSelectedTypes(current => {
      // Check if the value is already selected
      if (current.includes(value)) {
        // Remove it if it was already selected
        return current.filter(type => type !== value);
      } else {
        // Add it if it wasn't selected
        return [...current, value];
      }
    });
  }; 

  return (
    <>
      <div className='whole--page'>
        <div className='non-footer'>
          <Header />
          <div className='content--section' id='title'>
            <h1 className='content--head--title'>Local Drafts</h1>
            <h2 className='content--head--subtitle'>Breweries Near Me</h2>
            <About />
            <div className='content--head' id='content'>
              <div className='card--container'>
                <div className='summary--card'>
                  <h2 className='summary-info'>
                    {filteredResults.length}  
                  </h2>
                  {filteredResults.length === 1 ? (
                    <h2 className='summary--label'>Brewery Shown</h2>
                  ) : (
                    <h2 className='summary--label'>Breweries Shown</h2>
                  )}
                </div>
                <div className='summary--card'> 
                    {latitude != "" && longitude != "" && list.length > 0 ? (
                      <h2 className='summary--label'>Closest Brewery: {haversineDistance(point1, point2, true).toFixed(2)} Miles</h2>
                    ) : null }
                </div>
              </div>
              {latitude !== ""  && list.length > 0 ? (
                <Map className='map' lat={latitude} list={list} filtered={filteredResults} long={longitude}/>
              ): (
                null
              )} 
            </div>
            <div className='brewery--data'>
              <div className='search--features'>
                <input
                  id='search--bar'
                  type="text"
                  placeholder="Search Name..."
                  onChange={(e) => searchItems(e.target.value)}
                />
                <div className='radio--filters'>
                  <h4>Filter Type: </h4>
                  <ul>
                    {['micro', 'nano', 'regional', 'brewpub', 'large', 'planning', 'bar'].map((type) => (
                      <li key={type}>
                        <label>
                          <input
                            type="checkbox"
                            className='checkbox'
                            value={type}
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleFilter(type)}
                          />
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <hr />
              <div className='brewery--container'>
                {filteredResults.length > 0 ? (
                  filteredResults.map((brewery, index) => (
                    <Card key={index} brewery={brewery} />
                  ))
                ) : (
                  <p>{list.length > 0 ? "No results found." : "Enable location accessibility to use Local Drafts"}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <footer className='footer--section'>
            <h3>Local Drafts</h3>
            <h3>Created By Lucas Umberger</h3>
        </footer>
      </div>
    </>
  )
}

export default App
