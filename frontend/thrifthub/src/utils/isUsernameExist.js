// Import necessary functions from Firebase Firestore module and the Firebase db instance
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"

// This function checks if a username already exists in the "users" collection in Firestore.
async function isUserNameExist(username) {
  // Create a Firestore query that looks for documents in the "users" collection
  // where the "username" field is equal to the provided `username`.
  const q = query(collection(db, "users"), where("username", "===", username));

  // Make an asynchronous call to the Firebase backend to execute the Firestore query.
  // `getDocs(q)` retrieves the documents that match the query from the Firestore database.
  const querySnapshot = await getDocs(q);

  // Check the `querySnapshot` to see if there are any documents returned from the query.
  // If the `querySnapshot.size` is greater than 0, it means that a user with the given `username` already exists,
  // and the function returns `true`. Otherwise, it returns `false`.
  return querySnapshot.size > 0;
}

// Export the `isUserNameExist` function to be used in other parts of the application.
export default isUserNameExist;
