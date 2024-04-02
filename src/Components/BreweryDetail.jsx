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

    return (
        <>
        {currentBrewery !== null ? (
            <>
                <div className="detail--section">
                    <h1>{currentBrewery.name}</h1>
                </div>
            </>
        ) : null}
        </>
    )
}