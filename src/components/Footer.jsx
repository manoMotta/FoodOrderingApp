import styles from "../styles/Footer.module.scss"
import Image from "next/image"
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.contact}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.phrase}>9 W 53rd St, New York, NY 10019, USA</p>
          <p className={styles.phrase}>+1 212-344-1230</p>
          <p className={styles.phrase}>+1 212-555-1230</p>
        </div>

        <div className={styles.quote}>
          <Image src="/images/logo.png" width="175" height="75" alt="" />
          <p className={styles.phrase}>&quot;The best way to find yourself is to lose yourself in the service of others.&quot;</p>
          <div></div>
          <div className={styles.medias}>
            <a href="https://www.facebook.com"><FiFacebook className={styles.media} /></a>
            <a href="https://www.twitter.com"><FiTwitter className={styles.media} /></a>
            <a href="https://www.instagram.com"><FiInstagram className={styles.media} /></a>
          </div>
        </div>

        <div className={styles.hours}>
          <h1 className={styles.title}>Working Hours</h1>
          <p className={styles.phrase}>Monday-Friday:</p>
          <p className={styles.phrase}>08:00 am - 12:00 am</p>
          <p className={styles.phrase}>Saturday-Sunday:</p>
          <p className={styles.phrase}>07:00 am - 11:00 pm</p>
        </div>
      </div>

      <div className={styles.rights}>
        <p className={styles.phrase}>2022 Motta. All Rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer