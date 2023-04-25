import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from './UserForm.module.css';
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
export default
    function UserForm(props) {
        //------------------States----------------------------
        const [userData, setUserData] = useState({
            name: '',
            email: '',
            mobile: '',
            password: '',
            tandc: ''
        });
        const [errors, setErrors] = React.useState({});
        const [flashMessage, setFlashMessage] = useState();
        // const {setShowLogin} = useContext(UserContext);
        const navigate = useNavigate();
//-----------------Helper Functions--------------------

    

    const registerUser = async(userData)=>{
        try{
            const {name, email, mobile, password} = userData;
            const res = await axios.post('http://localhost:8000/register', {
                name,
                mobile,
                email,
                password
            })
            console.log(res);
            console.log(res.data);
            setFlashMessage(res.data);
            return true;

        }
        catch(err){
            console.log('error in creating user', err);
            console.log(err.response.data);
            setFlashMessage(err.response.data);
            return false;
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value, type, checked} = e.target;
        setUserData((prevUserData) => {
            return {
                ...prevUserData,
                [name]: type == "checkbox"? checked: value
            }

        })
        // console.log(userData);
    }
    const validate = (formData) => {
        const error = {};
        let dataOk = true;
        if (!formData.name) {
            error.name = 'Name is required';
        }
        if (!formData.email) {
            error.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            error.email = 'Email is invalid';
        }
        if (!formData.mobile) {
            error.mobile = 'Mobile number is required';
           
        } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
            error.mobile = 'Mobile number is invalid';
        }
        if(!formData.password){
            error.password = 'Please set password'
        }

        if (!formData.tandc) {
            error.tandc = 'Required';
        }
        if(Object.keys(error).length > 0)
        dataOk = false;
        // console.log(Object.keys(error).length);
        setErrors(error);
        return dataOk;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let dataOk = validate(userData);
        console.log(dataOk)
        if(dataOk){
            const userRegisterationSuccess = await registerUser(userData);
            if(userRegisterationSuccess){
                //navigate to job page
                console.log('user registered sucessfully');
                navigate('/job');

            }
        }
    }
    
    const handleClick = (e)=>{
        e.preventDefault();
        props.showLogin();
    }

//---------------------------UI-----------------------------
    return (
        <div className={styles.main}>
            <h2>Create an account</h2>
            <h4>Your personal jobfinder is here</h4>
            <form action="" method="" className={styles.form}>
                <input type="text" placeholder="Name" name="name" value={userData.name} onChange={handleChange} />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
                <input type="text" placeholder="Email" name="email" value={userData.email} onChange={handleChange} />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
                <input type="text" placeholder="Mobile" name="mobile" value={userData.mobile} onChange={handleChange} />
                {errors.mobile && <span className={styles.error}>{errors.mobile}</span>}
                <input type="text" placeholder="Password" name="password" value={userData.password} onChange={handleChange} />
                {errors.password && <span className={styles.error}>{errors.password}</span>}

                <div className={styles.tandc}>
                    <input type="checkbox" className={styles.check} name="tandc" onChange={handleChange}/>
                    <h6 className={styles.text1}>Terms and Conditions</h6>
                </div>
                {errors.tandc && <span className={styles.error}>{errors.tandc}</span>}
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <h5>Already have an account? <a href="" onClick={handleClick}>Login</a></h5>
        </div>
    )
}