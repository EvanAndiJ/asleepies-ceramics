import { useState } from 'react'
import useToken from './useToken'
import type { User } from '../types'

const useUser = () => {

    const getUser = () => {
        const userString: string | null = localStorage.getItem('asleepiesUser')
        if (typeof userString === 'string') {
            return JSON.parse(userString)       
        } else {
            return null
        }
    }

    const [userInfo, setUserInfo] = useState(getUser())
    const {setToken} = useToken()
    
    const saveUser = (userInfo: User) => {
        localStorage.setItem('asleepiesUser', JSON.stringify(userInfo))
        setUserInfo(userInfo)
    }

    const signOut = () => {
        localStorage.removeItem('asleepiesUser')
        setUserInfo(null)
        localStorage.removeItem('token')
        setToken(null)
    }

    return {
        userInfo,
        setUserInfo: saveUser,
        signOutUser: signOut
    }
}

export default useUser;