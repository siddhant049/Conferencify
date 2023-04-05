import React from 'react'
import Navbar from '../components/Navbar'
import TextImage from '../components/TextImage'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import homeClasses from './home.module.css'
import HomeAbout from '../components/HomeAbout'
const Home = () => {
  return (
    <>
      <div >
          <Navbar/>
          <div style={{marginTop:'50px'}}className={` ${homeClasses['container']} ${homeClasses['body']} `}>
          <div className={homeClasses['sidebar']}>
            
         </div>
       
                <header className={homeClasses['header']}>
                  {/* <img src="img/logo.png" alt="Nexter logo" className={homeClasses.header__logo} /> */}
                  <h3 className={homeClasses['heading-3']}>Conferencify</h3>
                  <h1 className={homeClasses['heading-1']}>Your One Stop Solution for Conference Mangement</h1>
                  <button className={`${homeClasses['btn']} ${homeClasses['header__btn']}`}>Know More</button>
                   {/* <div className="header__seenon-text">Seen on</div>  */}
                </header> 

                <div className={homeClasses['realtors']}>
                  <h3 className={homeClasses['heading-3']}>Top 3 Realtors</h3>
                  <div className={homeClasses['realtors__list']}>
                    <img src="img/realtor-1.jpeg" alt="Realtor 1" className={homeClasses['realtors__img']}/>
                    <div className={homeClasses['realtors__details']}> 
                      <h4 className={`${homeClasses['heading-4']} ${homeClasses['heading-4']}`}>Erik Feinman</h4>
                      <p className={homeClasses['realtors__sold']}>245 houses sold</p>
                    </div>

                    <img src="img/realtor-2.jpeg" alt="Realtor 2" className={homeClasses['realtors__img']}/>
                    <div className={homeClasses['realtors__details']}>
                      <h4 className={`${homeClasses['heading-4']}`}>Kim Brown</h4>
                      <p className={homeClasses['realtors__sold']}>212 houses sold</p>
                    </div>

                    <img src="img/realtor-3.jpeg" alt="Realtor 3" className={homeClasses['realtors__img']} />
                    <div className={homeClasses['realtors__details']}>
                      <h4 className={`${homeClasses['heading-4']} `}>Toby Ramsey</h4>
                      <p className={homeClasses['realtors__sold']}>198 houses sold</p>
                    </div>
                  </div>
                </div>
                


                <h4 className={`${homeClasses['topicHeading']}`}>Features </h4>
                <section className={homeClasses['features']}>
                  <div className={homeClasses['feature']}>
                   
                    <svg className={homeClasses['feature__icon']}>
                      {/* <use xlink:href="img/sprite.svg#icon-global"></use> */}
                    </svg>
                    <h4 className={`${homeClasses['heading-4']} ${homeClasses['heading-4--dark']}`}>Plagirism Check</h4>
                    <p className={homeClasses['feature__text']}>
                      First in  Plagirism Check.Hassle Free Process.Easily check papers
                      for any plagirism
                    </p>
                  </div>

                  <div className={homeClasses['feature']}>
                    <svg className={homeClasses['feature__icon']}>
                      {/* <use xlink:href="img/sprite.svg#icon-trophy"></use> */}
                    </svg>
                    <h4 className={`${homeClasses['heading-4']} ${homeClasses['heading-4--dark']}`}>Easy Conference Management</h4>
                    <p className={homeClasses['feature__text']}>
                      Manage Your Conferences at a single place , long gone are the days
                      where conference management was difficult
                    </p>
                  </div>

                  <div className={homeClasses['feature']}>
                    <svg className={homeClasses['feature__icon']}>
                      {/* <use xlink:href="img/sprite.svg#icon-map-pin"></use> */}
                    </svg>
                    <h4 className={`${homeClasses['heading-4']} ${homeClasses['heading-4']}`}>
                      Information Download On the Go
                    </h4>
                    <p className={homeClasses['feature__text']}>
                      Download Information anywhere anytime , information easily available
                      at a click of the buttom
                    </p>
                  </div>
                  
                  <div className={homeClasses['feature']}>
                    <svg className={homeClasses['feature__icon']}>
                      {/* <use xlink:href="img/sprite.svg#icon-lock"></use> */}
                    </svg>
                    <h4 className={`${homeClasses['heading-4']} ${homeClasses['heading-4--dark']}`}>Conference Hosting</h4>
                    <p className={homeClasses['feature__text']}>
                      Pariatur voluptatibus quidem consequatur harum, voluptatum mollitia
                      quae.
                    </p>
                  </div>
                </section>

                <HomeAbout id="about"/>
          </div>

          <Footer/>
      </div>
    </>

  )
};

export default Home