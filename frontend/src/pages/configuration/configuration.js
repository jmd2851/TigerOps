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
import Checkbox from '@mui/material/Checkbox';


function RadioButton() {
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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function permCheckbox() {
  return (
    <div>
      <Checkbox {...label} />
    </div>
  );
}


const permissionCol = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'delete', headerName: 'Delete Slides', width: 130, renderCell: permCheckbox, disableClickEventBubbling: true },
    { field: 'create', headerName: 'Create Slides', width: 130, renderCell: permCheckbox, disableClickEventBubbling: true },
    { field: 'write', headerName: 'Edit slides', width: 130, renderCell: permCheckbox, disableClickEventBubbling: true },
    { field: 'removeAccounts', headerName: 'Remove Account(s)', width: 150, renderCell: permCheckbox, disableClickEventBubbling: true },
    { field: 'createAccounts', headerName: 'Create Account(s)', width: 130, renderCell: permCheckbox, disableClickEventBubbling: true },
  ];
  
  const permissionRow = [
    { id: 1, name: 'Example_Name', email: 'Example@gmail.com', accountType: 'Admin', permissions: ' ', 
    removeAccount: ' '},
  ];

function Permissions() {
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
          Permissions
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Permissions</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Below, are permissions that are set in place for the selected account.
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
                  <RadioButton/>
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

const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'accountType', headerName: 'Account Type', width: 130},
    { field: 'permissions', headerName: 'Permissions', width: 150, renderCell: Permissions, disableClickEventBubbling: true  },
    { field: 'removeAccount', headerName: 'Remove Account', width: 190, renderCell: RemoveAccount, disableClickEventBubbling: true },
  ];
  
  const rows = [
    { id: 1, name: 'Example_Name', email: 'Example@gmail.com', accountType: 'Admin', permissions: ' ', 
    removeAccount: ' '},
    { id: 2, name: 'Example_Name', email: 'Example@gmail.com', accountType: 'Admin', permissions: ' ', removeAccount: ' '},
    { id: 3, name: 'Example_Name', email: 'Example@gmail.com', accountType: 'Admin', permissions: ' ', removeAccount: ' '},
  ];

  export default function DataTable() {
    return (
    <Page>
        <PageHeader title="Configuration"/>
        <div className='configBorder'>
            <h1 className='userListTitle'>
                User List
            </h1>
            <div style={{ height: 'auto', width: '100%' }}>
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
