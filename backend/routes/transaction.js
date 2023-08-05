const  { addIncome, getIncome, deleteIncome }  = require('../controllers/income')
const { addExpense, getExpense, deleteExpense } = require('../controllers/expenses')
const router = require('express').Router();
/*
router.get('/', (request, response) => {
    response.send('Hello World');
});
*/

router.post('/add-income', addIncome )
    .get('/get-incomes',getIncome)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)


module.exports = router;
