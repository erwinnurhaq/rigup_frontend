import axios from 'axios'
import { API_URL } from '../../support/API_URL'

const error = (err) => {
    let error = err.response ? err.response.data.message : 'Cannot connect to API'
    return {
        type: 'USER_ERROR',
        payload: error
    }
}

export const userLogin = ({ userOrEmail, password, keepLogin }) => {
    return async dispatch => {
        try {
            const res = await axios.post(`${API_URL}/users/login`,
                { userOrEmail, password, keepLogin }
            )
            console.log('user login: ', res.data)
            localStorage.setItem('riguptoken', res.data.token)
            dispatch({
                type: 'USER_LOGIN',
                payload: res.data.user
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const userLogout = () => {
    localStorage.removeItem('riguptoken')
    return {
        type: 'USER_LOGOUT'
    }
}

export const userKeepLogin = () => {
    return async dispatch => {
        const token = localStorage.getItem('riguptoken')
        if (token) {
            try {
                const res = await axios.post(`${API_URL}/users/keeplogin`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                console.log('user login: ', res.data)
                dispatch({
                    type: 'USER_LOGIN',
                    payload: res.data.user
                })
            } catch (err) {
                dispatch(userLogout())
                dispatch(error(err))
            }
        }
    }
}

export const register = user => {
    return async dispatch => {
        try {
            const res = await axios.post(`${API_URL}/users`,
                {
                    fullname: user.fullname,
                    genderId: user.genderId,
                    address: user.address,
                    cityId: user.cityId,
                    phone: user.phone,
                    email: user.email,
                    username: user.username,
                    password: user.password
                }
            )
            console.log(res.data)
            localStorage.setItem('riguptoken', res.data.token)
            dispatch({
                type: 'USER_LOGIN',
                payload: res.data.user
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}