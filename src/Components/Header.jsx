import React, { useEffect, useState } from "react";

export default function Header() {

    return (
        <>
            <div className="header">
                <div className="header--title--container">
                        <img className="header--title--icon" src="/beer-icon.png" alt="Local Drafts Icon"/>
                        <h1 className="header--title">LocalDrafts</h1> 
                </div>
                <br/>
                <a className='header--link' href="#title">
                    <h2 className="header--option">Home</h2>
                </a>
                <a className='header--link' href="#about">
                    <h2 className="header--option">About</h2>
                </a>
                <a className='header--link' href="#content">
                    <h2 className="header--option">Dashboard</h2>
                </a>
            </div>            
        </>
    )
}