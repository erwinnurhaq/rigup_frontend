import axios from 'axios'
import { API_URL } from '../../support/API_URL'

const loading = () => {
    return { type: 'PRODUCT_LOADING' }
}

const error = (err) => {
    let error = err.response ? err.response.data.error : 'Cannot connect to API'
    return {
        type: 'PRODUCT_ERROR',
        payload: error
    }
}

export const getAllProducts = () => {
    return async dispatch => {
        try {
            dispatch(loading())
            const res = await axios.get(`${API_URL}/products`)
            console.log(res.data)
            dispatch({
                type: 'PRODUCTLIST_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const getProducts = (prop, value) => {
    return async dispatch => {
        try {
            dispatch(loading())
            const res = await axios.post(`${API_URL}/products/get?${prop}=${value}`)
            console.log(res.data)
            if (prop === 'id') {
                dispatch({
                    type: 'SELECTEDPRODUCT_FETCH_SUCCESS',
                    payload: res.data
                })
            } else {
                dispatch({
                    type: 'PRODUCTLIST_FETCH_SUCCESS',
                    payload: res.data
                })
            }
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const getUncategorizedProducts = () => {
    return async dispatch => {
        try {
            dispatch(loading())
            const res = await axios.get(`${API_URL}/products/uncategorized`)
            console.log(res.data)
            dispatch({
                type: 'UNCATEGORIZEDPRODUCTLIST_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const getProductCat = () => {
    return async dispatch => {
        try {
            dispatch(loading())
            const res = await axios.get(`${API_URL}/products/productcat`)
            console.log(res.data)
            dispatch({
                type: 'PRODUCTCAT_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const assignProductCat = (body) => {
    return async dispatch => {
        try {
            dispatch(loading())
            const res = await axios.post(`${API_URL}/products/assign`, body)
            console.log(res.data)
            dispatch(getProductCat())
            dispatch(getUncategorizedProducts())
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const deleteAssignedProductCat = (id) => {
    return async dispatch => {
        try {
            dispatch(loading())
            const res = await axios.delete(`${API_URL}/products/assign/${id}`)
            console.log(res.data)
            dispatch(getProductCat())
            dispatch(getUncategorizedProducts())
        } catch (err) {
            dispatch(error(err))
        }
    }
}
