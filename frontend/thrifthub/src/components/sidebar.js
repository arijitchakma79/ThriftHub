import React, { useState } from 'react';
import LogOut from "../components/logout";
import { useNavigate } from 'react-router-dom';

const SideBar = ({ username, logout }) => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('dashboard'); // Initial active section

    const handleNavigate = (path, section) => {
        navigate(path);
        setActiveSection(section);
    }

    return (
        <div className="bg-gradient-to-b from-gray-800 via-gray-850 to-gray-900 text-white w-80 min-h-screen p-4 flex flex-col">
            <div className="text-center mb-4">
                <h2 className="text-xl font-bold">Welcome {username}</h2>
            </div>
            <ul className="space-y-2 flex-grow">
                <li
                    className={`hover:bg-gray-700 px-2 py-1 rounded cursor-pointer ${
                        activeSection === 'dashboard' ? 'bg-blue-500' : ''
                    }`}
                    onClick={() => handleNavigate('dashboard', 'dashboard')}
                >
                    Dashboard
                </li>
                <li
                    className={`hover:bg-gray-700 px-2 py-1 rounded cursor-pointer ${
                        activeSection === 'view-transactions' ? 'bg-blue-500' : ''
                    }`}
                    onClick={() => handleNavigate('view-transactions', 'view-transactions')}
                >
                    View Transactions
                </li>
                <li
                    className={`hover:bg-gray-700 px-2 py-1 rounded cursor-pointer ${
                        activeSection === 'income' ? 'bg-blue-500' : ''
                    }`}
                    onClick={() => handleNavigate('income', 'income')}
                >
                    Incomes
                </li>
                <li
                    className={`hover:bg-gray-700 px-2 py-1 rounded cursor-pointer ${
                        activeSection === 'expenses' ? 'bg-blue-500' : ''
                    }`}
                    onClick={() => handleNavigate('expenses', 'expenses')}
                >
                    Expenses
                </li>
            </ul>
            <div className="h-px bg-blue-500 my-4"></div>
            <footer className="mt-auto">
                <LogOut />
            </footer>
        </div>
    )
}

export default SideBar;
