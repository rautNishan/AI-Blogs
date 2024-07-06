import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../common/context/auth.context";
import styles from "./Nav.module.css";
export default function NavBar() {
  const { authenticated } = useContext(AuthContext);
  console.log("This is Authenticated State in Nav Bar: ", authenticated);

  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        {!authenticated ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
