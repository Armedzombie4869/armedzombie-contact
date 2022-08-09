import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import config from './config';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function ContactList() {

  const [open, setOpen] = React.useState(false);
  const [contactid, setContactid] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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


  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    axios.get(config.apiURL).then(contactsData => setContacts(contactsData.data))
  }, [])

  function DeleteContact(id) {
    setContactid(id);
    handleClickOpen();
  }
  function DeleteContactYes(id) {
    axios.delete(`${config.apiURL}/${contactid}`)
      .then(data => {
        let res = contacts.filter(x => x._id !== contactid)
        setContacts(res);
        setOpen(false);
      })
  }


  let navigate = useNavigate();

  return (
    <div>
      <List >
        {
          contacts.map(item => <div key={item._id}>
            <ListItem alignItems="flex-start" >
              <ListItemAvatar>
                <Avatar {...stringAvatar(`${item.firstname} ${item.lastname}`)} />
              </ListItemAvatar>
              <ListItemText
                primary={`${item.firstname} ${item.lastname}`}
                secondary={item.email}
              />
              <div>
                <IconButton edge="end" aria-label="comments" onClick={() => navigate(`/contact/${item._id}`)}>
                  <ChevronRightIcon />
                </IconButton>
                <IconButton edge="end" aria-label="comments" onClick={DeleteContact.bind(this, item._id)}>
                  <DeleteIcon />
                </IconButton>
              </div>

            </ListItem>
            <Divider variant="inset" component="li" />

          </div>
          )
        }
        <Fab color="primary" aria-label="add" className="float-end mt-3 me-3" onClick={() => navigate('/addnew')}>
          <AddIcon />
        </Fab>

      </List>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Contact List"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to delete this contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={DeleteContactYes}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </div>


  )
}
