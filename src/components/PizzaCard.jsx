import styles from "../styles/PizzaCard.module.scss"
import Image from "next/image"
import Link from 'next/link'

const PizzaCard = ({ pizza }) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${pizza._id}`}>
        <Image src={pizza.img} alt="" width="500" height="500" />
      </Link>
      <span className={styles.price}>${pizza.prices[0]}</span>
      <p className={styles.description}>
        {pizza.desc}
      </p>
    </div>
  )
}

export default PizzaCard