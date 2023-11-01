import React, {useState} from "react";
import "./navigation.css";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import axios from "axios";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";

const boxStyle = {
  position: 'absolute',
  top: '24%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
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
          <Box sx={{...boxStyle, maxWidth:'180px', borderRadius:'10px', padding: '24px'}}>
              <Typography variant="h4" sx={{textAlign:'center',padding:'16px 0', marginBottom: '16px'}}>Log out?</Typography>

              <Stack direction="row" spacing={2}>
                  <Button variant="contained" sx={{width:'50%'}}>
                      <Link to="/login">Yes</Link>
                  </Button>
                  <Button variant="contained" sx={{width:'50%'}} onClick={handleClose}>No</Button>
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
                handleLogout();
              }}><Link>Log Out</Link></Box>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
