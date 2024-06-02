import { Link } from "react-router-dom";
import styles from "./Nav.module.css";
export default function NavBar() {
  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
}
