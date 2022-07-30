import styles from '../../styles/Order.module.scss'
import Image from 'next/image'

const Order = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>

      </div>
      <div className={styles.right}>

        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <table className={styles.checkout}>
            <tbody>
              <tr><td>Subtotal:</td><td className={styles.value}>$79.80</td></tr>
              <tr><td>Discount:</td><td className={styles.value}>$0.00</td></tr>
              <tr><td>Total:</td><td className={styles.value}>$79.80</td></tr>
            </tbody>
          </table>
          <button disabled className={styles.button}>PAID</button>
        </div>
      </div>
    </div>
  )
}

export default Order