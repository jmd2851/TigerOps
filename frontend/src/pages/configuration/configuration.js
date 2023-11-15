import "./styles.css";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Page from "../../components/Page";
import PageHeader from "../../components/PageHeader";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import config from "../../configs.json";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';



function AccountRole(userName, userId, userRole) {
  const [name, setName] = useState(userName);
  const [id, setId] = useState(userId);
  const [role, setRole] = useState(userRole);


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const body = {
      role: role
    };

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true
    };


  axios
  .put(`${config[process.env.NODE_ENV].apiDomain}/users/${id}`, body, axiosConfig)
      .then((response) => {
      })
      .then((response) => {
        const data = response.data;
      })
      .catch((e) => {
        console.error(e);
      });

    setOpen(false);
  };



  return (
    <div>
      <Button
        variant="contained"
        className="permissionButton"
        onClick={handleClickOpen}
      >
        Role Settings
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Account Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Below, are the options to change the specified account's role.
          </DialogContentText>
          <div className = "accountName">
            <h3>{name}</h3>
          </div>
          <FormControl>
           <FormLabel className="radioButton">Account Type:</FormLabel>
            <RadioGroup defaultValue= {userRole} name="adminButton">
        
              <FormControlLabel 
                value="Admin" 
                control={<Radio />} 
                label="Admin" 
                onChange={(e) => setRole(e.target.value)}
              />
              <FormControlLabel 
                value="User" 
                control={<Radio />} 
                label="User" 
                onChange={(e) => setRole(e.target.value)}
                />
          </RadioGroup>
        </FormControl>


          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



const marks = [
  {
    value: 10,
    label: '1',
  },
  {
    value: 20,
    label: '2',
  },
  {
    value: 30,
    label: '3',
  },
  {
    value: 40,
    label: '4',
  },
  {
    value: 50,
    label: '5',
  },
  {
    value: 60,
    label: '6',
  },
  {
    value: 70,
    label: '7',
  },
  {
    value: 80,
    label: '8',
  },
  {
    value: 90,
    label: '9',
  },
  {
    value: 100,
    label: '10',
  },
];

function valuetext(value) {
  return `${value} gb`;
}

function DiscreteSliderMarks() {
  return (
    <Box sx={{ width: 400 }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={50}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={10}
        min={10}
        max={100}
        marks={marks}
      />
    </Box>
  );
}

function BasicTimePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker label="Select Default Time" sx={{
          width: "200px"
        }} />
      </DemoContainer>
    </LocalizationProvider>
  );
}



function RemoveAccount(rowId) {
  const [id, setId] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    axios
      .delete(`${config[process.env.NODE_ENV].apiDomain}/users/${rowId}`, {
        withCredentials: true,
      })
      .then((response) => {
        const data = response.data;
        setId(data.id);
      })
      .catch((e) => {
        console.error(e);
      });
    
    window.location.reload();
    setOpen(false);

  };

  return (
    <div>
      <Button
        variant="contained"
        className="removeButton"
        onClick={handleClickOpen}
      >
        Remove Account
      </Button>
      <Dialog open={open}>
        <DialogTitle>Remove Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this account?
          </DialogContentText>
          <div className="removeAccount_ButtonItems">
            <Button onClick={handleClose} variant="contained" className="removeAccount_NoButton">
              No
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              className="removeAccount_YesButton"
            >
              Yes
            </Button>
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
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("");

    setOpen(false);

    const body = {
      email: email,
      password: password,
      firstName: firstName,
      lastName:  lastName,
      role: role
    };

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true
    };


  axios
  .post(`${config[process.env.NODE_ENV].apiDomain}/users`, body, axiosConfig)
      .then((response) => {
      })
      .then((response) => {
        const data = response.data;
      })
      .catch((e) => {
        console.error(e);
      });

    setOpen(false);

    window.location.reload();
  };


  return (
    <div>
      <Button
        variant="contained"
        className="addAccount"
        onClick={handleClickOpen}
      >
        Add New User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the text fields below to register a NEW USER on the system.
          </DialogContentText>
          <div className="fieldOptions">
            <div className="firstNameField">
              <TextField
                autoFocus
                margin="dense"
                className="firstName"
                label="First Name"
                variant="standard"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="firstNameField">
              <TextField
                autoFocus
                margin="dense"
                className="firstName"
                label="Last Name"
                variant="standard"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="lastNameField">
              <TextField
                autoFocus
                margin="dense"
                className="lastName"
                label="Email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="emailField">
              <TextField
                autoFocus
                margin="dense"
                className="email"
                label="Password"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <FormControl>
              <FormLabel className="radioButton">Account Type:</FormLabel>
              <RadioGroup defaultValue="user" name="radio-buttons-group">
                <FormControlLabel 
                  value="User" 
                  control={<Radio />} 
                  label="User" 
                  onChange={(e) => setRole(e.target.value)}
                />
                <FormControlLabel 
                  value="Admin" 
                  control={<Radio />} 
                  label="Admin"
                  onChange={(e) => setRole(e.target.value)} 
                />
              </RadioGroup>
            </FormControl>
            <div className="radioButtonOption">
              <createAccountRadioButton />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const dayoftheweek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];


function MultipleSelectCheckmarks() {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">Select Duration</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Select Duration" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {dayoftheweek.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}


export default function DataTable() {

  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`${config[process.env.NODE_ENV].apiDomain}/users`)
      .then((response) => {
        const data = response.data;
        setUser(data.users);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

const rows = user.map((u) => ({
  id: u.UserID,
  name: u.FirstName + " " + u.LastName,
  email: u.Email,
  role: u.UserRole
}))


  return (
    <Page
      title="Configuration"
      subtitle="Various configuration settings and options for site administrators"
    >
      <div className="configBorder">
        <h1 className="userListTitle">User List</h1>
        <div style={{ height: "auto", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={[
              { field: "name", headerName: "Name", width: 190 },
              { field: "email", headerName: "Email", width: 190 },
              {
                field: "accountRole",
                headerName: "Account Role",
                width: 190,
                renderCell: (params) => AccountRole(params.row.name, params.row.id, params.row.role),
                disableClickEventBubbling: true,
              },
              {
                field: "removeAccount",
                headerName: "Remove Account",
                width: 190,
                renderCell: (params) => RemoveAccount(params.row.id),
                disableClickEventBubbling: true,
              },
            ]}
            initialState={{
              pagination: {
                paginationModel: { page: 2, pageSize: 5 },
              },
            }}
            pageSizeOptions={[1, 1]}
          />
        </div>
        <div className="addAccountPosition">
          <AddAccount />
        </div>
      </div>
    
          



        




      <div className="applicationSettings">
        <h1 className="userListTitle">Application Settings</h1>
        <div style={{ height: "auto", width: "100%" }}>
          <DataGrid rowHeight={140}
            rows={[
              {id: 0, alidetime: "a", duration: "awd", threshhold: "ad"}
              ]}
            columns={[
              { 
                field: "alidetime", 
                headerName: "Default Slide Time", 
                width: 250,
                renderCell:  BasicTimePicker,
                disableClickEventBubbling: true,
              },
              { 
                field: "duration", 
                headerName: "Slide Duration",
                width: 250,
                renderCell:  MultipleSelectCheckmarks,
                disableClickEventBubbling: true,
              },
              {
                field: "threshhold",
                headerName: "Storage Threshold",
                width: 400,
                renderCell:  DiscreteSliderMarks,
                disableClickEventBubbling: true,
              },
            ]}
            initialState={{
              pagination: {
                paginationModel: { page: 2, pageSize: 5 },
              },
            }}
            pageSizeOptions={[1, 1]}
          />
        </div>
        <div className="addAccountPosition">
          <Button
          variant="contained"
          className="addAccount"
          >
          Apply Changes
        </Button>
        </div>
      </div>
    </Page>
  );
}
