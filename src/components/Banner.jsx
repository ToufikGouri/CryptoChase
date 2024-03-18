import React, { useEffect, useState } from 'react'
// import HeroBG from "../assets/HeroBG.gif"
import { styled } from "@mui/system"
// import Slider from "react-slick";
import axios from 'axios'
import { TrendingCoins } from '../config/api'
import numberWithCommas from '../config/numberFix'
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';       // use this in main.jsx if want to use alice throughout the code

const BannerDiv = styled('div')({
    height: 400,
    background: `url(https://wallpapers.com/images/hd/cryptocurrency-ethereum-art-ojd0r7g0szz1eob8.jpg) no-repeat center center / cover`,
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

// give ::before the image background
//    filter: saturate(0.8);


// Main component starts here
const Banner = () => {

    const [trending, setTrending] = useState([])

    const getTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins("inr"))
        setTrending(data)
    }

    console.log(trending);

    const responsive = {        //responsivess of carousel
        0: {
            items: 2,
        },
        512: {
            items: 4,
        }
    }

    useEffect(() => {
        getTrendingCoins()
    }, [])

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

                <h3> $ {numberWithCommas(coin.current_price.toFixed(2))} </h3>

            </CoinDiv>
        </Link>
    }
    )

    return (
        <>
            <BannerDiv>

                <h1 style={{ fontSize: 80 }} className='specialText' >Crypto Chase </h1>
                <h3 className='specialText'>Get all the info regarding your favorite crypto currency</h3>

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