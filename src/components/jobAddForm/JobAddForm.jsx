import React, { useState } from 'react'
import styles from './JobAddForm.module.css'
import axios from 'axios';
export default function JobAddForm(props) {

    const [jobDetails, setJobDetails] = useState({
        company_name: '',
        logo_url: '',
        job_position: '',
        monthly_salary: '',
        job_type: '',
        remote_office: '',
        location: '',
        job_description: '',
        company_description: '',
        skills_required: [],
        company_size: ''
    })
    // const [skills, setSkills] = useState('');
    const [skills, setSkills] = useState('');
    const handleOnChange = (e) => {
        // console.log(e.target.name, e.target.value);
        const { name, value } = e.target;
        if (name != 'skills') {
            setJobDetails((prevDetails) => {
                return ({
                    ...prevDetails,
                    [name]: value
                })
            })
        }
        else {
            setSkills(value);
        }

    }


    const validate = () => {
        const { company_name, logo_url, job_position, monthly_salary, job_type, remote_office, location,
            job_description, company_description, skills_required, company_size } = jobDetails;
        if (!company_name || !logo_url || !job_position || !monthly_salary || !job_type || !remote_office || !location ||
            !job_description || !company_description || !skills_required || !company_size)
            return false;
        return true;
    }
    const postJob = async(jobDetails)=>{
        try{
            const user = JSON.parse(localStorage.getItem('userLoggedIn'));
            const token = user.token;
            console.log('token ', token);
            const res = axios.post('http://localhost:8000/job',
                {data:{jobDetails}},
                {
                    headers:{
                        'Authorization': `${token}`
                    }

                }
            )
            console.log('Sucess post');
            return res;
        }catch(err){
            console.log('error', err);
            return false;
        }
    }
    const handleSubmit = async(e) => {
        // e.preventDefault();
        // console.log('checking details before', jobDetails)
        // console.log('skills are', skills);
        const skillsArray = [];
        let currSkill = '';
        for (let i = 0; i < skills.length; i++) {
            if (skills[i] != ' ' && skills[i] != ',') {
                currSkill += skills[i];
            }
            else {
                if (currSkill != '')
                skillsArray.push(currSkill);
                // console.log(currSkill);
                currSkill = '';
            }
        }
        if (currSkill != '')
            skillsArray.push(currSkill);
        // console.log(skillsArray)
        setJobDetails((prevDetails) => {
            return ({
                ...prevDetails,
                skills_required: skillsArray
            })
        })
        const isOk = validate();
        console.log('Details submitted: ', jobDetails);
        console.log(isOk)
        if (isOk == true) {
            //post
            const res = await postJob(jobDetails);
            if(res){
                console.log('job posted -> ',res);
                props.submit();

            }
            else{
                console.log('error in job posting');
            }
            // console.log('job posted sucessfully');
            // console.log('skills array', skillsArray)
            // console.log('Details submitted: ', jobDetails);
        }
        else {
            // console.log('Please fill all the feilds');
        }

    }

    //------------------------UI--------------------------------
    return (
        <div className={styles.main}>
            <div className={styles.left}>
                <h1 className={`${styles.outerBox3}`}>Add Job Description</h1>
                <div className={styles.outerBox}>
                    <span className={styles.box1}>Company Name  </span>
                    <input type="text" name='company_name' value={jobDetails.company_name} onChange={handleOnChange} className={styles.box2} placeholder='Enter your company here' />
                </div>
                <div className={styles.outerBox}>
                    <span className={styles.box1}>Add logo url  </span>
                    <input type="text" name='logo_url' onChange={handleOnChange} className={styles.box2} placeholder='Enter the link' /></div>
                <div className={styles.outerBox}>
                    <span className={styles.box1}>Job position  </span>
                    <input type="text" name='job_position' onChange={handleOnChange} className={styles.box2} placeholder='Enter job position' /></div>
                <div className={styles.outerBox}>
                    <span className={styles.box1}>Monthly Salary</span>
                    <input type="text" name='monthly_salary' onChange={handleOnChange} className={styles.box2} placeholder='Enter amount in INR' /></div>
                <div className={styles.outerBox}>
                    <span className={`${styles.box1} `}>Job Type</span>
                    <select name="job_type" onChange={handleOnChange} className={styles.box3}>
                        <option value="" disabled selected>Select</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                    </select>
                </div>
                <div className={styles.outerBox}>
                    <span className={styles.box1}>Remote/Office</span>
                    <select name="remote_office" onChange={handleOnChange} className={styles.box3} >
                        <option value="" disabled selected>Select</option>
                        <option value="Remote">Remote</option>
                        <option value="Office">Office</option>
                        <option value="Hybrid">Hybrid</option>
                    </select></div>
                <div className={styles.outerBox}>
                    <span className={styles.box1}>Location      </span>
                    <input type="text" name='location' onChange={handleOnChange} className={styles.box2} placeholder='Enter location' />
                </div>
                <div className={`${styles.outerBox} ${styles.outerBox2}`}>
                    <span className={styles.box1}>Job description</span>
                    <textarea name="job_description" onChange={handleOnChange} className={styles.box2} placeholder='Type the job description'></textarea>
                </div>
                <div className={`${styles.outerBox} ${styles.outerBox2}`}>
                    <span className={styles.box1}>About Company </span>
                    <textarea name="company_description" onChange={handleOnChange} className={styles.box2} placeholder='Type about your company'></textarea></div>
                <div className={styles.outerBox}> <span className={styles.box1}>Comapny Size</span>
                    <input type="text" name='company_size' onChange={handleOnChange} className={styles.box2} placeholder='Enter comapny size' />
                </div>
                <div className={styles.outerBox}> <span className={styles.box1}>Skills Required</span>
                    <input type="text" value={skills} name='skills' onChange={handleOnChange} className={styles.box2} placeholder='Enter skills seperated by comma' />
                </div>
                <div className={styles.outerBox}>
                    <button onClick={props.submit}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div className={styles.right}> Image panel </div>
        </div>
    )
}
