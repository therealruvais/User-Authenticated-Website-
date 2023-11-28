import React from 'react'
import './App.css'
import { Route , Routes , } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Contact from './components/contact/Contact'
import About from './components/about/About'
import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import { useSelector } from 'react-redux'

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  console.log(isLoggedIn)
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route
            path='/home'
            element={<Home />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
            index
            element={<Login />}
          />
          {/* <Route
            path='/logout'
            element={<Login />}
          /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App