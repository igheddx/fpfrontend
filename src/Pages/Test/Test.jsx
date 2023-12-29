import React from 'react'
import index from './../Test/index.css'
import { useState } from 'react'


function Test() {

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('Viewer')

    const handleSubmit =(e) => {
        e.preventDefault();
        const profile = {fname, lname, email, role};
        console.log(profile)
    }
  return (
    <div className='create'>
        <h2>Create Profile</h2>
        <form onSubmit={handleSubmit}>
            <label>First Name:</label>
            <input 
                type="text" 
                required
                value={fname}
                onChange={(e) => setFname(e.target.value)}
            />
            <label>Last Name:</label>
            <input 
                type="text" 
                required
                value={lname}
                onChange={(e) => setLname(e.target.value)}
            />
            <label>Email:</label>
            <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Roles:</label>
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="Viewer">Viewer</option>
                <option value="Approver">Approver</option>
                <option value="Admin">Admin</option>
                <option value="Super User">Super User</option>
            </select>
            <button>Create Account</button>
            <p>{fname}</p>
            <p>{lname}</p>
            <p>{email}</p>
            <p>{role}</p>
        </form>

    </div>
  )
}

export default Test