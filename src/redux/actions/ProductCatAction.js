import axios from 'axios'
import { API_URL } from '../../support/API_URL'
import { getUncategorizedProduct } from '../actions'

const error = (err) => {
    let error = err.response ? err.response.data.error : 'Cannot connect to API'
    return {
        type: 'PRODUCTCAT_ERROR',
        payload: error
    }
}

export const getProductCat = () => {
    return async dispatch => {
        try {
            dispatch({ type: 'PRODUCTCAT_LOADING' })
            const res = await axios.get(`${API_URL}/productcats`)
            console.log('productCat: ', res.data)
            dispatch({
                type: 'PRODUCTCAT_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const assignProductCat = ({ productId, categoryId }) => {
    return async dispatch => {
        try {
            dispatch({ type: 'PRODUCTCAT_LOADING' })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.post(`${API_URL}/productcats`,
                { productId, categoryId },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            console.log('assignProductCat: ', res.data)
            dispatch(getProductCat())
            dispatch(getUncategorizedProduct())
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const deleteAssignedProductCat = productId => {
    return async dispatch => {
        try {
            dispatch({ type: 'PRODUCTCAT_LOADING' })
            const token = localStorage.getItem('riguptoken')
            const res = await axios.delete(`${API_URL}/productcats/${productId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            console.log('delete assigned productCat: ', res.data)
            dispatch(getProductCat())
            dispatch(getUncategorizedProduct())
        } catch (err) {
            dispatch(error(err))
        }
    }
}
