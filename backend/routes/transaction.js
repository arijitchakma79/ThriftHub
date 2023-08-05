const  { addIncome, getIncome, deleteIncome }  = require('../controllers/income')
const router = require('express').Router();
/*
router.get('/', (request, response) => {
    response.send('Hello World');
});
*/

router.post('/add-income', addIncome )
    .get('/get-incomes',getIncome)
    .delete('/delete-income/:id', deleteIncome)


module.exports = router;
