import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailView from '/routes/DetailView';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index={false} path="/LocalDrafts/breweryDetails/:id" element={<DetailView />} />
      <Route path="/LocalDrafts/" element={<App />} />
    </Routes>
  </BrowserRouter>
)
