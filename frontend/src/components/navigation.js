import React, {useState} from "react";
import "./navigation.css";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import axios from "axios";
import { Box, Button, Divider, Icon, Modal, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import logo from "../assets/images/logo_transparent.png";

const modalStyle = {
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
  const role = user ? user.UserRole : "Member";
  
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
          <Box sx={{...modalStyle, maxWidth:'280px', borderRadius:'10px', padding: '72px 56px 64px 56px'}}>
              <div style={{...actionBarStyles}}>
                <Button onClick={handleClose}><CloseIcon /></Button>
              </div>
              <Typography variant="h5" sx={{textAlign:'left', fontWeight:'bold', padding:'8px 40px 0 0', marginBottom: '32px'}}>Are you sure you want to log out?</Typography>

              <Stack direction="row" spacing={2}>
                  <Button variant="contained" sx={{width:'50%'}} onClick={handleClose}>Cancel</Button>

                  <Button variant="contained" sx={{width:'50%', minHeight:'56px'}} color="secondary">
                      <Link to="/login" onClick={handleLogout}>Log Out</Link>
                  </Button>
              </Stack>
          </Box>
      </Modal>

      <Stack direction="column" spacing={56} className="nav" sx={{textAlign:'center'}}>
        <Stack direction="column" spacing={16}>
          <Stack direction="column" spacing={2}>
            <Box className="logoContainer">
              <Box className="iconContainer" sx={{backgroundColor:'white', borderRadius:'50%', height:'3em',width:'3em',padding:'0.5em',margin:'0.4em'}}>
                <img src={logo} alt="St. Peter's Kitchen logo" style={{height:'3em',width:'3em'}} />
              </Box>
              <Typography variant="h7" sx={{textTransform:'uppercase'}}>St. Peter's Kitchen</Typography>
              <Typography variant="h4" sx={{fontWeight:'bold', textTransform:'capitalize'}}>{user!=null ? role : "Viewer"}</Typography>
            </Box>
          </Stack>

          <Stack direction="column" spacing={4}>
            <Typography variant="h5" sx={{textTransform:'capitalize'}}>
              <Link to="/events">{user!=null ? "Home" : "Weekly Events"}</Link>
            </Typography>

            <Typography variant="h5" sx={{textTransform:'capitalize'}}>
              <Link to="/calendar">Calendar View</Link>
            </Typography>

            <Typography variant="h5" sx={{textTransform:'capitalize'}}>
              <Link to="/information">Information</Link>
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="column" spacing={4}>
          <Divider />

          <Typography variant="h5" sx={{textTransform:'capitalize'}}>
              <Link to="/configuration">Configuration</Link>
            </Typography>
          
          <Typography variant="h5" sx={{textTransform:'capitalize'}}>
            {user!=null ? 
              <Link onClick={handleOpen}>Log Out</Link>
            : 
              <Link to="/login">Log In</Link>
            }</Typography> 
        </Stack>
      </Stack>
    </div>
  );
}
