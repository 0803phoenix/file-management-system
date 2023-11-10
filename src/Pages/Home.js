import React, { useState } from 'react'
import Navbar from '../components/navbar'

function Home() {
  return (
    <div>
        <Navbar/>
        <div className="container d-flex justify-content-center mt-5">
            <p className='mt-5'>Welcome to New file management system</p>
        </div>
    </div>
  )
}

export default Home