import React from 'react';
import Navbar from '../components/Navbar';
import TextImage from '../components/TextImage';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import homeClasses from './home.module.css';
import HomeAbout from '../components/HomeAbout';
import { motion } from 'framer-motion';
import AdbOutlinedIcon from '@mui/icons-material/AdbOutlined';
import { Button } from '@mui/material';
import apk from '../assets/android/Conferencify.apk';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        <div
          style={{ marginTop: '50px' }}
          className={` ${homeClasses['container']} ${homeClasses['body']} `}
        >
          <div className={homeClasses['sidebar']}></div>

          <header className={homeClasses['header']}>
            {/* <img src="img/logo.png" alt="Nexter logo" className={homeClasses.header__logo} /> */}
            <h3 className={homeClasses['heading-3']}>Conferencify</h3>
            <h1 className={homeClasses['heading-1']}>
              Your One Stop Solution for Conference Mangement
            </h1>
            <button
              className={`${homeClasses['btn']} ${homeClasses['header__btn']}`}
            >
              <a href='#features' className={homeClasses.anchorStyleRemove}>
                Know More
              </a>
            </button>
            {/* <div className="header__seenon-text">Seen on</div>  */}
          </header>

          <div className={homeClasses['realtors']}>
            <h3 className={homeClasses['heading-3']}>
              Download Android Application
            </h3>
            <div className={homeClasses['realtors__list']}>
              <a href={apk} className={homeClasses.anchorStyleRemove}>
                <Button
                  variant='contained'
                  startIcon={<AdbOutlinedIcon />}
                  sx={{ backgroundColor: '#c69963', padding: '10px' }}
                >
                  Download Now!
                </Button>
              </a>
            </div>
          </div>

          <h4 className={`${homeClasses['topicHeading']}`} id='features'>
            Features{' '}
          </h4>
          <section className={homeClasses['features']}>
            <div className={homeClasses['feature']}>
              <svg className={homeClasses['feature__icon']}>
                {/* <use xlink:href="img/sprite.svg#icon-global"></use> */}
              </svg>
              <h4
                className={`${homeClasses['heading-4']} ${homeClasses['heading-4--dark']}`}
              >
                Plagirism Check
              </h4>
              <p className={homeClasses['feature__text']}>
                First in Plagirism Check.Hassle Free Process.Easily check papers
                for any plagirism
              </p>
            </div>

            <div className={homeClasses['feature']}>
              <svg className={homeClasses['feature__icon']}>
                {/* <use xlink:href="img/sprite.svg#icon-trophy"></use> */}
              </svg>
              <h4
                className={`${homeClasses['heading-4']} ${homeClasses['heading-4--dark']}`}
              >
                Easy Conference Management
              </h4>
              <p className={homeClasses['feature__text']}>
                Manage Your Conferences at a single place , long gone are the
                days where conference management was difficult
              </p>
            </div>

            <div className={homeClasses['feature']}>
              <svg className={homeClasses['feature__icon']}>
                {/* <use xlink:href="img/sprite.svg#icon-map-pin"></use> */}
              </svg>
              <h4
                className={`${homeClasses['heading-4']} ${homeClasses['heading-4']}`}
              >
                Information Download On the Go
              </h4>
              <p className={homeClasses['feature__text']}>
                Download Information anywhere anytime , information easily
                available at a click of the button
              </p>
            </div>

            <div className={homeClasses['feature']}>
              <svg className={homeClasses['feature__icon']}>
                {/* <use xlink:href="img/sprite.svg#icon-lock"></use> */}
              </svg>
              <h4
                className={`${homeClasses['heading-4']} ${homeClasses['heading-4--dark']}`}
              >
                Conference Hosting
              </h4>
              <p className={homeClasses['feature__text']}>
                Host your conference with all the convenient features as a part
                of our offerings like CFP, plag check, etc.
              </p>
            </div>
          </section>

          <HomeAbout id='about' />
        </div>

        <Footer />
      </div>
    </motion.div>
  );
};

export default Home;
