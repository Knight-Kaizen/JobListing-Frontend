import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SearchBox.module.css';

export default function SearchBox(props) {

//------------------------------ console.log('In searchBox:' , props);
    const [jobsAvailable, setJobsAvailable] = useState([]);
    const skillsAvailable = new Set();
    const positionsAvailable = new Set();
    const [showSkills, setShowSkills] = useState([]);
    const [showPositions, setShowPositions] = useState([]);
    const [positionSearch, setPositionSearch] = useState('');
    const [skillSearch, setSkillSearch] = useState([]);
    const [showSkillsAvailable, setShowSkillsAvailable] = useState(false);
    const [showPositionsAvailable, setShowPositionsAvailable] = useState(false);

    //search query params
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState('');

    //fetching all available jobs from DB
    const fetchJobs = async () => {
        try {
            const res = await axios.get('http://localhost:8000/job');
            setJobsAvailable(res.data);
        }
        catch (err) {

        }
    }
    //Checking which skill/position is selected
    useEffect(() => {
        async function querySearch() {
            try {
                let queryString = '';
                selectedSkills.map((key) => {
                    queryString += `skills_required=${key}&`
                })
                queryString = queryString.slice(0, -1);
                props.skillSearch(queryString);
                // console.log('show query string:', queryString);
                
            }
            catch (err) {
                // console.log(err);
            }
        }
        querySearch();
        

    }, [selectedSkills])
    const handleSkillSelection = async (key) => {
        // console.log('You got a click', key);
        setShowSkillsAvailable(false);
        setSelectedSkills((prev) => {
            // console.log('showing previous skills', prev);
            return ([...prev, key]);
        })
        // console.log('show selected skills', selectedSkills);
//----------------------------------------------fetchJobs('skills');

//----------------------------------------setJobsAvailable(res.data);

    }
    useEffect(() => {
//----------- extracting skills from each job and inserting it in set.
        for (let i = 0; i < jobsAvailable.length; i++) {

            jobsAvailable[i].skills_required.forEach((key) => {
                skillsAvailable.add(key);
            })
            positionsAvailable.add(jobsAvailable[i].job_position);

        }
//---------------------------------------------------rendering skills
        if (skillsAvailable.size != 0)
            skillsAvailable.forEach((key) => {
                setShowSkills((prev) => {
                    return (
                        [...prev, <p onClick={() => handleSkillSelection(key)}>{key}</p>]
                    )
                })
            })

    }, [jobsAvailable])
    //default useEffect
    useEffect(() => {
        setShowPositions([]);
        setShowSkills([]);
        setJobsAvailable([]);
        setPositionSearch('');
        setSkillSearch([]);
        fetchJobs();
    }, [])

    const searchPosition = async (key) => {
        // console.log('Search based on position');
        setShowPositionsAvailable(false);
        props.positionSearch(key);
        setPositionSearch(key);
    }
    //show only positions which relate to searched item
    useEffect(() => {
        setShowPositions([]);
        // console.log('this position is searched', positionSearch);
        for (let i = 0; i < jobsAvailable.length; i++) {
            positionsAvailable.add(jobsAvailable[i].job_position);
        }
        // console.log('positions available', positionsAvailable)
        let displayPositions = [];
        positionsAvailable.forEach((key) => {
            const check = key.toLowerCase();
            if (positionSearch && check.includes(positionSearch.toLowerCase()))
                displayPositions.push(key);
        })
        displayPositions.forEach((key) => {
            setShowPositions((prev) => {
                return (
                    [...prev, <p onClick={() => searchPosition(key)}>{key}</p>]
                )
            })
        })

    }, [positionSearch])

    const handlePositionSearch = (e) => {
        e.preventDefault();

        setPositionSearch(e.target.value);
    }
    const handlePositionSearchSubmit = (e) => {
        // e.preventDefault();
        if (e.key == 'Enter')
            setShowPositionsAvailable(false);
        else
            setShowPositionsAvailable(true);

    }
    const handleSkills = () => {
        // console.log('In handle skills div');

        setShowSkillsAvailable(showSkillsAvailable ? false : true);
        // console.log('skills showing?', showSkillsAvailable);
    }

//-------------------------------------UI----------------------------

    return (
        <>
            <div className={styles.main}>
                <div className={styles.top}>
                    <img className={styles.icon} src='../../../public/Images/search.png' alt='search-icon'></img>
                    <textarea className={styles.searchBar} name="searchItem"
                        value={positionSearch}
                        onChange={handlePositionSearch}
                        onKeyDown={handlePositionSearchSubmit}
                        placeholder='Type any job title' ></textarea>
                </div>
                <div className={`${styles.titleSearchResults} ${showPositionsAvailable && styles.showPositions}`}>
                    {showPositions}
                </div>
                <div className={styles.bottom}>
                    <div className={styles.skillSelect} onClick={handleSkills}>skills</div>
                    <div className={styles.selectedSkills}>show selcetions</div>
                    <button className={styles.addjobButton} onClick={props.open}>Add jobs</button>
                    <div className={`${styles.skillSearchResults} ${showSkillsAvailable && styles.showSkills}`}

                    >
                        {showSkills}
                    </div>
                </div>
            </div>
        </>
    )
}
