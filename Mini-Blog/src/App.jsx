import { useState } from 'react'
import { Routes, Route } from "react-router"
import Home from './Pages/Home'
import Header from "./Pages/Header"
import Diisplay from "./Pages/Display"
import { BrowserRouter } from 'react-router'
import Login from "./Pages/Login"
import Adjust from "./Pages/Adjust"
import AddBlog from "./Pages/AddBlog"

function App() {



  return (
    <>

      <div >
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Blog" element={<Diisplay />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Adjust" element={<Adjust />} />
          <Route path="/AddBlog" element={<AddBlog />} />

        </Routes>


      </div >
    </>
  )
}

export default App
