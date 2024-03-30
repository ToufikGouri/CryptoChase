import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import { useSelector } from 'react-redux'
import CoinInfo from '../components/CoinInfo'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import HTMLReactParser from 'html-react-parser'
import numberWithCommas from '../config/numberFix'


const SideBar = styled('div')({
    width: "30%",
    marginTop: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column"
})

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

const MarketData = styled('div')({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
})



const InfoContainer = styled('div')({   
    width: "70%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 25,
    padding: 40,
})

const CoinPage = () => {

    const { id } = useParams()
    const { currency, symbol } = useSelector(state => state.cryptoReducer)
    const [coin, setcoin] = useState()

    const getCoin = async () => {
        const { data } = await axios.get(SingleCoin(id))
        setcoin(data)
    } 

    useEffect(() => {
        getCoin()
    }, [currency])

    return (
        <>
            {!coin ?
                (<h1>Loading COIN PAGE...</h1>) :
                (
                    <div style={{ display: "flex" }}>

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
                    </div>
                )
            }
        </>
    )
}

export default CoinPage