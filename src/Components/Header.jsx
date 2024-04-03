import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Icon from "/beer-icon.png";

export default function Header() {

    const navigate = useNavigate();

    return (
        <>
            <div className="header">
                <div className="header--title--container">
                        <img className="header--title--icon" src={Icon} alt="Local Drafts Icon"/>
                        <h1 className="header--title">LocalDrafts</h1> 
                </div>
                <br/>
                {window.location.pathname !== "/LocalDrafts/" ? (
                    <button className='header--link go--back' onClick={() => navigate(-1)}>
                        <h2 className="header--option">Go Back</h2>
                    </button>
                ) : (
                    <>
                        <a className='header--link' href="#title">
                            <h2 className="header--option">Home</h2>
                        </a>
                        <a className='header--link' href="#about">
                            <h2 className="header--option">About</h2>
                        </a>
                        <a className='header--link' href="#content">
                            <h2 className="header--option">Dashboard</h2>
                        </a>
                    </>
                )}
            </div>            
        </>
    )
}