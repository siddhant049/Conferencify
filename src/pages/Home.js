import React from 'react'
import Navbar from '../components/Navbar'
import TextImage from '../components/TextImage'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import homeClasses from './home.module.css'
const Home = () => {
  return (
    <>
      <div >
          <Navbar/>
          <div className={` ${homeClasses['container']} ${homeClasses['body']} `}>
          <div className={homeClasses['sidebar']}>
            <button className={homeClasses['nav-btn']}></button>
         </div>

                <header className={homeClasses['header']}>
                  <img src="img/logo.png" alt="Nexter logo" className={homeClasses.header__logo} />
                  <h3 className={homeClasses['heading-3']}>Conferencify</h3>
                  <h1 className={homeClasses['heading-1']}>Your One Stop Solution for Conference Mangement</h1>
                  <button className={`${homeClasses['btn']} ${homeClasses['header__btn']}`}>Know More</button>
                   {/* <div className="header__seenon-text">Seen on</div>  */}
                </header>

                <div className={homeClasses.realtors}>
                  <h3 className={homeClasses.heading-3}>Top 3 Realtors</h3>
                  <div className={homeClasses.realtors__list}>
                    <img src="img/realtor-1.jpeg" alt="Realtor 1" className={homeClasses.realtors__img}/>
                    <div className={homeClasses.realtors__details}>
                      <h4 className={homeClasses.heading-4 .heading-4}>Erik Feinman</h4>
                      <p className="realtors__sold">245 houses sold</p>
                    </div>

                    <img src="img/realtor-2.jpeg" alt="Realtor 2" className={homeClasses.realtors__img} />
                    <div className={homeClasses.realtors__details}>
                      <h4 className={`${homeClasses['heading-4']}`}>Kim Brown</h4>
                      <p className={homeClasses.realtors__sold}>212 houses sold</p>
                    </div>

                    <img src="img/realtor-3.jpeg" alt="Realtor 3" className={homeClasses.realtors__img} />
                    <div className={homeClasses.realtors__details}>
                      <h4 className={`${homeClasses['heading-4']} `}>Toby Ramsey</h4>
                      <p className={homeClasses.realtors__sold}>198 houses sold</p>
                    </div>
                  </div>
                </div>

                <section className={homeClasses.features}>
                  <div className={homeClasses.feature}>
                    <svg className={homeClasses.feature__icon}>
                      {/* <use xlink:href="img/sprite.svg#icon-global"></use> */}
                    </svg>
                    <h4 className={`${homeClasses['heading-4']} ${homeClasses['heading-4--dark']}`}>Plagirism Check</h4>
                    <p className={homeClasses.feature__text}>
                      First in  Plagirism Check.Hassle Free Process.Easily check papers
                      for any plagirism
                    </p>
                  </div>

                  <div className={homeClasses.feature}>
                    <svg className={homeClasses.feature__icon}>
                      {/* <use xlink:href="img/sprite.svg#icon-trophy"></use> */}
                    </svg>
                    <h4 className={`${homeClasses['heading-4']} ${homeClasses['heading-4--dark']}`}>Easy Conference Management</h4>
                    <p className="feature__text">
                      Manage Your Conferences at a single place , long gone are the days
                      where conference management was difficult
                    </p>
                  </div>

                  <div className={homeClasses.feature}>
                    <svg className={homeClasses.feature__icon}>
                      {/* <use xlink:href="img/sprite.svg#icon-map-pin"></use> */}
                    </svg>
                    <h4 className={homeClasses.heading-4 .heading-4}>
                      Information Download On the Go
                    </h4>
                    <p className={homeClasses.feature__text}>
                      Download Information anywhere anytime , information easily available
                      at a click of the buttom
                    </p>
                  </div>

                  <div className={homeClasses.feature}>
                    <svg className="feature__icon">
                      {/* <use xlink:href="img/sprite.svg#icon-key"></use> */}
                    </svg>
                    <h4 className={homeClasses.heading-4 .heading-4}>Call For Papers</h4>
                    <p className={homeClasses.feature__text}>
                      Call for papers , One of the Key Features of This Website . Bringing
                      all conference related solutions under one roof
                    </p>
                  </div>

                  <div className={homeClasses.feature}>
                    <svg className={homeClasses.feature__icon}>
                      {/* <use xlink:href="img/sprite.svg#icon-presentation"></use> */}
                    </svg>
                    <h4 className={homeClasses.heading-4 .heading-4}>Top 1% realtors</h4>
                    <p className={homeClasses.feature__text}>
                      Quidem consequatur harum, voluptatum mollitia quae. Tenetur distinctio
                      necessitatibus pariatur voluptatibus.
                    </p>
                  </div>

                  <div className={homeClasses.feature}>
                    <svg className={homeClasses.feature__icon}>
                      {/* <use xlink:href="img/sprite.svg#icon-lock"></use> */}
                    </svg>
                    <h4 className={`${homeClasses['heading-4']} ${homeClasses['heading-4--dark']}`}>Secure payments on nexter</h4>
                    <p className={homeClasses.feature__text}>
                      Pariatur voluptatibus quidem consequatur harum, voluptatum mollitia
                      quae.
                    </p>
                  </div>
                </section>

                <div className={homeClasses.story__pictures}>
                  <img
                    src="img/story-1.jpeg"
                    alt="Couple with new house"
                    className="story__img--1"
                  />
                  <img src="img/story-2.jpeg" alt="New house" className="story__img--2" />
                </div>

                <div className="story__content">
                  <h3 className="heading-3 mb-sm">Happy Customers</h3>
                  <h2 className="heading-2 heading-2--dark mb-md">
                    &ldquo;The best decision of our lives&rdquo;
                  </h2>
                  <p className="story__text">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                    distinctio necessitatibus pariatur voluptatibus. Quidem consequatur
                    harum volupta!
                  </p>
                  <button className="btn">Find your own home</button>
                </div>

                <section className="homes">
                  <div className="home">
                    <img src="img/house-1.jpeg" alt="House 1" className="home__img" />
                    <svg className="home__like">
                      {/* <use xlink:href="img/sprite.svg#icon-heart-full"></use> */}
                    </svg>
                    <h5 className="home__name">Beautiful Familiy House</h5>
                    <div className="home__location">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-map-pin"></use> */}
                      </svg>
                      <p>USA</p>
                    </div>
                    <div className="home__rooms">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-profile-male"></use> */}
                      </svg>
                      <p>5 rooms</p>
                    </div>
                    <div className="home__area">
                   
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-expand"></use> */}
                      </svg>
                      <p>325 m<sup>2</sup></p>
                    </div>
                    <div className="home__price">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-key"></use> */}
                      </svg>
                      <p>$1,200,000</p>
                    </div>
                    <button className="btn home__btn">Contact realtor</button>
                  </div>

                  <div className="home">
                    <img src="img/house-2.jpeg" alt="House 2" className="home__img" />
                    <svg className="home__like">
                      {/* <use xlink:href="img/sprite.svg#icon-heart-full"></use> */}
                    </svg>
                    <h5 className="home__name">Modern Glass Villa</h5>
                    <div className="home__location">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-map-pin"></use> */}
                      </svg>
                      <p>Canada</p>
                    </div>
                    <div className="home__rooms">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-profile-male"></use> */}
                      </svg>
                      <p>6 rooms</p>
                    </div>
                    <div className="home__area">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-expand"></use> */}
                      </svg>
                      <p>450 m<sup>2</sup></p>
                    </div>
                    <div className="home__price">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-key"></use> */}
                      </svg>
                      <p>$2,750,000</p>
                    </div>
                    <button className="btn home__btn">Contact realtor</button>
                  </div>

                  <div className="home">
                    <img src="img/house-3.jpeg" alt="House 3" className="home__img" />
                    <svg className="home__like">
                      {/* <use xlink:href="img/sprite.svg#icon-heart-full"></use> */}
                    </svg>
                    <h5 className="home__name">Cozy Country House</h5>
                    <div className="home__location">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-map-pin"></use> */}
                      </svg>
                      <p>UK</p>
                    </div>
                    <div className="home__rooms">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-profile-male"></use> */}
                      </svg>
                      <p>4 rooms</p>
                    </div>
                    <div className="home__area">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-expand"></use> */}
                      </svg>
                      <p>250 m<sup>2</sup></p>
                    </div>
                    <div className="home__price">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-key"></use> */}
                      </svg>
                      <p>$850,000</p>
                    </div>
                    <button className="btn home__btn">Contact realtor</button>
                  </div>

                  <div className="home">
                    <img src="img/house-4.jpeg" alt="House 4" className="home__img" />
                    <svg className="home__like">
                      {/* <use xlink:href="img/sprite.svg#icon-heart-full"></use> */}
                    </svg>
                    <h5 className="home__name">Large Rustical Villa</h5>
                    <div className="home__location">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-map-pin"></use> */}
                      </svg>
                      <p>Portugal</p>
                    </div>
                    <div className="home__rooms">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-profile-male"></use> */}
                      </svg>
                      <p>6 rooms</p>
                    </div>
                    <div className="home__area">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-expand"></use> */}
                      </svg>
                      <p>480 m<sup>2</sup></p>
                    </div>
                    <div className="home__price">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-key"></use> */}
                      </svg>
                      <p>$1,950,000</p>
                    </div>
                    <button className="btn home__btn">Contact realtor</button>
                  </div>

                  <div className="home">
                    <img src="img/house-5.jpeg" alt="House 5" className="home__img" />
                    <svg className="home__like">
                      {/* <use xlink:href="img/sprite.svg#icon-heart-full"></use> */}
                    </svg>
                    <h5 className="home__name">Majestic Palace House</h5>
                    <div className="home__location">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-map-pin"></use> */}
                      </svg>
                      <p>Germany</p>
                    </div>
                    <div className="home__rooms">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-profile-male"></use> */}
                      </svg>
                      <p>18 rooms</p>
                    </div>
                    <div className="home__area">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-expand"></use> */}
                      </svg>
                      <p>4230 m<sup>2</sup></p>
                    </div>
                    <div className="home__price">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-key"></use> */}
                      </svg>
                      <p>$9,500,000</p>
                    </div>
                    <button className="btn home__btn">Contact realtor</button>
                  </div>

                  <div className="home">
                    <img src="img/house-6.jpeg" alt="House 6" className="home__img" />
                    <svg className="home__like">
                      {/* <use xlink:href="img/sprite.svg#icon-heart-full"></use> */}
                    </svg>
                    <h5 className="home__name">Modern Familiy Apartment</h5>
                    <div className="home__location">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-map-pin"></use> */}
                      </svg>
                      <p>Italy</p>
                    </div>
                    <div className="home__rooms">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-profile-male"></use> */}
                      </svg>
                      <p>3 rooms</p>
                    </div>
                    <div className="home__area">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-expand"></use> */}
                      </svg>
                      <p>180 m<sup>2</sup></p>
                    </div>
                    <div className="home__price">
                      <svg>
                        {/* <use xlink:href="img/sprite.svg#icon-key"></use> */}
                      </svg>
                      <p>$600,000</p>
                    </div>
                    <button className="btn home__btn">Contact realtor</button>
                  </div>
                </section>

                
          </div>
          <Footer/>
      </div>
    </>

  )
};

export default Home