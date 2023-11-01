import React, {useState} from "react";
import "./navigation.css";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import axios from "axios";
import { Box, Button, Icon, Modal, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const boxStyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

const actionBarStyles = {
  position: 'absolute',
  top: '16px',
  right: '0',

  // display: 'flex',
  // flexDirection: 'row',
  // justifyContent:'flex-end',
}

export default function Navigation() {
  const [open,setOpen] = useState(false);
  const handleOpen = () => {
      setOpen(true);
  }
  const handleClose = () => {
      setOpen(false);
  }

  const { user, setUser } = React.useContext(AppContext);
  const role = user ? user.UserRole : "Guest";
  const handleLogout = () => {
    axios
      .post("http://localhost:4000/logout", {}, { withCredentials: true })
      .then((response) => {
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="navContainer">
      <Modal open={open} onClose={handleClose}>
          <Box sx={{...boxStyle, maxWidth:'280px', borderRadius:'10px', padding: '72px 56px 64px 56px'}}>
              <div style={{...actionBarStyles}}>
                <Button onClick={handleClose}><CloseIcon /></Button>
              </div>
              <Typography variant="h5" sx={{textAlign:'left', fontWeight:'bold', padding:'8px 40px 0 0', marginBottom: '32px'}}>Are you sure you want to log out?</Typography>

              <Stack direction="row" spacing={2}>
                  <Button variant="contained" sx={{width:'50%'}} onClick={handleClose}>Cancel</Button>

                  <Button variant="contained" sx={{width:'50%', minHeight:'56px'}} color="secondary">
                      <Link to="/login" onClick={handleLogout()}>Log Out</Link>
                  </Button>
              </Stack>
          </Box>
      </Modal>

      <div className="nav">
        <h1 className="User">{role.toUpperCase()}</h1>
        <div className="calendarOptions">
          <div className="topOptions">
            <h2 className="links">
              <Link to="/events">Events </Link>
            </h2>
          </div>
          <div className="topOptions">
            <h2 className="links">
              <Link to="/calendar"> Calendar View </Link>
            </h2>
          </div>
        </div>
        <div className="border"></div>
        <div className="bottomOptions">
          <h2 className="links">
            <Link to="/configuration"> Configuration </Link>
          </h2>
        </div>
        <h2 className="links">
          <Link to="/help">Help </Link>
        </h2>

        {user != null && (
          <div className="bottomOptions">
            <h2 className="links">
              <Box onClick={() => {
                handleOpen();
              }}><Link>Log Out</Link></Box>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
