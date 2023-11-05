import './styles.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useEffect, useState } from "react";
import axios from "axios";

function createAccountRadioButton() {
    return (
      <FormControl>
        <FormLabel className = "radioButton">Account Type:</FormLabel>
        <RadioGroup
          defaultValue="user"
          name="radio-buttons-group"
        >
          <FormControlLabel value="user" control={<Radio />} label="User" />
          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
        </RadioGroup>
      </FormControl>
    );
  }


  function accountRoleButton() {
    return (
      <FormControl>
        <RadioGroup
          defaultValue="admin"
          name="adminButton"
        >   
            <div className = "accountRoleButton">
              <FormControlLabel value="admin" control={<Radio />} label="Admin" /> 
              <FormControlLabel value="user" control={<Radio />} label="User" /> 
            </div>
        </RadioGroup>
      </FormControl>
    );
}



const permissionCol = [
    { field: 'name', headerName: 'Name', width: 160 },
    { field: 'admin', headerName: 'Account Role', width: 180, renderCell: accountRoleButton, disableClickEventBubbling: true },
  ];
  
  const permissionRow = [
    { id: 1, name: 'Example_Name', email: 'Example@gmail.com', accountType: 'Admin', permissions: ' ', 
    removeAccount: ' '},
  ];

function AccountRole() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="contained" className='permissionButton' onClick={handleClickOpen}>
          Admin
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Account Role</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Below, are the options to change the specified account's role.
            </DialogContentText>
            
            <div style={{ height: 'auto', width: '100%' }}>
                <DataGrid
                rows={permissionRow}
                columns={permissionCol}
                
                    />
            </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleClose} variant="contained">Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  function RemoveAccount() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="contained" className='removeButton' onClick={handleClickOpen}>
          Remove Account
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Remove Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this account?
            </DialogContentText>
                <div className='removeAccount_ButtonItems'>
                <Button onClick={handleClose} variant="contained" className="removeAccount_NoButton">No</Button>
                <Button variant="contained" className="removeAccount_YesButton">Yes</Button>
                </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  function AddAccount() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="contained" className='addAccount' onClick={handleClickOpen}>
          Add New User
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Fill in the text fields below to register a NEW USER on the system.
            </DialogContentText>
            <div className='fieldOptions'>
              <div className='firstNameField'>
                  <TextField autoFocus margin="dense" className="firstName" label="First Name" variant="standard"/>
              </div>
              <div className='lastNameField'>
                  <TextField autoFocus margin="dense" className="lastName" label="Last Name" variant="standard"/>
              </div>
              <div className='emailField'>
                  <TextField autoFocus margin="dense" className="email" label="Email" variant="standard"/>
              </div>
              <div className='radioButtonOption'>
                  <createAccountRadioButton/>
              </div>
            </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} variant="contained">Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


export default function DataTable() {
    const [user, setUser] = useState([]);
    // useEffect(() => {
    //   //TO DO
    //   console.log('Current User')
    //   fetch('http://localhost:4000/users')
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log("I am in", data)
    //     setUser(data);
    //   })

    // }, [
    // ]);
  axios.get('http://localhost:4000/users').then((response) => {
    console.log("im in", response)
    const data = response.data;
    setUser(data.users);

  })
  .catch((e) => {
    console.error(e)
  })

  

  console.log("testing" , user)

  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'accountRole', headerName: 'Account Role', width: 150, renderCell: AccountRole, disableClickEventBubbling: true  },
    { field: 'removeAccount', headerName: 'Remove Account', width: 190, renderCell: RemoveAccount, disableClickEventBubbling: true },
  ];
    
  const rows = [
      { id: 1, name: 'examplename', email: 'Example@gmail.com', accountType: 'Admin',  removeAccount: ' '},
      { id: 2, name: 'Example_Name', email: 'Example@gmail.com', accountType: '', removeAccount: ' '},
      { id: 3, name: 'Example_Name', email: 'Example@gmail.com', accountType: '', removeAccount: ' '},
    ];
    return (
   <Page title="Configuration" subtitle="Various configuration settings and options for site administrators">
        <div className='configBorder'>
            <h1 className='userListTitle'>
                User List
            </h1>
            <div style={{ height: 'auto', width: '100%' }}>

            {user.users.map((o) =>
            <div>
            <h1>  {o.UserID}</h1>
            </div>
            )}


                <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                />
            </div>
            <div className = 'addAccountPosition'>
                <AddAccount/>
            </div>
        </div>
      </Page>





    );
  }
