import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Select, MenuItem, createTheme, ThemeProvider } from '@mui/material';
import Logo from "../assets/CryptoChase_Logo.png"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from '../redux/features/cryptoSlice';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function NavBar() {

  const currency = useSelector((state) => state.cryptoReducer.currency)
  const dispatch = useDispatch()

  return (
    <ThemeProvider theme={darkTheme} >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color='transparent' >
          <Toolbar>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "gold", fontWeight: "bold", fontFamily: "Montserrat" }}>
              <Link to='/' style={{ display: "inline-flex", alignItems: "center" }}>
                Crypto Chase
                <img src={Logo} height={30} style={{ marginLeft: 5 }} alt="Crpto Chase" />
              </Link>
            </Typography>

            <Select
              variant='outlined'
              value={currency}
              onChange={(e) => dispatch(setCurrency(e.target.value))}
              style={{ width: 100, height: 40, marginRight: 15 }}
            >

              <MenuItem value="INR" >INR</MenuItem>
              <MenuItem value="USD" >USD</MenuItem>

            </Select>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
