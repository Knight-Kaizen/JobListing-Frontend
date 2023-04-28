import React, { useEffect, useState } from 'react'
import styles from './JobBox.module.css'
export default function JobBox(props) {
    const {job_position, company_size,
         monthly_salary, remote_office, job_type, skills_required} = props.job;
        //  console.log('checking props', props);

  return (
    <div className={styles.main}>
      <div className={styles.box1}>Image box</div>
      <div className={styles.box2}>
        <div className={styles.box11}>{job_position}</div>
        <div className={styles.box12}>
            <div className={styles.box121}>{company_size}</div>
            <div className={styles.box122}>{monthly_salary}</div>
            <div className={styles.box123}>Country</div>
        </div>
        <div className={styles.box13}>
            <div className={styles.box131}>{remote_office}</div>
            <div className={styles.box132}>{job_type}</div>
        </div>
      </div>
      <div className={styles.box3}>
        <div className={styles.box31}>
            <div className={styles.box311}>{skills_required[0]}</div>
            <div className={styles.box311}>{skills_required[1]}</div>
            <div className={styles.box311}>{skills_required[2]}</div>
            <div className={styles.box311}>{skills_required[3]}</div>
        </div>
        <div className={styles.box32}>
            <button>View Details</button>
        </div>
        
      </div>
    </div>
  )
}
