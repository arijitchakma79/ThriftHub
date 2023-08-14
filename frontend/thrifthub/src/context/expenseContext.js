import {createContext, useContext, useReducer} from 'react';

const ExpenseContext = createContext();

const initialState = { expenseData: [] };


const expenseReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE': 
            return {...state, expenseData: [...state.expenseData, action.payload] };
        case 'UPDATE_EXPENSE':
            return {...state, expenseData: action.payload};
        case 'DELETE_EXPENSE':
            const updatedExpenseData = state.expenseData.filter(expense => expense._id !== action.payload)
            return {...state, expenseData: updatedExpenseData};
        default: 
            return state; 
    }
};


export const ExpenseProvider = ( {children} ) => {
    const [ state, dispatch ] = useReducer(expenseReducer, initialState);

    return (
        <ExpenseContext.Provider value={ {state, dispatch}}>
            { children }
        </ExpenseContext.Provider>
    )
}

export const useExpense = () => {
    return useContext(ExpenseContext);
}