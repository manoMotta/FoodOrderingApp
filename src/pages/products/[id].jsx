import styles from '../../styles/Product.module.scss'
import Image from 'next/image'
import { useState } from 'react'

const Product = () => {
  const [size, setSize] = useState(0)
  const [number, setNumber] = useState(1);


  const handleNumber = (event) => {
    if (event == "increase") {
      if (number >= 1 && number < 10) {
        setNumber(number += 1)
      }
    } else if (event == "decrease") {
      if (number > 1 && number <= 10) {
        setNumber(number -= 1)
      }
    }
  }

  const pizza = {
    id: 1,
    img: '/images/pizza.png',
    name: "CAMPAGNOLA",
    price: [19.9, 23.9, 27.9],
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi."
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.name}</h1>
        <span className={styles.price}>${pizza.price[size]}
          <span className={styles.size}> &nbsp;{size === 0 ? "(Small)" : size === 1 ? "(Medium)" : "(Large)"}</span>
        </span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSize(0)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => setSize(1)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => setSize(2)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>

          <label htmlFor="double" className={styles.option}>
            Double Ingredients
            <input type="checkbox" id="double" name="double" className={styles.checkbox} />
            <span className={styles.checkmark}></span>
          </label>
          <label htmlFor="cheese" className={styles.option}>
            Extra Cheese
            <input type="checkbox" id="cheese" name="cheese" className={styles.checkbox} />
            <span className={styles.checkmark}></span>
          </label>
          <label htmlFor="spicy" className={styles.option}>
            Spicy Sauce
            <input type="checkbox" id="spicy" name="spicy" className={styles.checkbox} />
            <span className={styles.checkmark}></span>
          </label>
          <label htmlFor="garlic" className={styles.option}>
            Garlic Sauce
            <input type="checkbox" id="garlic" name="garlic" className={styles.checkbox} />
            <span className={styles.checkmark}></span>
          </label>

        </div>
        <div className={styles.add}>
          <h3 className={styles.choose}>Choose the quantity</h3>
          <input type="button" value="-" onClick={() => handleNumber("decrease")} className={styles.decrease} />
          <input type="number" defaultValue={number} className={styles.quantity} />
          <input type="button" value="+" onClick={() => handleNumber("increase")} className={styles.increase} />

          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Product
