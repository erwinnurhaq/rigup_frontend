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
                console.log(err)
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