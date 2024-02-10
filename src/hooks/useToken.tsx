import {useState} from 'react'

const useToken = () => {
    const getToken = () => {
        const tokenString: string | null = localStorage.getItem('token');
        if (typeof tokenString === 'string') {
            return JSON.parse(tokenString);
        }
        
    };

    const [token, setToken] = useState(getToken());
    
    const saveToken = (userToken: string | null) => {
        if (typeof userToken === 'string') {
            localStorage.setItem('token', JSON.stringify(userToken));
            setToken(userToken)
        }
    }

    return {
        setToken: saveToken,
        token
    }
}

export default useToken;