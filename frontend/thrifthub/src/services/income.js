import axios from 'axios';


const BASE_URL = "http://localhost:5000/api/v1/";

const addIncome = async (incomeData) => {
    try {
        const response = await axios.post(`${BASE_URL}add-income`, incomeData);
        console.log('Income added successfully', response);
        alert('Successfully saved');
    } catch (error) {
        console.error('Error adding income:', error);
    }
}

const getData = async ()=> {
    try{
        const response = await axios.get(`${BASE_URL}get-incomes`);
        return response.data       
    }
    catch (error) {
        console.error('fetching income data:', error)
    }
}

const deleteData = async (id) => {
    try{
        const response = await axios.delete(`${BASE_URL}delete-income/${id}`)
        console.log('Income deleted successfully ')
        alert('Successfully deleted')
    } catch (error) {
        console.log('Error deleting income', error);
    }
}

export { addIncome, getData, deleteData };