import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HistoricalChart } from '../config/api'
import axios from 'axios'
import { styled } from '@mui/system'
import { chartLabel, CustomTooltip } from '../config/rechartUtils'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { chartDays } from '../config/daysData'
import ChartBtn from './ChartBtn'
import numberWithCommas from '../config/numberFix'
import { CircularProgress } from '@mui/material'

const MainContainer = styled('div')({
    height: "100%",
    width: "100%",
})

const ButtonContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    width: "100%"
})

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
    }, [currency, days])

    if (!coinInfo.length === 0) {
        return <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
    }


    // ReChart Configuration 
    // CustomTooltip 
    const lineChartData = chartLabel(coinInfo, days)


    return (
        <>
            {!coin ?
                (<h1>Loading...</h1>) :

                (<MainContainer>
                    <ResponsiveContainer width="100%" height="100%" aspect={3}  >  {/* aspect={2.1}  */}
                        <LineChart data={lineChartData} margin={{ left: 20 }} >

                            <Tooltip
                                cursor={false}      // 👈 For adjusting the cursor on graph
                                content={<CustomTooltip days={days} currency={currency} coinInfo={coinInfo} />}
                            />

                            <Legend iconType='circle' />
                            <XAxis axisLine={false} dataKey="timing" fontSize={12} />

                            <YAxis
                                axisLine={false}                                              // 👈 To remove the line of axis
                                domain={['dataMin', 'dataMax']}                               // 👈 Start of the axis points
                                tickFormatter={value => numberWithCommas(value.toFixed(2))}   // 👈 Managing the value of axis
                                fontSize={12}
                            />

                            <Line
                                name={`Price (Past ${days} Days) in ${currency}`}
                                dataKey='price'
                                type='monotone'
                                stroke='#EEBC1D'
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 4 }}
                            />

                        </LineChart>

                        <ButtonContainer>
                            {chartDays.map(day =>
                                <ChartBtn
                                    key={day.value}
                                    onClick={() => setDays(day.value)}
                                    selected={day.value === days}
                                >
                                    {day.label}
                                </ChartBtn>
                            )}
                        </ButtonContainer>
                    </ResponsiveContainer>

                </MainContainer>)
            }

        </>
    )
}

export default CoinInfo