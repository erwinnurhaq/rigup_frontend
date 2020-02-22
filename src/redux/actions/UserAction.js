import axios from 'axios'
import { API_URL } from '../../support/API_URL'

export const userLogin = data => {
    return dispatch => {
        axios.post(`${API_URL}/users/login`, data)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('token', res.data.token)
                dispatch({
                    type: 'USER_LOGIN',
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'USER_ERROR',
                    payload: err
                })
            })
    }
}

export const userLogout = () => {
    localStorage.removeItem('token')
    return {
        type: 'USER_LOGOUT'
    }
}

export const userKeepLogin = () => {
    return async dispatch => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const res = await axios.post(`${API_URL}/users/keeplogin`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                res.data.token = token
                console.log(res.data)
                dispatch({
                    type: 'USER_LOGIN',
                    payload: res.data
                })
            } catch (err) {
                dispatch({
                    type: 'USER_ERROR',
                    payload: err
                })
            }
        }
    }
}

export const register = (user) => {
    return async dispatch => {
        try {
            const res = await axios.post(`${API_URL}/users`, user)
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            dispatch({
                type: 'USER_LOGIN',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'USER_ERROR',
                payload: err
            })
        }
    }
}