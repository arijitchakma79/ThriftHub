import { useForm } from 'react-hook-form';
import { useGlobalContext } from '../../context/GlobalStyle';

const IncomeForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {addIncome} = useGlobalContext();

    const onSubmitData = async (data) => {
        const incomeData = {
            title: data.title,
            amount: data.amount,
            date: data.date,
            category: data.category,
            description: data.description
        };
        try {
            await addIncome(incomeData)
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
                    <label className="block font-semibold mb-1">Title</label>
                    <input type="text" className="w-full border p-2 rounded" {...register("title", { required: true })} />
                    {errors.title && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="mb-3">
                    <label className="block font-semibold mb-1">Amount</label>
                    <input type="number" className="w-full border p-2 rounded" {...register("amount", { required: true })} />
                    {errors.amount && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="mb-3">
                    <label className="block font-semibold mb-1">Date</label>
                    <input type="date" className="w-full border p-2 rounded" {...register("date", { required: true })} />
                    {errors.date && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="mb-3">
                    <label className="block font-semibold mb-1">Category</label>
                    <select className="w-full border p-2 rounded" {...register('category', { required: true })}>
                        <option value="" disabled>Select Category</option>
                        <option value="salary">Salary</option>
                        <option value="investment">Investment</option>
                        <option value="stocks">Stocks</option>
                        <option value="gift">Gift</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.category && <span className="text-red-500">This field is required</span>}
                    {register("category")?.value === "other" && (
                        <input type="text" placeholder='Enter Custom Category' className="w-full border p-2 mt-2 rounded" {...register("customCategory")} />
                    )}
                </div>
                <div className="mb-3">
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea className="w-full border p-2 rounded" {...register("description")} />
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default IncomeForm;