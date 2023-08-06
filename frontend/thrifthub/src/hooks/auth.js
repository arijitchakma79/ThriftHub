import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase'


function useAuth() {
    const [ authUser, isLoading, error] = useAuthState(auth);
    return { user : authUser, isLoading: isLoading, error};

}

export { useAuth }

