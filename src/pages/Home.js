import React from 'react'
import Navbar from '../components/Navbar'
import TextImage from '../components/TextImage'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import homeClasses from './home.module.css'
const Home = () => {
  return (
    <>
      <div className={homeClasses.container}>
          <Navbar/>
          <div className={homeClasses.textimage}>
              <TextImage  />
          </div>
          <div className={homeClasses.cardHome}>
              <Cards />
          </div>
          <Footer/>
      </div>
    </>

  )
};

export default Home