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
        response.status(500).json({errorMessage: "Server"});
    }
    console.log(income);
}


exports.getIncome = async( request, response) => {
    try {
        const income = await IncomeSchema.find().sort({createdAt: -1});
        console.log(income)
        response.status(200).json(income);
    }catch (error) {
        response.status(500).json({message: 'Server error'})

    }
}


exports.deleteIncome = async (request, response) => {
        const { id }  = request.params;
        console.log('id: ',id);
        IncomeSchema.findByIdAndDelete(id).then( (income) => {
            response.status(200).json({message: 'Income Deleted'})
        })
        .catch( (error) => {
            response.status(200).json({message: "Server Error"})
        })
}


