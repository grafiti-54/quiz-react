import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Header";
import Landing from "../Landing";
import Footer from "../Footer";
import Welcome from "../Welcome";
import Login from "../Login";
import Signup from "../Signup";
import ErrorPage from "../ErrorPage";
import ForgetPassword from "../ForgetPassword";
import "../../App.css";
import {IconContext} from "react-icons"; // importation des logos dans un provider pour pouvoir les utiliser dans tout le projet

// Importer  la dependance pour faire le router depuis la console npm install --save react-router-dom
//puis faire l'import

function App() {
  return (
    <Router>
    <IconContext.Provider value={{ style: {verticalAlign: 'middle'}}}>
      <Header />
      
      <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route exact path="/welcome" element={<Welcome/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/forgetpassword" element={<ForgetPassword/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>

      <Footer />
      </IconContext.Provider>
    </Router>
  );
}

export default App;
