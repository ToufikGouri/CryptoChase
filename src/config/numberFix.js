export default function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")   //just a function to give comma to price for eg. $32,400
}