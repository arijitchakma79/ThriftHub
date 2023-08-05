//function to handle post
const IncomeSchema = require("../models/incomeModel")
exports.addIncome = async (request, response) => {
    const {title, amount, category, description, date} = request.body;

    const income = IncomeSchema(
        {
            title: title,
            amount: amount,
            category: category,
            description: description,
            date: date
        }
    )
    try {
        if (!title || !category || !description || !date) {
            return response.status(400).json({errorMessage: "Please enter all required fields."});
        }
        if (amount <= 0 || !amount === 'number') {
            return response.status(400).json({ errorMessage: "Amount must be positive" });
        }
        
        await income.save()
        response.status(200).json({message: "Income added successfully."});
    } catch (error) {
        console.error("Error adding income:", error);
        response.status(500).json({errorMessage: "Please try again later."});
    }
    console.log(income);
}