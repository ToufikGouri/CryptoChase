// Reusable Code of ReChartJs

import numberWithCommas from "./numberFix";

export const chartLabel = (coinInfo, days) => {
    return coinInfo.map(coin => {
        let date = new Date(coin[0]);
        let time = date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;

        return {
            timing: days === 1 ? time : date.toLocaleDateString(),
            price: coin[1]
        };
    })
}

export const CustomTooltip = ({ active, payload, label, days, currency, coinInfo }) => {
    if (active && payload && payload.length) {

        return (
            <div className="custom-tooltip" style={{ backgroundColor: "rgba(0,0,0,.5)", padding: 5 }}>
                <p className="label"> {label} </p>
                <p className="intro" style={{ fontSize: 12 }} >
                    Price (Past {days} Days) in {currency}: {numberWithCommas(payload[0].value.toFixed(2))}
                </p>

            </div>
        );
    }

    return null;
};
