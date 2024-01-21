import React from "react";
import styles from "./component.module.css";

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div>LOGO</div>
            <div>
                <ul className="list-unstyled">
                    <li>
                        <a className={styles.sidelink} href="/admindashboard">
                            AdminDashboard
                        </a>
                    </li>
                    <li>
                        <a
                            className={styles.sidelink}
                            href="/admindashboard/booklist"
                        >
                            BookList
                        </a>
                    </li>
                    <li>
                        <a
                            className={styles.sidelink}
                            href="/admindashboard/authorlist"
                        >
                            AuthorList
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
