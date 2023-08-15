import React from "react";
import { useForm } from 'react-hook-form';
import { addExpenses } from '../../services/expense';
import { useExpense } from "../../context/expenseContext";

const ExpenseForm = ({user_id}) => {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { dispatch } = useExpense();

    const onSubmitData =  async (data) => {

        const expenseData={
            user_id: user_id,
            title: data.title,
            amount: Number(data.amount),
            date: data.date,
            category: data.category,
            description: data.description
       };

       try {
        await addExpenses(expenseData)
        dispatch( { type: 'ADD_EXPENSE', payload: expenseData} );
        console.log('Expense added successfully', expenseData);
       }
       catch (error){
        console.log('Error adding expense', error);
       }
    }

    return (
        <div className="p-4 bg-gray-700 text-white rounded shadow-md" style={{ maxWidth: '500px', maxHeight: '530px' }}>
            <h2 className="text-xl font-semibold mb-4">Expense Form</h2>
            <form onSubmit={handleSubmit(onSubmitData)}>
                <div className="mb-3">
                    <label className="block font-semibold mb-1 text-white">Title</label>
                    <input type="text" className="w-full border p-2 text-black rounded" {...register("title", { required: true })} />
                    {errors.title && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="mb-3">
                    <label className="block font-semibold mb-1 text-white">Amount</label>
                    <input type="number" className="w-full border p-2 text-black rounded" {...register("amount", { required: true })} />
                    {errors.amount && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="mb-3">
                    <label className="block font-semibold mb-1 text-white">Date</label>
                    <input type="date" className="w-full border p-2 text-black rounded" {...register("date", { required: true })} />
                    {errors.date && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="mb-3">
                    <label className="block font-semibold mb-1 text-white">Category</label>
                    <select className="w-full border p-2 text-black rounded" style={{ maxHeight: '50px' }} {...register('category', { required: true })}>
                        <option value="" disabled>Select Category</option>
                        <option value="rent">Rent</option>
                        <option value="food">Food</option>
                        <option value="travel">Travel</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="educational accessories">Educational Accessories</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.category && <span className="text-red-500">This field is required</span>}
                    {register("category")?.value === "other" && (
                        <input type="text" placeholder='Enter Custom Category' className="w-full border p-2 mt-2 text-black rounded" {...register("customCategory")} />
                    )}
                </div>
                <div className="mb-3">
                    <label className="block font-semibold mb-1 text-white">Description</label>
                    <textarea className="w-full border p-2 text-black rounded" style={{ maxHeight: '40px' }} {...register("description")} />
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ExpenseForm;