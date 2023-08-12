// Import the IncomeSchema from the specified model file
const IncomeSchema = require("../models/incomeModel");

// Function to add a new income entry
exports.addIncome = async (request, response) => {
    const {user_id, title, amount, category, description, date } = request.body;

    // Create a new instance of IncomeSchema (Mongoose model)
    const income = new IncomeSchema({
        user_id: user_id,
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
            return response.status(400).json({ errorMessage: "Amount must be positive." });
        }
        
        // Save the income entry to the database
        await income.save();
        response.status(200).json({ message: "Income added successfully." });
    } catch (error) {
        console.error("Error adding income:", error);
        response.status(500).json({ errorMessage: "Server Error" });
    }
    console.log(income);
}

// Function to fetch income entries
exports.getIncome = async (request, response) => {
    try {
        // Retrieve income entries from the database, sorted by creation date (newest first)
        const income = await IncomeSchema.find().sort({ createdAt: -1 });
        console.log(income);
        response.status(200).json(income);
    } catch (error) {
        response.status(500).json({ message: 'Server error' });
    }
}

// Function to delete an income entry
exports.deleteIncome = async (request, response) => {
    const { id } = request.params;
    console.log('id: ', id);
    try {
        // Find and delete an income entry by its ID
        await IncomeSchema.findByIdAndDelete(id);
        response.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        response.status(500).json({ message: "Server Error" });
    }
}
