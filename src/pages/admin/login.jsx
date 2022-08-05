import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.scss";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleClick(e)} className={styles.wrapper}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <input
          placeholder="Username"
          className={styles.input}
          style={error ? { border: "1px solid red" } : { border: "1px solid black" }}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <input
          placeholder="Password"
          type="password"
          className={styles.input}
          style={error ? { border: "1px solid red", } : { border: "1px solid black" }}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && <span className={styles.error}>The username or password is incorrect</span>}
        <button type="submit" className={styles.button}>Sign In</button>
      </form>
    </div>
  )
}

export default Login