import React from "react";
import { deleteData } from "../services/income";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useIncome } from "../context/incomeContext";

const DeleteButton = ({id}) => {

    const {dispatch} = useIncome()
  const handleDelete = async () => {
    try {
      await deleteData(id);
      dispatch({type:"DELETE_INCOME", payload:id})
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
