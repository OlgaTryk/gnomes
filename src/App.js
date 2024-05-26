import React from "react";
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/Login"
import Home from "./views/Home"
import SignUp from "./views/SignUp";
import Map from "./views/Map";
import PageNotFound from "./views/PageNotFound";
import UserInfo from "./views/UserInfo"

function App() {
    //TODO: require login for accessing some pages (once that's implemented)
  return (
      <div className="App">
          <Router>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/map" element={<Map />} />
                  <Route path="/userinfo" element={<UserInfo/>}/>
                  <Route path="*" element={<PageNotFound />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
