import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import styles from './JobPage.module.css';
export default
function JobPage(){
        const [jobsAvailable, setJobsAvailable] = useState({});
    return(
        <div className={styles.main}>
            <div className={styles.navbar}><Navbar showUser = 'true'/></div>
            <div className={styles.body}>
                <div className={styles.box1}>Search and filter box
                </div>
                <div className={styles.box2}>Job container</div>
                <div className={styles.box2}>Job container</div>
                <div className={styles.box2}>Job container</div>
                <div className={styles.box2}>Job container</div>
                <div className={styles.box2}>Job container</div>
                <div className={styles.box2}>Job container</div>
                <div className={styles.box2}>Job container</div>
                <div className={styles.box2}>Job container</div>
            </div>
        </div>
    )
}