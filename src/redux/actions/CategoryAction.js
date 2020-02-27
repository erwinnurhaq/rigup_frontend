import axios from 'axios'
import { API_URL } from '../../support/API_URL'

const error = (err) => {
    let error = err.response ? err.response.data.error : 'Cannot connect to API'
    return {
        type: 'CATEGORY_ERROR',
        payload: error
    }
}

export const selectCat = categoryId => {
    return {
        type: 'SELECT_CAT',
        payload: categoryId
    }
}

export const getCategories = () => {
    return async dispatch => {
        try {
            dispatch({ type: 'CATEGORY_LOADING' })
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
            dispatch({ type: 'CATEGORY_LOADING' })
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
            dispatch({ type: 'CATEGORY_LOADING' })
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

export const getChild = parentId => {
    return async dispatch => {
        try {
            dispatch({ type: 'CATEGORY_LOADING' })
            const res = await axios.get(`${API_URL}/categories/child/${parentId}`)
            console.log(res.data)
            dispatch({
                type: 'CHILD_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const addCategory = ({ newCategory, newParentId }) => {
    return async dispatch => {
        try {
            dispatch({ type: 'CATEGORY_LOADING' })
            const res = await axios.post(`${API_URL}/categories`,
                { category: newCategory, parentId: newParentId }
            )
            console.log(res.data)
            dispatch(getCategories())
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const editCategory = ({ categoryId, newCategory, newParentId }) => {
    return async dispatch => {
        try {
            dispatch({ type: 'CATEGORY_LOADING' })
            const res = await axios.put(`${API_URL}/categories/${categoryId}`,
                { category: newCategory, parentId: newParentId }
            )
            console.log(res.data)
            dispatch(getCategories())
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const deleteCategory = categoryId => {
    return async dispatch => {
        try {
            dispatch({ type: 'CATEGORY_LOADING' })
            const res = await axios.delete(`${API_URL}/categories/${categoryId}`)
            console.log(res.data)
            dispatch(getCategories())
        } catch (err) {
            dispatch(error(err))
        }
    }
}