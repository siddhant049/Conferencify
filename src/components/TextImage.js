import { Typography } from '@mui/material'
import React from 'react'
import audiImage from '../Images/audi.jpg'
import TextImageStyle from './TextImage.module.css'
const TextImage = () => {

  return (
    <>
    <div className={TextImageStyle.imageContainer}>
        <br/>
        <br/>
        <br/>
        <br/>
     <Typography>
      Hello And Welcome To Conferencify Your One Stop Solution for Conference Mangement
      </Typography>
      
    </div>
    </>
    
  )
}

export default TextImage