import axios from 'axios'
import { API_URL } from '../../support/API_URL'
import { getBrandCat } from './BrandCatAction'

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
            console.log('all brands: ', res.data)
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
            console.log('brand by categoryId: ', res.data)
            dispatch({
                type: 'BRANDBYCATEGORY_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const addBrand = ({ brand, categoryId }) => {
    return async dispatch => {
        try {
            dispatch({ type: 'BRAND_LOADING' })
            let token = localStorage.getItem('riguptoken')
            const res = await axios.post(`${API_URL}/brands`,
                { brand, categoryId },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            console.log('add brand: ', res.data)
            dispatch(getBrands())
            dispatch(getBrandCat())
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const editBrandById = ({ brandId, brand, categoryId }) => {
    return async dispatch => {
        try {
            dispatch({ type: 'BRAND_LOADING' })
            let token = localStorage.getItem('riguptoken')
            const res = await axios.put(`${API_URL}/brands/${brandId}`,
                { brandId, brand, categoryId },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            console.log('edit brand: ', res.data)
            dispatch(getBrands())
            dispatch(getBrandCat())
        } catch (err) {
            dispatch(error(err))
        }
    }
}

export const deleteBrandById = brandId => {
    return async dispatch => {
        try {
            dispatch({ type: 'BRAND_LOADING' })
            let token = localStorage.getItem('riguptoken')
            const res = await axios.delete(`${API_URL}/brands/${brandId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            console.log('delete brand: ', res.data)
            dispatch(getBrands())
            dispatch(getBrandCat())
        } catch (err) {
            dispatch(error(err))
        }
    }
}

