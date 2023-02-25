import React from 'react'
import audiImage from '../Images/audi.jpg'
import TextImageStyle from './TextImage.module.css'
const TextImage = () => {

  return (
    <>
    <div className={TextImageStyle.container}>
      {/* <img src={audiImage} alt="Auditorium" style={{width:"100%"}}/> */}
       <div style={{backgroundImage:`url(${audiImage})`}}/>
    </div>
    </>
    
  )
}

export default TextImage