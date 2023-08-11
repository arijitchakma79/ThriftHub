const ExpenseSchema = require('../models/expenseModel');

// Function to add an expense
exports.addExpense = async (request, response) => {
    const { title, amount, category, description, date } = request.body;

    // Create a new instance of ExpenseSchema (Mongoose model)
    const expense = new ExpenseSchema({
        title: title,
        amount: amount,
        category: category,
        description: description,
        date: date
    });

    try {
        // Validate required fields and amount
        if (!title || !category || !description || !date) {
            return response.status(400).json({ errorMessage: "Please enter all required fields." });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return response.status(400).json({ errorMessage: "Amount must be a positive number." });
        }

        // Save the expense to the database
        await expense.save();
        response.status(200).json({ message: "Expense added successfully." });
    } catch (error) {
        console.error("Error adding expense:", error);
        response.status(500).json({ errorMessage: "Server Error" });
    }
    console.log(expense);
}

// Function to fetch expenses
exports.getExpense = async (request, response) => {
    try {
        // Retrieve expenses from the database, sorted by creation date (newest first)
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        console.log(expenses);
        response.status(200).json(expenses);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        response.status(500).json({ message: 'Server error' });
    }
}

// Function to delete an expense
exports.deleteExpense = async (request, response) => {
    const id = request.params.id;
    console.log(id);
    try {
        // Find and delete an expense by its ID
        await ExpenseSchema.findByIdAndDelete(id);
        response.status(200).json({ message: "Expense deleted successfully." });
    } catch (error) {
        console.error("Error deleting expense:", error);
        response.status(500).json({ errorMessage: "Server error" });
    }
}
