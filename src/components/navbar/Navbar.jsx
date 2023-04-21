import React from "react"
import styles from './Navbar.module.css'
export default
function Navbar(){
    return(
        <div className={styles.main}>
            <div className={styles.left}>Jobfinder - Style it using fonts</div>
            <div className={styles.right}>
                <button>Home</button>
                <button>Jobs</button>
                <button>About</button>
            </div>

        </div>
    )
}
