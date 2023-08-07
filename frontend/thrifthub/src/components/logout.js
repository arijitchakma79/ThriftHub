import { useLogout } from "../hooks/auth"

const LogOut = () => {
    const {logout} = useLogout();
    return (
        <div>
            <button onClick={logout}>Log Out</button>
        </div>
    )

}

export default LogOut;