import axios from 'axios'
import { API_URL } from '../../support/API_URL'

const loading = () => {
    return { type: 'CATEGORY_LOADING' }
}

const error = (err) => {
    let error = err.response ? err.response.data.error : 'Cannot connect to API'
    return {
        type: 'CATEGORY_ERROR',
        payload: error
    }
}

export const getAllCategories = () => {
    return async dispatch => {
        try {
            dispatch(loading())
            const res = await axios.get(`${API_URL}/categories`)
            console.log(res.data)
            dispatch({
                type: 'CATEGORY_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const getMostParent = () => {
    return async dispatch => {
        try {
            dispatch(loading())
            const res = await axios.get(`${API_URL}/categories/mostparent`)
            console.log(res.data)
            dispatch({
                type: 'MOSTPARENT_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const getMostChild = () => {
    return async dispatch => {
        try {
            dispatch(loading())
            const res = await axios.get(`${API_URL}/categories/mostchild`)
            console.log(res.data)
            dispatch({
                type: 'MOSTCHILD_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const addCategory = (body) => {
    return async dispatch => {
        try {
            dispatch(loading())
            const res = await axios.post(`${API_URL}/categories`, body)
            console.log(res.data)
            dispatch(getAllCategories())
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const editCategory = (id, body) => {
    return async dispatch => {
        try {
            dispatch(loading())
            const res = await axios.put(`${API_URL}/categories/${id}`, body)
            console.log(res.data)
            dispatch(getAllCategories())
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const deleteCategory = (id) => {
    return async dispatch => {
        try {
            dispatch(loading())
            const res = await axios.delete(`${API_URL}/categories/${id}`)
            console.log(res.data)
            dispatch(getAllCategories())
        } catch (err) {
            dispatch(error(err))
        }
    }
}