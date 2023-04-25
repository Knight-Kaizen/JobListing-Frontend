import React, { useState } from "react";
import styles from './UserLogin.module.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default
    function UserLogin(props) {
    //------------------States--------------------------
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    //-------------------Helper functions---------------
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUserDetails((prevUserdetails) => {
            return ({
                ...prevUserdetails,
                [name]: value
            })
        })
    }
    const validate = (formData)=>{
        const error = {};
        if (!formData.email) {
            error.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            error.email = 'Email is invalid';
        }
        if(!formData.password){
            error.password = 'Password is required';
        }
        setErrors(error);
        if(Object.keys(error).length == 0)
        return true;
        return false;
    }
    const loginUser = async(userDetailObj)=>{
        const {email, password} = userDetailObj;
        const res = await axios.post('http://localhost:8000/login', {
            //details
            email,
            password
            
        })
        console.log(res);
        return res;
    }
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const detailOk =validate(userDetails);
        console.log(detailOk, errors);
        if(detailOk){
            const login = await loginUser(userDetails);
            console.log('printing login', login);
            if(login.status == 200){
                const token =  await login.data.token;
                const userId = await login.data._id;
                const userLoggedIn = {
                    token: token, 
                    userId: userId
                }
                localStorage.setItem('userLoggedIn', JSON.stringify(userLoggedIn));
                navigate('/job');
            }
        }
        console.log('Submitted', userDetails);
    }
    const handleClick = (e)=>{
        e.preventDefault();
        props.showRegistration();
    }
    //-------------------UI-----------------------------
    return (
        <div className={styles.main}>
            <h2>Already have an account?</h2>
            <h4>Your personal job finder is here</h4>
            <form action="" className={styles.loginForm}>
                <input type="text" name="email" onChange={handleChange} value={userDetails.email} placeholder="Email" />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
                <input type="text" name="password" onChange={handleChange} value={userDetails.password} placeholder="password" />
                {errors.password && <span className={styles.error}>{errors.password}</span>}
                <button onClick={handleSubmit}>Sign in</button>
            </form>
            <p>Don't have an account? <a href="" onClick={handleClick}>Register</a></p>
        </div>
    )
}