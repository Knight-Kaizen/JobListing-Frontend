import React, { useContext, useEffect, useState} from "react";

import {UserContext} from '../../App';
import Navbar from "../../components/navbar/Navbar";
import UserForm from "../../components/userForm/UserForm";
import UserLogin from "../../components/userLogin/UserLogin";
import styles from './RegisterPage.module.css';
export default
    function RegisterPage(props) {
       const [showLogin, setShowLogin] = useState(false);

       const handleForm =()=>{
        setShowLogin(showLogin==true?false:true);
       }

    return (
        <div className={styles.main}>
            <div className={styles.navbar}><Navbar /></div>
            <div className={styles.body}>
                <div className={styles.left}>
                    {showLogin == true?<UserLogin showRegistration = {handleForm}/> :<UserForm showLogin = {handleForm}/>}
                    
                </div>
                <div className={styles.right}>Image Component</div>
            </div>
        </div>
    )
}