import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import axios from 'axios';
import config from './config'
import {useNavigate} from 'react-router-dom'

export default function AddContact() {
    const [firstname,setFirstname]=useState('');
    const [lastname,setLastname]=useState('');
    const [email,setEmail]=useState('');
    const [city,setCity]=useState('');
    const [phone,setPhone]=useState('');
    let navigate=useNavigate();
    function SaveContact() {
        axios.post(config.apiURL, {firstname,lastname,email,city,phone}).then(data => navigate('/'));
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="mt-2">
                <TextField onChange={(e)=> setFirstname(e.target.value)} label="First Name" variant="standard" fullWidth />
                </div>
                <div className="mt-4">
                <TextField onChange={(e)=> setLastname(e.target.value)} label="Last Name" variant="standard" fullWidth />
                </div>
                <div className="mt-4">
                <TextField onChange={(e)=> setEmail(e.target.value)} label="Email" variant="standard" fullWidth />
                </div>
                <div className="mt-4">
                <TextField onChange={(e)=> setCity(e.target.value)} label="City" variant="standard" fullWidth />
                </div>
                <div className="mt-4">
                <TextField onChange={(e)=> setPhone(e.target.value)} label="Phone" variant="standard" fullWidth />
                </div>
                <div className="mt-4">
                <Button component={Link} variant="contained" to="/">Back</Button>
                <Button variant="contained" className="float-end" onClick={SaveContact}>Add Contact</Button>
                </div>
            </div>
        </div>
    </div>
  )
}
