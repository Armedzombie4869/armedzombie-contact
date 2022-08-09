import React, { useEffect, useState } from 'react'
import config from './config';
import axios from "axios";
import { useParams } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export default function ContactDetails() {
    const [contact, setContact] = useState();
    let { id } = useParams();
    useEffect(() => {
        axios.get(`${config.apiURL}/${id}`)
            .then(contactData => setContact(contactData.data[0]))
    }, [])
    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
    return (
        <div className="container d-flex justify-content-center align-items-center flex-column mt-5">
            <Avatar {...stringAvatar(`${contact?.firstname} ${contact?.lastname}`)} style={{ width: 250, height: 250 }} />
            <h1 className="mt-2">{contact?.firstname} {contact?.lastname}</h1>
            <p><EmailIcon /> {contact?.email}</p>
            <p><LocationOnIcon /> {contact?.city}</p>
            <p><LocalPhoneIcon /> {contact?.phone}</p>
            {/* <Button component={Link} to="/">Go Back</Button> */}
            <Link to="/">Go Back</Link>
        </div>
    )
}
