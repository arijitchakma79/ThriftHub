import axios from 'axios';


const BASE_URL = 'http://localhost:5000/api/v1/';

const addExpenses = async (expenseData) => {
    try {
        const response = await axios.post(`${BASE_URL}add-expense`, expenseData);
        console.log('Expense Added successfully', response);
        alert('Sucessfully saved');
    } catch (error) {
        console.log('Error adding expense:', error);
    };
};


const getExpenseData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}get-expenses`);
        console.log(response.data)
        return response.data
    }
    catch(error) {
        console.log('fetching expense data',error)
    };
};

const deleteExpense = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        console.log("Expense deleted successfully")
        alert("Successfully deleted")
    } catch(error){
        console.log("Error adding expense:", error)
    };
};


export {addExpenses, getExpenseData, deleteExpense};