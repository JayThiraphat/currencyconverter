import './CurrencyComponent.css'
const CurrencyComponent =(props) =>{
   const {currencyChoice,selectcurrency,changeCurrency,amount,onchangeAmount} = props
   
    return(
        <div className="currency">
            <select value={selectcurrency} onChange={changeCurrency}>
                {currencyChoice.map((choice)=>
                    <option key={choice} value={choice}>{choice}</option>
                )}
            </select>
            <input type="number" 
                    value={amount} 
                    onChange={onchangeAmount}/>
        </div>
    )
}
export default CurrencyComponent