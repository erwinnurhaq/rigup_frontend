import axios from 'axios'
import { API_URL } from '../../support/API_URL'

const error = (err) => {
    let error = err.response ? err.response.data.error : 'Cannot connect to API'
    return {
        type: 'BRAND_ERROR',
        payload: error
    }
}

export const getBrands = () => {
    return async dispatch => {
        try {
            dispatch({ type: 'BRAND_LOADING' })
            const res = await axios.get(`${API_URL}/brands`)
            console.log(res.data)
            dispatch({
                type: 'BRANDLIST_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const getBrandByCategoryId = categoryId => {
    return async dispatch => {
        try {
            dispatch({ type: 'BRAND_LOADING' })
            const res = await axios.get(`${API_URL}/brands/${categoryId}`)
            console.log(res.data)
            dispatch({
                type: 'BRANDBYCATEGORY_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const addBrand = ({ newBrand }) => {
    return async dispatch => {
        try {
            dispatch({ type: 'BRAND_LOADING' })
            const res = await axios.post(`${API_URL}/brands`,
                { brand: newBrand }
            )
            console.log(res.data)
            dispatch(getBrands())
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const editBrandById = ({ brandId, newBrand }) => {
    return async dispatch => {
        try {
            dispatch({ type: 'BRAND_LOADING' })
            const res = await axios.put(`${API_URL}/brands/${brandId}`,
                { brand: newBrand }
            )
            console.log(res.data)
            dispatch(getBrands())
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const deleteBrandById = ({ brandId }) => {
    return async dispatch => {
        try {
            dispatch({ type: 'BRAND_LOADING' })
            const res = await axios.delete(`${API_URL}/brands/${brandId}`)
            console.log(res.data)
            dispatch(getBrands())
        } catch (err) {
            dispatch(error(err))
        }
    }
}

