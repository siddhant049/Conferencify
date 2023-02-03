
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#002244' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Conferencify
          </Typography>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Heading
          </Typography> */}
          <Button color="inherit" >Home</Button>
          <Button color="inherit">Call for papers</Button>
          <Button color="inherit">My Conferences</Button>
          <Button color="inherit">Create Conference</Button>
          <Button color="inherit">Profile</Button>
        </Toolbar>
        
        
      </AppBar>
    </Box>
    </>

    
  )
}

export default Navbar