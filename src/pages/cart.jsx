import Image from "next/image"
import styles from "../styles/Cart.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router"
import { reset } from "../redux/cartSlice"

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const [cash, setCash] = useState(false)
  const amount = cart.total;
  const currency = "USD";
  const style = { "layout": "vertical" };
  const dispatch = useDispatch();
  const router = useRouter()

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data)
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/order/${res.data._id}`);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {(showSpinner && isPending) && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1
              })
            });
          }}
        />
      </>
    );
  }

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
          <div className={styles.paymentMethods}>
            <button className={styles.payButton} onClick={() => setCash(true)}>Cash on Delivery</button>
            <PayPalScriptProvider
              options={{
                "client-id": "AS4JMv4lmMOjPiU6JlhH1B93SviU3G8aFonv30IkXZDPt7_sxvcW-eyECmkzv9iqskKyusXKIFrpHVo1",
                components: "buttons",
                currency: "USD"
              }}
            >
              <ButtonWrapper
                currency={currency}
                showSpinner={false}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart