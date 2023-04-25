import React from "react";

import Navbar from "../../components/navbar/Navbar";
import styles from './AboutPage.module.css';
export default
function AboutPage(){
    
    return(
        <div className={styles.main}>
            <div className={styles.navbar}><Navbar showUser = 'true'/></div>
            <div className={styles.body}>In About page</div>
        </div>
    )
}