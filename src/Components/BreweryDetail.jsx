import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BreweryDetail() {

    let params = useParams();
    const [currentBrewery, setCurrentBrewery] = useState(null);

    useEffect(() => {
        const getBreweryDetail = async () => {
          const description = await fetch(
            `https://api.openbrewerydb.org/v1/breweries/${params.id}`
          );

          const descripJson = await description.json();
          setCurrentBrewery(descripJson);
        };
    
        getBreweryDetail().catch(console.error);
      }, [params.id]);

      const typeDescriptions = {
        micro : "Micro Brewery - Most craft breweries. For example, Samual Adams is still considered a micro brewery.",
        nano : "Nano Brewery - An extremely small brewery which typically only distributes locally.",
        regional : "Regional - A regional location of an expanded brewery. Ex. Sierra Nevada’s Asheville, NC location.",
        brewpub : "Brewpub - A beer-focused restaurant or restaurant/bar with a brewery on-premise.",
        planning : "Planning - A brewery in planning or not yet opened to the public.",
        contract : "Contract - A brewery that uses another brewery’s equipment.",
        proprietor : "Proprietor - Similar to contract brewing but refers more to a brewery incubator.",
        closed : "Closed - A location which has been closed."
      };

    return (
        <>
        {currentBrewery !== null ? (
            <>
                <div className="detail--section">
                  <div className="detail--card">
                    <h1>{currentBrewery.name}</h1>
                    <h3 className="detail--address">Address: {currentBrewery.street}, {currentBrewery.city}, {currentBrewery.state}</h3>
                    <h2>Brewery Type | <span className="detail--type">{currentBrewery.brewery_type}</span></h2>
                    <div className="detail--type--definition">
                      <h3>{typeDescriptions[currentBrewery.brewery_type]}</h3>
                    </div>
                    <div className="detail--website--section">
                      <div>
                        <h2>More info <span>&#8594;</span></h2> 
                      </div>
                        <div className="detail--website">
                          <h2><a 
                            className="detail--link" 
                            href={currentBrewery.website_url} 
                            target="_blank">
                              {currentBrewery.name} Website
                          </a></h2>
                        </div>
                    </div>
                  </div>
                </div>
            </>
        ) : null}
        </>
    )
}