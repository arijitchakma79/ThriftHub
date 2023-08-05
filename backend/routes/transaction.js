const  { addIncome }  = require('../controllers/income')
const router = require('express').Router();
/*
router.get('/', (request, response) => {
    response.send('Hello World');
});
*/

router.post('/add-income', addIncome )

module.exports = router;
