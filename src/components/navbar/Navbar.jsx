import React from "react"
import { useNavigate } from "react-router-dom"
import styles from './Navbar.module.css'
export default
    function Navbar(props) {
    const navigate = useNavigate();
    function handleClick(buttonClicked) {
        console.log(buttonClicked);
        navigate(buttonClicked);
    }
    const handleLogout = ()=>{
        localStorage.removeItem('userLoggedIn');
        navigate('/');
    }
    return (
        <div className={styles.main}>
            <div className={styles.left}>Jobfinder - Style it using fonts</div>
            <div className={styles.right}>
                <button onClick={() => handleClick('/')}>Home</button>
                <button onClick={() => handleClick('/job')}>Jobs</button>
                <button onClick={() => handleClick('/about')}>About</button>
                {props.showUser &&
                    <div className={styles.user}>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                }
            </div>

        </div>
    )
}
