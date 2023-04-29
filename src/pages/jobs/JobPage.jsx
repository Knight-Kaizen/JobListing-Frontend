import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import styles from './JobPage.module.css';
import SearchBox from "../../components/searchBox/SearchBox";
import JobBox from "../../components/jobBox/JobBox";
import JobAddForm from "../../components/jobAddForm/JobAddForm";
export default
    function JobPage() {
    const [jobsAvailable, setJobsAvailable] = useState([]);


    const [displayJobs, setDisplayJobs] = useState([]);
    useEffect(() => {
        console.log('checking jobs');
        for (let i = 0; i < jobsAvailable.length; i++) {
            // console.log('loop: ', jobsAvailable[i]);
            setDisplayJobs((prevJobs) => {
                return ([...prevJobs, <JobBox
                    job={jobsAvailable[i]}
                />])
            });

        }

    }, [jobsAvailable])


    const fetchAllJobs = async () => {
        try {
            const res = await axios.get('http://localhost:8000/job');
            console.log('Fetching job sucess!', res.data);
            setJobsAvailable(res.data);
            return res.data;
        }
        catch (err) {
            console.log(err);
            return {};
        }
    }
    // get All jobs
    useEffect(() => {
        const func = async () => {
            const currentJob = await fetchAllJobs();
            console.log('checking curr jobs', currentJob);
            setDisplayJobs([]);
        }
        func();
        // if(currJob)
    }, [])

    //get job based on search 
    //search 1 => title based
    // search 2 => skills based
    // search 3 => both







    const handlePositionSearch = async (key) => {
        try {
            console.log('Handling search on basis of title');
            const res = await axios.get(`http://localhost:8000/job?job_position=${key}`);
            console.log(res.data);
            setDisplayJobs([]);
            setJobsAvailable(res.data);
        }
        catch (err) {
            console.log('error', err);
        }
    }
    const handleSkillSearch = async (queryString) => {
        try {
            console.log('Handling search on basis of skills');
            if (queryString) {
                const res = await axios.get(`http://localhost:8000/job?${queryString}`);
                console.log(res.data);
                setDisplayJobs([]);
                setJobsAvailable(res.data);

            }
        }
        catch (err) {
            console.log(err);
        }
    }
    const [showModal, setShowModal] = useState(false);
    const handleModalClose = ()=>{
        setShowModal(false);
        fetchAllJobs();
    }
    const handleModalOpen = ()=>{
        setShowModal(true);
    }
    



    //---------------------------UI------------------------------------

    return (
        <>
        
        <div className={styles.main}>
            <div className={styles.navbar}><Navbar showUser='true' /></div>
            {showModal && <JobAddForm
            // add = {handleAddNewJob}
            // edit = {handleEditJob}
            show = {showModal}
            submit = {handleModalClose}
            
        />}
           {!showModal &&  <div className={styles.body}>

<div className={styles.box1}>
    <SearchBox
        positionSearch={handlePositionSearch}
        skillSearch={handleSkillSearch}
        open = {handleModalOpen}
    />
</div>
<div className={styles.box2}>
    {displayJobs}
</div>

</div>}
        </div>
        </>
    )
}