import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import styles from './HomePage.module.css';
export default
    function HomePage() {
        const navigate = useNavigate();
    const handleClick = ()=>{
        navigate('/register');
    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.navbar}>
                    <Navbar showUser = {false}/>
                </div>
                <div className={styles.body}>
                    <div className={styles.left}>Left component</div>
                    <div className={styles.right}>
                        <div className={styles.box1}>Short description</div>
                        <div className={styles.box2}>Are you a recruiter?</div>
                        <div className={styles.box3}>
                            <button onClick={handleClick}>Post Jobs</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}