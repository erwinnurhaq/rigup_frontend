import axios from 'axios'
import { API_URL } from '../../support/API_URL'

const error = (err) => {
    let error = err.response ? err.response.data.error : 'Cannot connect to API'
    return {
        type: 'PRODUCT_ERROR',
        payload: error
    }
}

export const getProducts = () => {
    return async dispatch => {
        try {
            dispatch({ type: 'PRODUCT_LOADING' })
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

export const getUncategorizedProduct = () => {
    return async dispatch => {
        try {
            dispatch({ type: 'PRODUCT_LOADING' })
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

export const getProductByCategoryId = categoryId => {
    return async dispatch => {
        try {
            dispatch({ type: 'PRODUCT_LOADING' })
            const res = await axios.get(`${API_URL}/products/${categoryId}`)
            console.log(res.data)
            dispatch({
                type: 'PRODUCTLISTBYCATEGORY_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const getProductDetailById = productId => {
    return async dispatch => {
        try {
            dispatch({ type: 'PRODUCT_LOADING' })
            const res = await axios.get(`${API_URL}/products/detail/${productId}`)
            console.log(res.data)
            dispatch({
                type: 'PRODUCTDETAIL_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

//product -> OBJ, categories -> array of INT
export const addProduct = ({ newProduct, newCategories }) => {
    return async dispatch => {
        try {
            dispatch({ type: 'PRODUCT_LOADING' })
            const res = await axios.post(`${API_URL}/products`,
                { product: newProduct, categories: newCategories }
            )
            console.log(res.data)
            dispatch(getProductByCategoryId(newCategories[0]))
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const editProductById = ({ productId, newProduct, newCategories }) => {
    return async dispatch => {
        try {
            dispatch({ type: 'PRODUCT_LOADING' })
            const res = await axios.put(`${API_URL}/products/${productId}`,
                { product: newProduct, categories: newCategories }
            )
            console.log(res.data)
            dispatch(getProductByCategoryId(newCategories[0]))
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const deleteProductById = ({ productId, newCategories }) => {
    return async dispatch => {
        try {
            dispatch({ type: 'PRODUCT_LOADING' })
            const res = await axios.delete(`${API_URL}/products/${productId}`)
            console.log(res.data)
            dispatch(getProductByCategoryId(newCategories[0]))
        } catch (err) {
            dispatch(error(err))
        }
    }
}

