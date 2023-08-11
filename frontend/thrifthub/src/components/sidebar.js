import { useState } from "react";
import LogOut from "../components/logout";
import { useNavigate } from 'react-router-dom';

const SideBar = ({username, logout}) => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('dashboard');

    const handleNavigate = (path, section) => {
        navigate(path);
        setActiveSection(section);
    }
    return (
        <div className="bg-gray-800 text-white w-80 min-h-screen p-4">
            <div className="text-center mb-4">
                <h2  className="text-xl font bold">Welcome {username}</h2>
            </div>
            <ul>
                <li className="hover:bg-gray-700 px-2 py-1 rounded cursor-pointer" onClick={() => handleNavigate('dashboard')}>Dashoard</li>
                <li className="hover:bg-gray-700 px-2 py-1 rounded cursor-pointer" onClick={() => handleNavigate('view-transactions')}>View Transactions</li>
                <li className="hover:bg-gray-700 px-2 py-1 rounded cursor-pointer" onClick={() => handleNavigate('income')}>Incomes</li>
                <li className="hover:bg-gray-700 px-2 py-1 rounded cursor-pointer" onClick={() => handleNavigate('expenses')}>Expenses</li>
            </ul>
            <footer>
                <LogOut/>
            </footer>
        </div>
    )
} 

export default SideBar;