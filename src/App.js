import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Gnome from "./views/Gnome";
import Home from "./views/Home";
import Login from "./views/Login";
import Map from "./views/Map";
import PageNotFound from "./views/PageNotFound";
import SignUp from "./views/SignUp";
import UserInfo from "./views/UserInfo";
import {AUTH_KEY} from "./constants";

function App() {
  return (
    //some pages are available only to logged in users
    //other users are redirected back to the main page
      <div className="App">
          <Router>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/map" element={localStorage.getItem(AUTH_KEY) === "true" ? <Map/> : <Navigate to="/"/>}/>
                  <Route path="/userinfo" element={localStorage.getItem(AUTH_KEY) === "true" ? <UserInfo/> : <Navigate to="/"/>}/>
                  <Route path="/gnome" element={localStorage.getItem(AUTH_KEY) === "true" ? <Gnome/> : <Navigate to="/"/>}/>
                  <Route path="*" element={<PageNotFound />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
