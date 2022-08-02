import Image from "next/image"
import styles from "../styles/Cart.module.scss"
import { useDispatch, useSelector } from "react-redux"

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)

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
            {cart.products.map(product => (
              <tr className={styles.tr} key={product._id}>
                <td className={styles.imgTd}>
                  <div className={styles.imgContainer}>
                    <Image src={product.img} layout="fill" objectFit="cover" alt="" />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>
                    {product.title}
                    &nbsp; {product.size === 0 ? "(Small)" : product.size === 1 ? "(Medium)" : "(Large)"}
                  </span>
                </td>
                <td>
                  <span className={styles.extras}>{product.extras.map(extra => (
                    <span key={extra._id}>{extra.text}, </span>
                  ))}</span>
                </td>
                <td>
                  <span className={styles.price}>${product.price}.00</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>${product.price * product.quantity}.00</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <table className={styles.checkout}>
            <tbody>
              <tr><td>Subtotal:</td><td className={styles.value}>${cart.total}.00</td></tr>
              <tr><td>Discount:</td><td className={styles.value}>$0.00</td></tr>
              <tr><td>Total:</td><td className={styles.value}>${cart.total}.00</td></tr>
            </tbody>
          </table>
          <button className={styles.button}>CHECKOUT NOW!</button>
        </div>
      </div>
    </div>
  )
}

export default Cart