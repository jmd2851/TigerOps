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
import AppContext from "../../AppContext";

function AccountRole(userName, userId, userRole, refetchUsers) {
  const [role, setRole] = useState(userRole);
  const [open, setOpen] = React.useState(false);

  const { showAlert } = React.useContext(AppContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const body = {
      role: role,
    };
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    };
    axios
      .put(
        `${config[process.env.NODE_ENV].apiDomain}/users/${userId}`,
        body,
        axiosConfig
      )
      .then(() => {
        showAlert("success", "Successfully updated the user.");
        refetchUsers();
        setOpen(false);
      })
      .catch(() => {
        showAlert("error", "Something went wrong...");
      });
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
          <div className="accountName">
            <h3>{userName}</h3>
          </div>
          <FormControl>
            <FormLabel className="radioButton">Account Type:</FormLabel>
            <RadioGroup defaultValue={userRole} name="adminButton">
              <FormControlLabel
                value="admin"
                control={<Radio checked={role.toLowerCase() === "admin"} />}
                label="Admin"
                onChange={(e) => setRole(e.target.value)}
              />
              <FormControlLabel
                value="user"
                control={<Radio checked={role.toLowerCase() === "user"} />}
                label="User"
                onChange={(e) => setRole(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function RemoveAccount(rowId, refetchUsers) {
  const [open, setOpen] = React.useState(false);

  const { showAlert } = React.useContext(AppContext);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    axios
      .delete(`${config[process.env.NODE_ENV].apiDomain}/users/${rowId}`, {
        withCredentials: true,
      })
      .then(() => {
        refetchUsers();
        showAlert("success", "Successfully deleted the user.");
        setOpen(false);
      })
      .catch(() => {
        showAlert("error", "Something went wrong...");
      });
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
            <Button
              onClick={handleClose}
              variant="contained"
              className="removeAccount_NoButton"
            >
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

function AddAccount(props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("user");

  const [open, setOpen] = React.useState(false);

  const { refetch } = props;
  const { showAlert } = React.useContext(AppContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const body = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      role: role,
    };
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    };
    axios
      .post(
        `${config[process.env.NODE_ENV].apiDomain}/users`,
        body,
        axiosConfig
      )
      .then(() => {
        refetch();
        showAlert("success", "Successfully created a new user.");
        setOpen(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRole("user");
      })
      .catch((err) => {
        showAlert("error", "Something went wrong...");
      });
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
                type="password"
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
                  value="user"
                  control={<Radio checked={role === "user"} />}
                  label="User"
                  onChange={(e) => setRole(e.target.value)}
                />
                <FormControlLabel
                  value="admin"
                  control={<Radio checked={role === "admin"} />}
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
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function DataTable() {
  const [user, setUser] = useState([]);
  const [refetch, setRefetch] = useState(0);

  const refetchUsers = () => {
    setRefetch(refetch + 1);
  };

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
  }, [refetch]);

  const rows = user.map((u) => ({
    id: u.UserID,
    name: u.FirstName + " " + u.LastName,
    email: u.Email,
    role: u.UserRole,
  }));

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
                renderCell: (params) =>
                  AccountRole(
                    params.row.name,
                    params.row.id,
                    params.row.role,
                    refetchUsers
                  ),
                disableClickEventBubbling: true,
              },
              {
                field: "removeAccount",
                headerName: "Remove Account",
                width: 190,
                renderCell: (params) =>
                  RemoveAccount(params.row.id, refetchUsers),
                disableClickEventBubbling: true,
              },
            ]}
            pageSizeOptions={[1, 1]}
          />
        </div>
        <div className="addAccountPosition">
          <AddAccount refetch={refetchUsers} />
        </div>
      </div>
    </Page>
  );
}
