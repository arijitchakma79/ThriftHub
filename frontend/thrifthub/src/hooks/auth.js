import { useAuthState, useSignOut } from 'react-firebase-hooks/auth'
import { auth,db } from '../firebase/firebase'
import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {setDoc, doc } from 'firebase/firestore';
import  isUserNameExist  from '../utils/isUsernameExist';


function useAuth() {
    const [ authUser, isLoading, error] = useAuthState(auth);
    return { user : authUser, isLoading: isLoading, error};

}

function useLogin(){
    const [isLoading,setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate()

    async function login({email, password, redirectTo="/dashboard"}) {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast({
                title: "Login Successful",
                description: "You have been logged in",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            navigate(redirectTo)
        } catch (error) {
            toast({
                title: "Login Failed",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            return false // return false if login failed

        }
        setLoading(false);
        return true // return true if login succeeded
    } 

    return {login, isLoading}
}

function useLogout (){
    const [signOut, isLoading, error ] = useSignOut(auth)
    const navigate = useNavigate();
    const toast = useToast();

    async function logout(){
        if (await signOut()){
            toast({
                title: "Logout Successful",
                description: "You have been logged out",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            navigate("/")
        }else {
            toast({
                title: "Logout Failed",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            })
        }

    }
    return {logout, isLoading};
}

function useRegister() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    async function register( {username, email, password, redirectTo="/dashboard"}){
        setLoading(true)
        const userNameExist = await isUserNameExist(username)
        if (userNameExist){
            toast(
                {
                    title: "Username already exists",
                    description: "Please choose another username",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                })
            setLoading(false)
        }else {
            try{
                const res = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", res.user.uid),{
                    id: res.user.uid,
                    username: username,
                    email: email,
                    date:Date.now(),
                    avatar: "",
                });

                toast({
                    title: "Account Created",
                    description: "Your account has been created",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                })
                setLoading(false)
                navigate("/dashboard")
            }catch (error){
                toast({
                    title: "Account Creation Failed",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                })
                setLoading(false)
            }
        }
    }

    return {register, isLoading}
}

export { 
    useAuth,
    useLogin, useLogout}