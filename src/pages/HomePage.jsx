import React from 'react'
import Banner from '../components/Banner'
import CoinsTable from '../components/CoinsTable'
import { ThemeProvider, createTheme } from '@mui/material';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const HomePage = () => {
    return (
        <>
            <ThemeProvider theme={darkTheme} >
                <Banner />
                <CoinsTable />
            </ThemeProvider>
        </>
    )
}

export default HomePage