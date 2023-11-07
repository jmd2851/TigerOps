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
import axios from "axios";
import config from "../../configs.json";



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
              { field: "name", headerName: "name", width: 190 },
              { field: "email", headerName: "email", width: 190 },
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
    </Page>
  );
}
