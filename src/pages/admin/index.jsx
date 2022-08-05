import styles from "../../styles/Admin.module.scss"
import Image from "next/image"
import axios from "axios"
import { useState } from "react"

const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "", "delivered"]

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3000/api/products/" + id)
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  const handleStatus = async (id) => {

    const item = orderList.filter(order => order._id === id)[0]
    const currentStatus = item.status

    if (currentStatus < 2) {
      try {
        await axios.put("http://localhost:3000/api/orders/" + id, { status: (currentStatus === 1) ? currentStatus + 2 : currentStatus + 1 })
        setOrderList([res.data, ...orderList.filter(order => order._id !== id)])
      } catch (err) {
        console.log(err)
      }
      console.log(currentStatus);
    } else {
      try {
        await axios.delete("http://localhost:3000/api/orders/" + id)
        setOrderList(orderList.filter((order) => order._id !== id))
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id}</td>
                <td>{order.customer}</td>
                <td>{order.address}</td>
                <td>${order.total}.00</td>
                <td>{order.method === 0 ? (<span>Cash</span>) : (<span>Paid</span>)}</td>
                <td>{status[order.status]}</td>
                <td>
                  <button className={styles.button} onClick={() => handleStatus(order._id)}>{order.status < 2 ? "Next Stage" : "Remove Order"}</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Pizza</th>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>prices</th>
              <th>Actions</th>
            </tr>
          </thead>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td><Image src={product.img} width={50} height={50} objectFit="cover" alt="" /></td>
                <td>{product._id}</td>
                <td>{product.title}</td>
                <td>{product.desc}</td>
                <td>${product.prices[0]}.00, ${product.prices[1]}.00, ${product.prices[2]}.00</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button className={styles.button} onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || ""

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false
      }
    }
  }

  const productRes = await axios.get("http://localhost:3000/api/products")
  const orderRes = await axios.get("http://localhost:3000/api/orders")

  return {
    props: {
      products: productRes.data,
      orders: orderRes.data,
    }
  }
}

export default Index