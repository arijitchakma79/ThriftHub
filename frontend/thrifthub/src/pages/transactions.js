import AllTransaction from "../components/all_transactions/allTransactions";
const Transactions = () => {
    return (
        <div className="bg-gray-900 text-white h-screen  overflow-y-auto flex flex-col">
            <h2 className="text-xl font-semibold text-white mb-4 px-8 py-4">All Transactions</h2>
            <AllTransaction />
           
        </div>
    )
}


export default Transactions;