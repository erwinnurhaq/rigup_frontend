import axios from 'axios'
import { API_URL } from '../../support/API_URL'

const error = (err) => {
    let error = err.response ? err.response.data.error : 'Cannot connect to API'
    return {
        type: 'USERLIST_ERROR',
        payload: error
    }
}

export const getUserList = (limit, offset) => {
    return async dispatch => {
        try {
            dispatch({ type: 'USERLIST_LOADING' })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.get(`${API_URL}/users`, {
                params: { limit, offset },
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log('List all users: ', res.data)
            dispatch({
                type: 'USERLIST_FETCHED',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const getUserCount = () => {
    return async dispatch => {
        try {
            dispatch({ type: 'USERLIST_LOADING' })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.get(`${API_URL}/users/count`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log('count users: ', res.data.count)
            dispatch({
                type: 'USERCOUNT_FETCHED',
                payload: res.data.count
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const deleteUser = userId => {
    return async dispatch => {
        try {
            dispatch({ type: 'USERLIST_LOADING' })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.delete(`${API_URL}/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log('delete user: ', res.data)
            dispatch(getUserCount())
            dispatch(getUserList())
        } catch (err) {
            dispatch(error(err))
        }
    }
}