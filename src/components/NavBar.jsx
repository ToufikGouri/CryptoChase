import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import Logo from "../assets/CryptoChase_Logo.png"
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='transparent' >
        <Toolbar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "gold", fontWeight: "bold", fontFamily: "Montserrat" }}>
            <Link to='/' style={{ display: "inline-flex", alignItems: "center" }}>
              Crypto Chase
              <img src={Logo} height={30} style={{ marginLeft: 5 }} alt="Crpto Chase" />
            </Link>
          </Typography>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
