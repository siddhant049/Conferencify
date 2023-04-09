import React from 'react';
import styles from './profileheader.module.css';
import user from '../img/User.jpeg';
import EmailIcon from '@mui/icons-material/Email';

const ProfileHeader = ({ userData }) => {
  return (
    <>
      <section className={styles.profile}>
        <header className={styles.header}>
          <div className={styles.details}>
            <img src={user} alt='User' className={styles['profile-pic']} />
            <h1 className={styles.heading}>{userData.name}</h1>
            <div className={styles.location}>
              <br />
              <EmailIcon />
              <p>&nbsp; {userData.email}</p>
              <br />
              <br />
            </div>
            <div className={styles.stats}>
              <div className={styles['col-4']}>
                <h4>{userData.paperSubmissions.length}</h4>
                <p>Author</p>
              </div>
              <div className={styles['col-4']}>
                <h4>{userData.conferenceReviewer.length}</h4>
                <p>Reviewers</p>
              </div>
              <div className={styles['col-4']}>
                <h4>{userData.conferenceAdmin.length}</h4>
                <p>Admin</p>
              </div>
            </div>
          </div>
        </header>
      </section>
    </>
  );
};

export default ProfileHeader;
