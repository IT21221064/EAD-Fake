import { useAuthContext } from "./useAutContext";


export const useLogout = () => {
    const {dispatch} = useAuthContext()

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('userRole')

        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}

//add this to the nav