import React, { useEffect, useState } from 'react'
import { LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/system'
import axios from 'axios'
import { CoinList } from '../config/api'
import numberWithCommas from '../config/numberFix'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const TableWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
})

const TableRowOfBody = styled(TableRow)({
    backgroundColor: "#16171a",
    cursor: 'pointer',
    "&:hover": {
        backgroundColor: "#131111"
    },
    fontFamily: "Montserrat",
})

const TheTableCell = styled(TableCell)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        padding: "0px !important",
        fontSize: 10,
    }
    // in inline css another good approach is sx={{ marginRight: theme.breakpoints.down('sm') ? '10px' : 'inherit' }}
}))

const StyledPagination = styled(Pagination)(({ theme }) => ({
    "& .MuiPaginationItem-root": {
        color: "gold"
    },
    [theme.breakpoints.down('sm')]: {
        padding: "20px 0 !important",
    }
}))

const CoinsTable = () => {

    const { currency, symbol } = useSelector(state => state.cryptoReducer)
    const [search, setSearch] = useState("")
    const [coins, setCoins] = useState([])
    const [page, setPage] = useState(1)
    const [isScreenSm, setisScreenSm] = useState(false)
    const navigate = useNavigate()
    const theme = useTheme()

    const getCoins = async () => {
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
    }

    const handleSearch = () => {
        return coins.filter(coin =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search))
    }


    // checking if the window width is less than 600
    const winSize = () => {
        if (window.innerWidth < 600) {
            setisScreenSm(true)
        } else {
            setisScreenSm(false)
        }
    }
    window.addEventListener('resize', winSize)


    useEffect(() => {
        getCoins()
        window.addEventListener('resize', winSize)      // for first render
    }, [])


    if (coins.length === 0) {
        return <LinearProgress style={{ backgroundColor: "gold" }} />
    }

    return (
        <>
            <TableWrapper>
                <Typography variant={isScreenSm ? 'h5' : 'h4'} style={{ fontFamily: 'Montserrat', margin: 18, textAlign: 'center' }} >Cryptocurrency Prices by Market Cap</Typography>
                <TextField
                    label="Search For a Crypto Currency..."
                    variant="outlined"
                    sx={{ width: "80%", marginBottom: 3, '@media (max-width: 600px)': { width: '98%' } }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <TableContainer sx={{ width: "80%", '@media (max-width: 600px)': { width: '98%' }, }} >
                    <Table>
                        <TableHead style={{ backgroundColor: '#EEBC1D' }} >
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map(head => (
                                    <TableCell
                                        key={head}
                                        sx={{ color: "black", fontFamily: "Montserrat", fontWeight: '700', '@media (max-width: 600px)': { fontSize: "12px", textAlign: 'center' } }}
                                        align={head === "Coin" ? "left" : "right"}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map(coin => {

                                const profit = coin.price_change_percentage_24h > 0;
                                return (
                                    <TableRowOfBody key={coin.name} onClick={() => navigate(`/coins/${coin.id}`)} >

                                        <TableCell align='left' component='th' scope='row' style={{ display: "flex", gap: 15 }} >
                                            <img src={coin.image} height="50px" className='tableLogo' alt={coin.name} style={{ marginBottom: 10 }} />
                                            <span>
                                                <Typography sx={{ textTransform: "uppercase", '@media (max-width: 600px)': { fontSize: "14px" }, }} >{coin.symbol}</Typography>
                                                <Typography sx={{ color: "darkgrey", '@media (max-width: 600px)': { fontSize: '12px' }, }} >{coin.name}</Typography>
                                            </span>
                                        </TableCell>

                                        <TheTableCell align='right'  >
                                            {symbol} {' '} {numberWithCommas(coin.current_price.toFixed(2))}
                                        </TheTableCell>

                                        <TheTableCell align={isScreenSm ? 'center' : 'right'} sx={{ color: profit > 0 ? "rgb(14, 203, 129)" : 'red', fontWeight: 500 }} >
                                            {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)}%
                                        </TheTableCell>

                                        <TheTableCell align={isScreenSm ? 'center' : 'right'} >
                                            {symbol} {" "} {numberWithCommas(coin.market_cap.toString().slice(0, -6))}M
                                        </TheTableCell>

                                    </TableRowOfBody>
                                )
                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>


                <StyledPagination
                    style={{ padding: 20, width: "100%", display: "flex", justifyContent: "center" }}
                    count={parseInt(handleSearch()?.length / 10)}
                    onChange={(e, val) => { setPage(val); window.scroll(0, 450) }}
                />

            </TableWrapper>
        </>
    )
}

export default CoinsTable