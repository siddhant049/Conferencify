import React from 'react'
import homeClasses from '../pages/home.module.css'
const HomeAbout = () => {
  return (
    <>

          
                <div id ="about" className={homeClasses['story__pictures']}>
                </div>

                <div className={homeClasses['story__content']}>
                  
                  <h2 style={{marginBottom:'10px'}}className={`${homeClasses['heading-2']} ${homeClasses['heading-2--dark mb-md']}`}>
                    About Conferencify <br/>
                  </h2>
                  <p className={homeClasses['story__text']}>
                  Conferencify is a unique website which came into 
                  existence when there was a need to resolve the problem of 
                  conference management. Conferences are hosted on many 
                  different websites but all of them have their shortcomings. 
                  The real idea behind creation of conferencify was to eliminate
                  these problems faced by researchers, authors throughout 
                  the world.Best in class website with features like conference
                   management, plagiarism check , conference hosting Android many
                    more. Conferencify is on its way to become the one stop 
                    solution for conference related services. We at conferencify
                     believe that all problems in the world can be solved using
                      technology and conference management being one of the.
                  </p>
                  
                </div>
           
                
    </>
  )
}

export default HomeAbout