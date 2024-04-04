import React, { useEffect, useState } from 'react'
import HeroBG from "../assets/HeroBG.jpg"
import { styled, useTheme } from "@mui/system"
import axios from 'axios'
import { TrendingCoins } from '../config/api'
import numberWithCommas from '../config/numberFix'
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';       // use this in main.jsx if want to use alice throughout the code
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'

const BannerDiv = styled('div')({
    height: 400,
    background: `url(${HeroBG}) no-repeat center center / cover`,
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
    flexDirection: "column",
})

const CarouselMain = styled('div')({
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    width: "80%",
})

const CoinDiv = styled('div')({
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'white',
    textShadow: "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000",
    filter: "drop-shadow(2px 4px 6px black)"
})


const Heading = styled(Typography)(({ theme }) => ({
    fontSize: 80,
    fontFamily: "Montserrat",
    fontWeight: 800,
    [theme.breakpoints.down('sm')]: {
        fontSize: 45,
    },
}))

const SubHeading = styled(Typography)(({ theme }) => ({
    fontSize: 18,
    fontFamily: "Montserrat",
    fontWeight: 800,
    textAlign: "center",
    padding: "0 8px",
    [theme.breakpoints.down('sm')]: {
        fontSize: 14,
    },
}))


// Main component starts here
const Banner = () => {

    const [trending, setTrending] = useState([])
    const { currency, symbol } = useSelector(state => state.cryptoReducer)
    const theme = useTheme()

    const getTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }

    const responsive = {        //responsivess of carousel
        0: {
            items: 2,
        },
        512: {
            items: 3,
        },
        768: {
            items: 4
        }
    }

    useEffect(() => {
        getTrendingCoins()
    }, [currency])

    // carousel items
    const items = trending.map(coin => {
        let profit = coin.price_change_percentage_24h > 0;

        return <Link key={coin.id} to={`/coins/${coin.id}`} >
            <CoinDiv >
                <img src={coin.image} height="80px" alt={coin.name} />
                <h4> {coin.symbol.toUpperCase()}
                    &nbsp;
                    <span style={{ color: profit > 0 ? 'rgb(14, 203, 129)' : 'red', fontWeight: 800, textShadow: "none" }} >
                        {profit && "+"}{coin.price_change_percentage_24h}%
                    </span>
                </h4>

                <h3> {symbol} {numberWithCommas(coin.current_price.toFixed(2))} </h3>

            </CoinDiv>
        </Link>
    }
    )

    return (
        <>
            <BannerDiv>

                <Heading className='specialText' >Crypto Chase </Heading>
                <SubHeading className='specialText'>Get all the info regarding your favorite crypto currency</SubHeading>

                <CarouselMain >
                    <AliceCarousel
                        mouseTracking
                        infinite
                        autoPlayInterval={1000}
                        animationDuration={1500}
                        disableDotsControls
                        disableButtonsControls
                        responsive={responsive}
                        autoPlay
                        items={items}
                    />
                </CarouselMain>

            </BannerDiv>

        </>
    )
}

export default Banner