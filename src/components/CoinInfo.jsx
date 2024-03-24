import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { HistoricalChart } from '../config/api'
import axios from 'axios'

const CoinInfo = ({ coin }) => {

    const [coinInfo, setCoinInfo] = useState([])
    const [days, setDays] = useState(1)
    const { currency } = useSelector(state => state.cryptoReducer)

    const getHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
        setCoinInfo(data.prices)
    }

    useEffect(() => {
        getHistoricalData()
    }, [currency])

    return (
        <>
            <h1>CoinInfo of {coin?.name}</h1>
        </>
    )
}

export default CoinInfo