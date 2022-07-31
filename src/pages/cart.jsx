import Image from "next/image"
import styles from "../styles/Cart.module.scss"

const Cart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            <tr className={styles.tr}>
              <td className={styles.imgTd}>
                <div className={styles.imgContainer}>
                  <Image src="/images/pizza.png" layout="fill" objectFit="cover" alt="" />
                </div>
              </td>
              <td>
                <span className={styles.name}>CARALZO</span>
              </td>
              <td>
                <span className={styles.extras}>Double ingredients, spicy sauce</span>
              </td>
              <td>
                <span className={styles.price}>$19.90</span>
              </td>
              <td>
                <span className={styles.quantity}>2</span>
              </td>
              <td>
                <span className={styles.total}>$39.80</span>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.imgTd}>
                <div className={styles.imgContainer}>
                  <Image src="/images/pizza.png" layout="fill" objectFit="cover" alt="" />
                </div>
              </td>
              <td>
                <span className={styles.name}>CARALZO</span>
              </td>
              <td>
                <span className={styles.extras}>Double ingredients, spicy sauce</span>
              </td>
              <td>
                <span className={styles.price}>$19.90</span>
              </td>
              <td>
                <span className={styles.quantity}>2</span>
              </td>
              <td>
                <span className={styles.total}>$39.80</span>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.imgTd}>
                <div className={styles.imgContainer}>
                  <Image src="/images/pizza.png" layout="fill" objectFit="cover" alt="" />
                </div>
              </td>
              <td>
                <span className={styles.name}>CARALZO</span>
              </td>
              <td>
                <span className={styles.extras}>Double ingredients, spicy sauce</span>
              </td>
              <td>
                <span className={styles.price}>$19.90</span>
              </td>
              <td>
                <span className={styles.quantity}>2</span>
              </td>
              <td>
                <span className={styles.total}>$39.80</span>
              </td>
            </tr>
          </tbody>
        </table>
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
          <button className={styles.button}>CHECKOUT NOW!</button>
        </div>
      </div>
    </div>
  )
}

export default Cart