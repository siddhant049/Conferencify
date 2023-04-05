import React from 'react'
import homeClasses from '../pages/home.module.css'
const Footer = () => {
  return (
    <>
            <footer className ={homeClasses["footer"]}>
         
          <p className={homeClasses["copyright"]}>
            &copy; Copyright 2023 by SJS 
          </p>
        </footer>
    </>
  )
}

export default Footer