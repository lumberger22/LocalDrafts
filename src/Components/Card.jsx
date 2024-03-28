import React from "react";

export default function Card({ brewery }) {

    return (
        <>
            <div key={brewery.id} className='card'>
                <a href={brewery.website_url} target='_blank' className="card--link">
                    <h4 className="card--title">{brewery.name}</h4>
                </a>
                <p className="card--info">Type: {brewery.brewery_type}</p>
                <p className="card--info">{brewery.street}, {brewery.city}, {brewery.state}</p>
            </div>
        </>
    )
}