import axios from 'axios'
import { API_URL } from '../../support/API_URL'
import {getUserCart} from './UserCartAction'

const error = (err) => {
    let error = err.response && Object.keys(err.response).length >= 0 ? err.response.data.message : 'Cannot connect to API'
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
            dispatch({
                type: 'USER_LOGIN',
                payload: res.data.user
            })
            if (res.data.user.verified === 1) {
                localStorage.setItem('riguptoken', res.data.token)
                dispatch(getUserCart(res.data.user.id))
            }
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
                if (res.data.user.verified === 1) {
                    dispatch(getUserCart(res.data.user.id))
                }
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
            dispatch({ type: 'USER_LOADING' })
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
            dispatch({
                type: 'USER_LOGIN',
                payload: res.data.user
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const newUserVerification = usertoken => {
    return async dispatch => {
        try {
            dispatch({ type: 'USER_LOADING' })
            const res = await axios.post(`${API_URL}/users/verify`, {}, {
                headers: { Authorization: `Bearer ${usertoken}` }
            })
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

export const resendVerification = (id, email) => {
    return async dispatch => {
        try {
            dispatch({ type: 'USER_LOADING' })
            await axios.post(`${API_URL}/users/resendverify`, { id, email })
            dispatch({ type: 'RESEND_VERIFICATION_SUCCESS' })
        } catch (err) {
            dispatch(error(err))
        }
    }
}