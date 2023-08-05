const ExpenseSchema = require('../models/expenseModel')

exports.addExpense = async (request, response) => {
    const {title, amount, category, description, date} = request.body;

    const expense = ExpenseSchema(
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
        if (amount <= 0 || typeof amount !== 'number') {
            return response.status(400).json({ errorMessage: "Amount must be a positive number" });
        }

        await expense.save()
        response.status(200).json({message: "Expense added successfully."});
    } catch (error) {
        console.error("Error adding expense:", error);
        response.status(500).json({errorMessage: "Server Error"});
    }
    console.log(expense);
}

exports.getExpense = async (request, response) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        console.log(expenses);
        response.status(200).json(expenses);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        response.status(500).json({ message: 'Server error' });
    }
}

exports.deleteExpense = async (request, response) => {
    const id = request.params.id;
    console.log(id)
    try {
        await ExpenseSchema.findByIdAndDelete(id)
        response.status(200).json({message: "Expense deleted successfully."});
    } catch (error) {
        console.error("Error deleting expense:", error);
        response.status(500).json({errorMessage: "Server error"});
    }
}
