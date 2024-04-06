import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import { useSelector } from 'react-redux'
import CoinInfo from '../components/CoinInfo'
import { borderBottom, height, styled, useTheme } from '@mui/system'
import { LinearProgress, Typography } from '@mui/material'
import HTMLReactParser from 'html-react-parser'
import numberWithCommas from '../config/numberFix'


const AllContainer = styled('div')(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
    },
}))


const SideBar = styled('div')(({ theme }) => ({
    width: "30%",
    marginTop: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
    borderRight: "2px solid grey",
    [theme.breakpoints.down("md")]: {
        width: "100%",
        borderRight: "none"
    }
}))

const Heading = styled(Typography)({
    fontWeight: "bold",
    fontFamily: "Montserrat",
    marginBottom: 20
})

const Description = styled(Typography)({
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
})

const MarketData = styled('div')(({ theme }) => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
    },
    [theme.breakpoints.down("xs")]: {
        alignItems: "start",
    },
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "start",
    },
}))



const InfoContainer = styled('div')(({ theme }) => ({
    width: "70%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
        width: "100%",
        padding: 20,
        paddingTop: 0,
    },
}))

const CoinPage = () => {

    const { id } = useParams()
    const { currency, symbol } = useSelector(state => state.cryptoReducer)
    const [coin, setcoin] = useState()
    const theme = useTheme()

    const getCoin = async () => {
        const { data } = await axios.get(SingleCoin(id))
        setcoin(data)
    }

    document.title = `${coin?.name || id.toUpperCase()} | Crypto Chase`

    useEffect(() => {
        getCoin()

        return () => {
            document.title = 'Crypto Chase'
        }
    }, [currency])

    return (
        <>
            {!coin ?
                (<LinearProgress style={{ backgroundColor: "gold" }} />) :
                (
                    <AllContainer>

                        {/* SIDEBAR */}
                        {coin && <SideBar>
                            <img src={coin.image.large} alt={coin.name} height={200} style={{ marginBottom: 20 }} />
                            <Heading variant='h3'>{coin.name}</Heading>
                            <Description>
                                {HTMLReactParser(String(coin.description.en.split(". ")[0]))}.
                            </Description>

                            <MarketData >
                                <span style={{ display: "flex" }} >
                                    <Typography variant='h5' style={{ fontWeight: "bold", fontFamily: "Montserrat", marginBottom: 20 }} >
                                        Rank:
                                    </Typography>
                                    &nbsp; &nbsp;
                                    <Typography variant='h5' style={{ fontFamily: "Montserrat" }} >
                                        {coin.market_cap_rank}
                                    </Typography>
                                </span>

                                <span style={{ display: "flex" }} >
                                    <Typography variant='h5' style={{ fontWeight: "bold", fontFamily: "Montserrat", marginBottom: 20 }} >
                                        Current Price:
                                    </Typography>
                                    &nbsp; &nbsp;
                                    <Typography variant='h5' style={{ fontFamily: "Montserrat" }} >
                                        {symbol}{" "} {numberWithCommas(coin.market_data.current_price[currency.toLowerCase()])}
                                    </Typography>
                                </span>

                                <span style={{ display: "flex" }} >
                                    <Typography variant='h5' style={{ fontWeight: "bold", fontFamily: "Montserrat", marginBottom: 20 }} >
                                        Market Cap:
                                    </Typography>
                                    &nbsp; &nbsp;
                                    <Typography variant='h5' style={{ fontFamily: "Montserrat" }} >
                                        {symbol} {" "} {numberWithCommas(coin.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M
                                    </Typography>
                                </span>

                            </MarketData>

                        </SideBar>}




                        {/* COIN INFO */}
                        <InfoContainer>
                            <CoinInfo coin={coin} />
                        </InfoContainer>
                    </AllContainer>
                )
            }
        </>
    )
}

export default CoinPage