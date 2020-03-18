import axios from 'axios'
import { API_URL } from '../../support/API_URL'
import {
    USER_TRANSACTION_LIST,
    USER_TRANSACTION_LISTALLCOUNT,
    USER_TRANSACTION_DETAIL,
    USER_TRANSACTION_HISTORY,
    USER_TRANSACTION_ERROR,
    USER_TRANSACTION_LOADING,
    USER_TRANSACTION_SELECTED,
    USER_TRANSACTION_RECEIPT,
    USER_TRANSACTION_RECEIPT_ERROR,
    USER_TRANSACTION_EDIT_SUCCESS
} from './Types'

const error = (err) => {
    let error = err.response && Object.keys(err.response).length >= 0 ? err.response.data.message : 'Cannot connect to API'
    return {
        type: USER_TRANSACTION_ERROR,
        payload: error
    }
}

export const selectTransaction = (id) => {
    return {
        type: USER_TRANSACTION_SELECTED,
        payload: id
    }
}

export const setImageReceipt = (data) => {
    return {
        type: USER_TRANSACTION_RECEIPT,
        payload: data
    }
}

export const setImageReceiptError = (message) => {
    return {
        type: USER_TRANSACTION_RECEIPT_ERROR,
        payload: message
    }
}

export const getUserTransactionList = () => {
    return async dispatch => {
        try {
            dispatch({ type: USER_TRANSACTION_LOADING })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.get(`${API_URL}/transactions/user`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch({
                type: USER_TRANSACTION_LIST,
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const getUserHistoryList = () => {
    return async dispatch => {
        try {
            dispatch({ type: USER_TRANSACTION_LOADING })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.get(`${API_URL}/transactions/user/history`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch({
                type: USER_TRANSACTION_HISTORY,
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const getUserTransactionDetailList = (transactionId) => {
    return async dispatch => {
        try {
            dispatch({ type: USER_TRANSACTION_LOADING })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.get(`${API_URL}/transactions/detail`, {
                params: { transactionId },
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch({
                type: USER_TRANSACTION_DETAIL,
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const checkOut = (data) => {
    return async dispatch => {
        try {
            dispatch({ type: USER_TRANSACTION_LOADING })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.post(`${API_URL}/transactions/user`, data, {
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch({
                type: USER_TRANSACTION_LIST,
                payload: res.data
            })
            dispatch(selectTransaction(res.data[0].id))
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const uploadReceipt = (transactionCode, formData) => {
    return async dispatch => {
        try {
            console.log(formData)
            dispatch({ type: USER_TRANSACTION_LOADING })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.put(`${API_URL}/transactions/receipt`, formData, {
                params: { transactionCode },
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(res.data)
            dispatch({
                type: USER_TRANSACTION_LIST,
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

//-----------------ADMIN
export const getAllTransactionList = (sort, limit, offset, search) => {
    return async dispatch => {
        try {
            if (search === '') {
                search = null
            }
            dispatch({ type: USER_TRANSACTION_LOADING })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.get(`${API_URL}/transactions`, {
                params: { sort, limit, offset, search },
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch({
                type: USER_TRANSACTION_LISTALLCOUNT,
                payload: res.data.allCount
            })
            dispatch({
                type: USER_TRANSACTION_LIST,
                payload: res.data.transactionList
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const getAllHistoryList = (sort, limit, offset, search) => {
    return async dispatch => {
        try {
            if (search === '') {
                search = null
            }
            dispatch({ type: USER_TRANSACTION_LOADING })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.get(`${API_URL}/transactions/history`, {
                params: { sort, limit, offset, search },
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch({
                type: USER_TRANSACTION_LISTALLCOUNT,
                payload: res.data.allCount
            })
            dispatch({
                type: USER_TRANSACTION_LIST,
                payload: res.data.transactionList
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const editTransaction = (id, email, paidStatus, deliveredStatus) => {
    return async dispatch => {
        try {
            dispatch({ type: USER_TRANSACTION_LOADING })
            const token = localStorage.getItem('riguptoken')
            await axios.put(`${API_URL}/transactions`,
                { email, paidStatus, deliveredStatus },
                { params: { id }, headers: { Authorization: `Bearer ${token}` } }
            )
            dispatch({ type: USER_TRANSACTION_EDIT_SUCCESS })
        } catch (err) {
            dispatch(error(err))
        }
    }
}