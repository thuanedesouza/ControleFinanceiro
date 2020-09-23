import React, { useState, useEffect } from 'react'

export default function MaintenanceScreen({ transaction, onCancel, onSave }) {


    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('-');

    useEffect(() => {
        if (!transaction) {
            return;
        }
        const { description, value, category, yearMonthDay, type } = transaction;
        console.log(description, value, category, yearMonthDay)
        setDescription(transaction.description);
        setValue(value);
        setCategory(category);
        setDate(yearMonthDay);
        setType(type);

    }, [transaction])

    const handleDescriptionChange = (event) => {

        const newDescription = event.target.value.trim();
        setDescription(newDescription);

    }


    const handleCategoryChange = (event) => {

        const newCategory = event.target.value.trim();
        setCategory(newCategory);

    }

    const handleValueChange = (event) => {

        const newValue = event.target.value.trim();
        setValue(newValue);

    }

    const handleDateChange = (event) => {

        const newDate = event.target.value.trim();
        setDate(newDate);

    }

    const handleTypeChange = (event) => {
        const newType = event.target.value;
        setType(newType);
    }

    const handleCancelClick = () =>{
        onCancel();
    }

    const handleSaveClick = () => {
        const newTransaction = {
            id:  transaction.id,
            description,
            value, 
            type,
            yearMonthDay:date, 
            category
        }
        onSave(newTransaction)
    }

    return (
        <div>
            <div style ={{marginBottom: '20px'}}>
                <span>
                    <label>
                        <input
                            name="expense_earning"
                            type="radio"
                            checked={type === '-'}
                            onChange={handleTypeChange}
                            value='-' />
                        <span>Despesa</span>
                    </label>
                </span>

                <span style = {{marginLeft:'30px'}}>
                    <label>
                        <input
                            name="expense_earning"
                            type="radio" checked={type === '+'}
                            onChange={handleTypeChange}
                            value='+' />
                        <span>Receita</span>
                    </label>
                </span>
            </div>

            <div className='input-field'>
                <input
                    type='text'
                    value={description}
                    onChange={handleDescriptionChange}
                    id="inputDescription" />
                <label htmlFor="inputDescription" className='active'>Descrição </label>
            </div>

            <div className='input-field'>
                <input
                    type='text'
                    value={category}
                    onChange={handleCategoryChange}
                    id="inputCategory" />
                <label htmlFor="inputCategory" className='active'>Valor:</label>
            </div>

            <div className='input-field'>
                <input
                    type='number'
                    value={value}
                    onChange={handleValueChange}
                    id="inputValue" />
                <label htmlFor="inputValue" className='active'>Valor:</label>
            </div>

            <div className='input-field'>
                <input
                    type='date'
                    value={date}
                    onChange={handleDateChange}
                    id="inputDate" />
                <label htmlFor="inputDate" className='active'>Data:</label>
            </div>

            <button className = "waves-effect waves-ligth btn" onClick = {handleSaveClick}>Salvar</button>
            <button
             style = {{marginLeft: '10px'}} 
             className = "waves-effect waves-ligth btn red darken-4"
            onClick = {handleCancelClick}>Cancelar</button>
        </div>

    );
}
