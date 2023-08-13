import React from 'react';
import { useForm } from 'react-hook-form';
import { addIncome } from '../../services/income';
import { useIncome } from '../../context/incomeContext';

const IncomeForm = ({user_id}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {dispatch } = useIncome(); // Destructure the dispatch function from the income context

    const onSubmitData = async (data) => {
        // Create an object with income data from the for
        const incomeData = {
            user_id: user_id,
            title: data.title,
            amount: Number(data.amount),
            date: data.date,
            category: data.category,
            description: data.description
        };
        try {
            // Add income data to the mongoDB database
            await addIncome(incomeData)
            dispatch( { type: 'ADD_INCOME', payload: incomeData }); // Dispatch an action to update the global income state
            console.log('Income added successfully', incomeData)
        }
        catch (error) {
            console.error('Error adding income:', error);
        }
    };

    return (
        <div className="p-4 bg-gray-700 text-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Income Form</h2>
            <form onSubmit={handleSubmit(onSubmitData)}>
                <div className="mb-3">
                    <label className="block font-semibold mb-1 text-black">Title</label>
                    <input type="text" className="w-full border p-2 text-black rounded" {...register("title", { required: true })} />
                    {errors.title && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="mb-3">
                    <label className="block font-semibold mb-1 text-black">Amount</label>
                    <input type="number" className="w-full border p-2 text-black rounded" {...register("amount", { required: true })} />
                    {errors.amount && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="mb-3">
                    <label className="block font-semibold mb-1 text-black">Date</label>
                    <input type="date" className="w-full border p-2 text-black rounded" {...register("date", { required: true })} />
                    {errors.date && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="mb-3">
                    <label className="block font-semibold mb-1 text-black">Category</label>
                    <select className="w-full border p-2 text-black rounded" {...register('category', { required: true })}>
                        <option value="" disabled>Select Category</option>
                        <option value="salary">Salary</option>
                        <option value="investment">Investment</option>
                        <option value="stocks">Stocks</option>
                        <option value="gift">Gift</option>
                        <option value="gift">Bank Transfer</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.category && <span className="text-red-500">This field is required</span>}
                    {register("category")?.value === "other" && (
                        <input type="text" placeholder='Enter Custom Category' className="w-full border p-2 mt-2 text-black rounded" {...register("customCategory")} />
                    )}
                </div>
                <div className="mb-3">
                    <label className="block font-semibold mb-1 text-black">Description</label>
                    <textarea className="w-full border p-2 text-black rounded" {...register("description")} />
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default IncomeForm;
