import React, { useEffect, useState } from 'react'
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system'
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
    fontFamily: "Montserrat"
})

const StyledPagination = styled(Pagination)({
    "& .MuiPaginationItem-root": {
        color: "gold"
    }
})

const CoinsTable = () => {

    const { currency, symbol } = useSelector(state => state.cryptoReducer)
    const [search, setSearch] = useState("")
    const [coins, setCoins] = useState([])
    const [page, setPage] = useState(1)
    const navigate = useNavigate()

    const getCoins = async () => {
        const { data } = await axios.get(CoinList(currency))
        setCoins(data)
    }

    const handleSearch = () => {
        return coins.filter(coin =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)) 
    }

    useEffect(() => {
        getCoins()
    }, [])

    return (
        <>
            <TableWrapper>
                <Typography variant='h4' style={{ fontFamily: 'Montserrat', margin: 18 }} >Cryptocurrency Prices by Market Cap</Typography>
                <TextField
                    label="Search For a Crypto Currency..."
                    variant="outlined"
                    sx={{ width: "80%", marginBottom: 3 }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <TableContainer sx={{ width: "80%" }} >
                    <Table>
                        <TableHead style={{ backgroundColor: '#EEBC1D' }} >
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map(head => (
                                    <TableCell
                                        key={head}
                                        sx={{ color: "black", fontFamily: "Montserrat", fontWeight: '700' }}
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
                                            <img src={coin.image} height="50px" alt={coin.name} style={{ marginBottom: 10 }} />
                                            <span>
                                                <Typography variant='h5' style={{ textTransform: "uppercase" }} >{coin.symbol}</Typography>
                                                <Typography sx={{ color: "darkgrey" }} >{coin.name}</Typography>
                                            </span>
                                        </TableCell>

                                        <TableCell align='right' >
                                            {symbol} {' '} {numberWithCommas(coin.current_price.toFixed(2))}
                                        </TableCell>

                                        <TableCell align='right' sx={{ color: profit > 0 ? "rgb(14, 203, 129)" : 'red', fontWeight: 500 }} >
                                            {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>

                                        <TableCell align='right' >
                                            {symbol} {" "} {numberWithCommas(coin.market_cap.toString().slice(0, -6))}M
                                        </TableCell>

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