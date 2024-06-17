import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Gnome from "./views/Gnome";
import Home from "./views/Home";
import Login from "./views/Login";
import Map from "./views/Map";
import PageNotFound from "./views/PageNotFound";
import SignUp from "./views/SignUp";
import UserInfo from "./views/UserInfo";

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
                  <Route path="/map" element={<Map/>}/>
                  <Route path="/userinfo" element={<UserInfo/>}/>
                  <Route path="/gnome" element={ <Gnome/>}/>
                  <Route path="*" element={<PageNotFound />} />
              </Routes>
          </Router>
      </div>
  );
}
//<Route path="/map" element={localStorage.getItem(AUTH_KEY) === "true" ? <Map/> : <Home />}/>

export default App;
