import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailView from '/routes/DetailView';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
    <Route index={false} path="/breweryDetails/:name" element={<DetailView />} />
        <Route index={true} element={<App />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
              <Link style={{ color: "white" }} to="/">
                Back to Home
              </Link>
            </main>
          }
        />
    </Routes>
  </BrowserRouter>
)
