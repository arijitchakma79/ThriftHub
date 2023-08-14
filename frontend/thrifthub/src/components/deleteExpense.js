import React from "react";
import { deleteExpense } from "../services/expense";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useExpense } from "../context/expenseContext";

const DeleteButton = ({id}) => {

    const {dispatch} = useExpense()
    const handleDelete = async () => {
        try {
        await deleteExpense(id);
        dispatch({type:"DELETE_EXPENSE", payload:id})
        } catch (error) {
        console.log('Error deleting income', error);
        }
    };

    return (
        <div className="flex items-center cursor-pointer" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrashAlt} className="text-red-500" />
        </div>
    );
};

export default DeleteButton;
