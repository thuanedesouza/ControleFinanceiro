import React from 'react'
const EARNING_COLOR = '#4cd137';
const EXPENSE_COLOR = '#c23640';

export default function ListScreen({
    transactions,
    periods,
    currentPeriod,
    filteredText,
    onPeriodChange,
    onDelete,
    onEdit,
    onNewTransaction,
    onFilterChange }) {

    const { transactionStyle, buttonStyle } = styles

    return (
        <div>
            <select className="browser-default" value={currentPeriod} onChange={onPeriodChange}>

                {periods.map((period) => {
                    return <option key={period}>{period[0]}</option>
                })}
            </select>

            <input style={{marginTop: '20px', marginBottom: '20px'}} 
                type='text' placeholder='Filtro..' 
                value={filteredText} 
                onChange={onFilterChange} />

            <button style={{marginTop: '20px', marginBottom: '20px'}} 
                className = "waves-effect waves-light btn" 
                onClick = {onNewTransaction}> 
                Novo Lançamento
            </button>
            
            <h6 style={{marginBottom: '20px'}} >Lançamentos: {transactions.length}</h6>

            {transactions.map((transaction) => {
                const currentColor = transaction.type === '+' ? EARNING_COLOR : EXPENSE_COLOR;

                return <div
                    key={transaction.id}
                    style={{ ...transactionStyle, backgroundColor: currentColor, display: 'block' }}>
                    <span style={{ buttonStyle}}>
                        <span>
                            {transaction.yearMonthDay} - <strong>{transaction.category}</strong> - {transaction.description} - {transaction.value}
                        </span>
                        <span className="right" style = {{alignItems: 'center'}}>
                            <button className="waves-effect waves-light btn-small" onClick={onEdit} id={transaction.id}>Editar</button>
                            <button style = {{ marginLeft:'5px', color:'#1e272e'}} className="waves-effect waves-light btn-small grey lighten-1" onClick={onDelete} id={transaction.id}>Deletar</button>
                        </span>

                    </span>
                </div>
            })}

        </div>
    )
}


const styles = {
    transactionStyle: {
        padding: '10px',
        margin: '5px',
        border: '1px solid #9AECDB',
        borderRadius: '2px',
        display: 'flex',
        alignItems: 'space-around',
        color: 'white'
    },
    buttonStyle: {
        margin: '20px',
        alignItems: 'center'
    }
}
