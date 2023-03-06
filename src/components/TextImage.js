import { Typography } from '@mui/material'
import React from 'react'
import audiImage from '../Images/audi.jpg'
import TextImageStyle from './TextImage.module.css'
const TextImage = () => {

  return (
    <>
    <div className={TextImageStyle.imageContainer}>
        
        <div className={TextImageStyle.headingHome}>
              <Typography>
                <h1><i>Hello And Welcome To Conferencify:<br/> Your One Stop Solution for Conference Mangement</i></h1>
            </Typography>
        </div>

      
    </div>
    </>
    
  )
}

export default TextImage