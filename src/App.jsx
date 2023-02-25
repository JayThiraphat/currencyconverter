
import { useEffect, useState } from 'react'
import './App.css'
import money from './assets/img/money.png'
import CurrencyComponent from './components/CurrencyComponent'

function App() {
  const [currencyChoice,setcurrencyChoice] = useState([])
  const [fromCurrency,setFromCurrency] = useState("USD")
  const [toCurrency,setToCurrency] = useState("THB")

  const [amount,setAmount] = useState(1)
  const [exChangeRate,setExchangeRate] = useState(0)
  const [dateCurrency,setdateCurrency] = useState("")
  const [checkFromCurrency,setcheckFromCurrency] = useState(true)
  let fromamount,toamount

  if(checkFromCurrency){
    fromamount = amount
    toamount = (amount*exChangeRate).toFixed(2)
  }else{
    toamount = amount
    fromamount =(amount/exChangeRate).toFixed(2)
  }

  useEffect(()=>{
    const url=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
    setcurrencyChoice([...Object.keys(data.rates)])
    setExchangeRate(data.rates[toCurrency])
    setdateCurrency(data.date)
    })
},[fromCurrency,toCurrency])

const amountFromCurrency=(e)=>{
  setAmount(e.target.value)
  setcheckFromCurrency(true)
}
const amountToCurrency=(e)=>{
  setAmount(e.target.value)
  setcheckFromCurrency(false)
}

  return (
    <div className="App">
      <img src={money} alt="logo" className='money-img'></img>
      <h1>แอพแปลงสกุลเงิน (API)</h1>
      <span> ณ วันที่ {dateCurrency}</span>
      <div className="containner">
        <CurrencyComponent 
        currencyChoice={currencyChoice} 
        selectcurrency={fromCurrency}
        changeCurrency={(e)=>setFromCurrency(e.target.value)}
        amount ={fromamount}
        onchangeAmount = {amountFromCurrency}
        />
        <div className="equal">=</div>
        <CurrencyComponent 
        currencyChoice={currencyChoice} 
        selectcurrency={toCurrency}
        changeCurrency={(e)=>setToCurrency(e.target.value)}
        amount ={toamount}
        onchangeAmount = {amountToCurrency}
        />
      </div>
    </div>
  )
}

export default App
