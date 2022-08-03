import styles from "../styles/OrderDetaild.module.scss"
import { useState } from "react"

const OrderDetaild = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 })
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay ${total}.00 after delivery.</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name Surname</label>
          <input type="text" placeholder="John Doe" className={styles.input} onChange={(e) => setCustomer(e.target.value)} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input type="text" placeholder="+1 234 567 89" className={styles.input} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea type="text" placeholder="Elton St. 505 NY" className={styles.textarea} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <button className={styles.button} onClick={handleClick}>Order Now</button>
      </div>
    </div>
  )
}

export default OrderDetaild