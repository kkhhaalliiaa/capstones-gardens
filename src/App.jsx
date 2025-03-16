import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import Team from "./pages/Team.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Plants from "./pages/Plants.jsx";
import User from "./pages/User.jsx";
import Admin from "./pages/Admin.jsx";
import Chatbot from "./components/Chatbot.jsx";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/team" element={<Team />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/plants" element={<Plants />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
        <Chatbot />
        <Footer />
      </Router>
    </>
  );
}

export default App;
