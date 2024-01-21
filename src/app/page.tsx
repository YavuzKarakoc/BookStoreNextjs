import Image from "next/image";
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.css'

export default function Home() {
  return (
    <main className={`${styles.main} `}>
      <h1>Hello world</h1>
      <button  className="btn btn-primary ">
        <a className={styles.dashboardbutton} href="/admindashboard">Go To Admin DashBoard</a>
      </button>
    </main>
  );
}
