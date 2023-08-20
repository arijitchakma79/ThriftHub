import IncomeExpenseChart from '../../src/components/charts/incomeExpenseChart'
const DashBoard = () => {
    return (
        <div className='bg-white text-white h-screen flex' >
            <div>
            <h1>Dashboard</h1>
            <IncomeExpenseChart/>
            </div>
        </div>
    )
}

export default DashBoard