// Import necessary dependencies from React
import { createContext, useContext, useReducer } from "react";

// Create a context for managing income data
const IncomeContext = createContext();

// Define the initial state for income data
const initialState = { incomeData: [] };

// Define the reducer function to manage state updates
const incomeReducer = (state, action) => {
    switch (action.type) {
        // When an 'ADD_INCOME' action is dispatched
        case 'ADD_INCOME':
            // Add the new income data to the state's incomeData array
            return { ...state, incomeData: [...state.incomeData, action.payload] };

        // When an 'UPDATE_INCOME' action is dispatched
        case 'UPDATE_INCOME':
            // Replace the entire incomeData array with the new data
            return { ...state, incomeData: action.payload };

        // For any other action type, return the current state unchanged
        default:
            return state;
    }
};

// Create a provider component to wrap around your app
export const IncomeProvider = ({ children }) => {
    // Use the useReducer hook to manage state with the incomeReducer
    const [state, dispatch] = useReducer(incomeReducer, initialState);

    // Provide the state and dispatch function to the context
    return (
        <IncomeContext.Provider value={{ state, dispatch }}>
            {children}
        </IncomeContext.Provider>
    );
};

// Create a custom hook for using the income context
export const useIncome = () => {
    // Use the useContext hook to access the income context
    return useContext(IncomeContext);
};
