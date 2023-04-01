import React from 'react'
import styles from './profileheader.module.css'
import user from '../img/User.jpeg'
import EmailIcon from '@mui/icons-material/Email';

const ProfileHeader = () => {
  return (
    <>
    <section className={styles.profile}>
        <header className={styles.header}>
    <div className={styles.details}>
        <img src={user} alt="User Image" className={styles['profile-pic']}/>
      <h1 className={styles.heading}>FirstName LastName</h1>
      <div className={styles.location}>
        
        
        <br/>
        <EmailIcon/>
        <p>&nbsp; EmailId@gmail.com</p>
        <br/>
        <br/>
      </div>
      <div className={styles.stats}>
        <div className={styles['col-4']}>
          <h4>20</h4>
          <p>Authors</p>
        </div>
        <div className={styles['col-4']}>
          <h4>10</h4>
          <p>Reviewers</p>
        </div>
        <div className={styles['col-4']}>
          <h4>100</h4>
          <p>Admin</p>
        </div>
      </div>
    </div>
  </header>
</section>
    </>
  )
}

export default ProfileHeader