import axios from 'axios'
import { API_URL } from '../../support/API_URL'
import { getUserCart } from './UserCartAction'
import { getUserWishlist } from './UserWishlistAction'
import {
    USER_LOADING,
    USER_ERROR,
    USER_LOGIN,
    USER_LOGOUT,
    RESEND_VERIFICATION_SUCCESS,
    SEND_EMAIL_RESETPASS_SUCCESS,
    RESETPASS_SUCCESS,
    USER_WISHLIST_INITIAL,
    USER_CART_INITIAL,
    USER_TRANSACTION_INITIAL
} from './Types'

const error = (err) => {
    let error = err.response && Object.keys(err.response.data).length > 0 ? err.response.data.message : ''
    return {
        type: USER_ERROR,
        payload: error
    }
}

export const userLoginByGoogle = (token) => {
    return async dispatch => {
        try {
            console.log('tokenId: ', token)
            dispatch({ type: USER_LOADING })
            const res = await axios.post(`${API_URL}/users/loginbygoogle`, {},
                { headers: { Authorization: `Bearer ${token}` } }
            )
            console.log('user login: ', res.data)
            if (res.data.user.verified === 1) {
                localStorage.setItem('riguptoken', res.data.token)
                localStorage.removeItem('rigupprevpath')
                dispatch(getUserCart())
                dispatch(getUserWishlist())
            }
            dispatch({
                type: USER_LOGIN,
                payload: res.data.user
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const userLogin = ({ userOrEmail, password, keepLogin }) => {
    return async dispatch => {
        try {
            dispatch({ type: USER_LOADING })
            const res = await axios.post(`${API_URL}/users/login`,
                { userOrEmail, password, keepLogin }
            )
            console.log('user login: ', res.data)
            if (res.data.user.verified === 1) {
                localStorage.setItem('riguptoken', res.data.token)
                localStorage.removeItem('rigupprevpath')
                dispatch(getUserCart())
                dispatch(getUserWishlist())
            }
            dispatch({
                type: USER_LOGIN,
                payload: res.data.user
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const userLogout = () => {
    localStorage.removeItem('riguptoken')
    return dispatch => {
        dispatch({ type: USER_LOGOUT })
        dispatch({ type: USER_CART_INITIAL })
        dispatch({ type: USER_WISHLIST_INITIAL })
        dispatch({ type: USER_TRANSACTION_INITIAL })
    }
}

export const userKeepLogin = () => {
    return async dispatch => {
        const token = localStorage.getItem('riguptoken')
        if (token) {
            try {
                dispatch({ type: USER_LOADING })
                const res = await axios.post(`${API_URL}/users/keeplogin`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                console.log('user login: ', res.data)
                if (res.data.user.verified === 1) {
                    dispatch(getUserCart())
                    dispatch(getUserWishlist())
                }
                dispatch({
                    type: USER_LOGIN,
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
            dispatch({ type: USER_LOADING })
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
                type: USER_LOGIN,
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
            dispatch({ type: USER_LOADING })
            const res = await axios.post(`${API_URL}/users/verify`, {}, {
                headers: { Authorization: `Bearer ${usertoken}` }
            })
            console.log('user login: ', res.data)
            if (res.data.user.verified === 1) {
                localStorage.setItem('riguptoken', res.data.token)
                localStorage.removeItem('rigupprevpath')
                dispatch(getUserCart())
                dispatch(getUserWishlist())
            }
            dispatch({
                type: USER_LOGIN,
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
            dispatch({ type: USER_LOADING })
            await axios.post(`${API_URL}/users/resendverify`, { id, email })
            dispatch({ type: RESEND_VERIFICATION_SUCCESS })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const sendEmailResetPassword = (email) => {
    return async dispatch => {
        try {
            dispatch({ type: USER_LOADING })
            await axios.post(`${API_URL}/users/sendresetpassword`, { email })
            dispatch({ type: SEND_EMAIL_RESETPASS_SUCCESS })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const resetPassword = (newPassword, token) => {
    return async dispatch => {
        try {
            dispatch({ type: USER_LOADING })
            console.log(token)
            await axios.post(`${API_URL}/users/resetpassword`, { password: newPassword }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch({ type: RESETPASS_SUCCESS })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const editProfile = (data) => {
    return async dispatch => {
        try {
            dispatch({ type: USER_LOADING })
            let token = localStorage.getItem('riguptoken')
            const res = await axios.put(`${API_URL}/users`, data, {
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch({
                type: USER_LOGIN,
                payload: res.data.user
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const editPassword = (currentPassword, newPassword) => {
    return async dispatch => {
        try {
            dispatch({ type: USER_LOADING })
            let token = localStorage.getItem('riguptoken')
            const res = await axios.put(`${API_URL}/users/changepass`,
                { currentPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            dispatch({
                type: USER_LOGIN,
                payload: res.data.user
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}
