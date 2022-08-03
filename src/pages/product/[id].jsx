import styles from '../../styles/Product.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { addProduct } from "../../redux/cartSlice"
import axios from "axios"
import Link from "next/link"

const Product = ({ pizza }) => {
  const [size, setSize] = useState(0)
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [extras, setExtras] = useState([])

  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number)
  }

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size]
    setSize(sizeIndex)
    changePrice(difference)
  }

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras([...extras, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleQuantity = (event) => {
    if (event == "increase") {
      if (quantity >= 1 && quantity < 10) {
        setQuantity(quantity += 1)
      }
    } else if (event == "decrease") {
      if (quantity > 1 && quantity <= 10) {
        setQuantity(quantity -= 1)
      }
    }
  }

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, size, extras, price, quantity }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}.00
          <span className={styles.sizeChosen}> &nbsp;{size === 0 ? "(Small)" : size === 1 ? "(Medium)" : "(Large)"}</span>
        </span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>

          {pizza.extraOptions.map((option) => (
            <label htmlFor={option.text} className={styles.option} key={option._id}>
              {option.text} (${option.price}.00)
              <input type="checkbox" id={option.text} name={option.text} className={styles.checkbox} onChange={(e) => handleChange(e, option)} />
              <span className={styles.checkmark}></span>
            </label>
          ))}

        </div>
        <h3 className={styles.choose}>Choose the quantity</h3>
        <div className={styles.add}>
          <div className={styles.chooseInput}>
            <input type="button" value="-" onClick={() => handleQuantity("decrease")} className={styles.decrease} />
            <input type="number" disabled={true} value={quantity} onChange={e => this.setState({ text: e.target.value })} className={styles.quantity} />
            <input type="button" value="+" onClick={() => handleQuantity("increase")} className={styles.increase} />
          </div>
          <Link href="/">
            <button className={styles.button} onClick={handleClick}>Add to Cart</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props: {
      pizza: res.data,
    },
  }
}

export default Product
