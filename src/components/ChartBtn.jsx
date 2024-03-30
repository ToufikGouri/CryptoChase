import { Button } from '@mui/material'
import React from 'react'

const ChartBtn = ({ children, selected, onClick }) => {
    const btnStyles = {
        border: "1px solid gold",
        borderRadius: "5px",
        padding: "10px 20px",
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "white",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
            backgroundColor: "gold",
            color: "black", 
        },
        width: "22%",
    }

    return (
        <>
            <Button sx={btnStyles} onClick={onClick} selected={selected} >
                {children}
            </Button>
        </>
    )
}

export default ChartBtn