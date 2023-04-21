import React from "react";

import Navbar from "../../components/navbar/Navbar";

import styles from './HomePage.module.css';
export default
    function HomePage() {

    return (
        <div className={styles.main}>
            <div className={styles.navbar}>
                <Navbar/>
            </div>
            <div className={styles.body}>
                <div className={styles.left}>Left component</div>
                <div className={styles.right}>Right component</div>
            </div>
        </div>
    )
}