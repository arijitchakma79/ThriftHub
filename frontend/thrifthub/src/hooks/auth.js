// Import required dependencies and Firebase-related modules
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc, getDoc } from 'firebase/firestore';
//import isUserNameExist from '../utils/isUsernameExist';

// Custom hook to get the authenticated user's state
function useAuth() {
    // Fetch authenticated user's state, loading state, and error using react-firebase-hooks
    const [authUser, authLoading, error] = useAuthState(auth);

    // Local states for user data and loading
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            // Get user data from Firestore using the user's UID
            const ref = doc(db, "users", authUser.uid);
            const docSnap = await getDoc(ref);
            setUser(docSnap.data());

            setLoading(false);
        }
    
        if (!authLoading) {
            if (authUser) {
                fetchData(); // Fetch user data when authentication is not loading and user is authenticated
            } else {
                setLoading(false); // No user, loading finished
            }
        }
    }, [authLoading]);

    return { user, isLoading, error };
} 

// Custom hook to handle user login
function useLogin() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    // Function to log in the user with provided email and password
    async function login({ email, password, redirectTo = "/dashboard" }) {
        setLoading(true);

        try {
            // Authenticate user with provided credentials
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: "Login Successful",
                description: "You have been logged in",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            navigate(redirectTo); // Redirect user after successful login
        } catch (error) {
            toast({
                title: "Login Failed",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return false; // Return false if login failed
        }

        setLoading(false);
        return true; // Return true if login succeeded
    }

    return { login, isLoading };
}

// Custom hook to handle user logout
function useLogout() {
    const [signOut, isLoading, error] = useSignOut(auth);
    const navigate = useNavigate();
    const toast = useToast();

    // Function to log out the user
    async function logout() {
        if (await signOut()) {
            toast({
                title: "Logout Successful",
                description: "You have been logged out",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            navigate("/");
        } else {
            toast({
                title: "Logout Failed",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    }

    return { logout, isLoading };
}

// Custom hook to handle user registration
function useRegister() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    // Function to register a new user with provided details
    async function register({ username, email, password, redirectTo = "protected/dashboard" }) {
        setLoading(true);
        
        // Check if the provided username already exists.
        

        //Important: I commented this code because of some technical issues with my firestore. This code is correct and should work once I create a index for user from the isUserExisit file. 

        /*const userNameExist = await isUserNameExist(username);
       if (userNameExist) {
            toast({
                title: "Username already exists",
                description: "Please choose another username",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
        } else { */

            try {
                // Create a new user account in Firebase Authentication
                const res = await createUserWithEmailAndPassword(auth, email, password);

                // Store user data in Firestore
                await setDoc(doc(db, "users", res.user.uid), {
                    id: res.user.uid,
                    username: username.toLowerCase(),
                    avatar: "",
                    date: Date.now(),
                });

                toast({
                    title: "Account Created",
                    description: "Your account has been created",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });

                setLoading(false);
                navigate(redirectTo); // Redirect user after successful registration
            } catch (error) {
                toast({
                    title: "Account Creation Failed",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });

                setLoading(false);
            }
        //}
    }

    return { register, isLoading };
}

// Export the custom hooks
export {
    useAuth,
    useLogin,
    useLogout,
    useRegister
};
