import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route,Routes} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AddEmployee from './components/AddEmployee'
import EditEmployee from './components/EditEmployee';
import ViewEmployee from './components/ViewEmployee';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App/>} />
      <Route exact path="/addEmployee" element={<AddEmployee/>}/>
      <Route exact path="/editEmployee" element={<EditEmployee/>}/>
      <Route exact path="/viewEmployee" element={<ViewEmployee/>}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
