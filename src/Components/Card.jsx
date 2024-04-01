import React from "react";
import { Link } from "react-router-dom";

export default function Card({ brewery }) {

    return (
        <>
            <div key={brewery.id} className='card'>
                <Link to={`/LocalDrafts/breweryDetails/${brewery.id}`} className="card--link">
                    <h4 className="card--title">{brewery.name}</h4>
                </Link>
                <p className="card--info">Type: {brewery.brewery_type}</p>
                <p className="card--address">Address: {brewery.street}, {brewery.city}, {brewery.state}</p>
            </div>
        </>
    )
}