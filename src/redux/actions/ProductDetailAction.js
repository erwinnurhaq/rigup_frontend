import axios from 'axios'
import { API_URL } from '../../support/API_URL'

export const getProductDetailById = productId => {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/products/detail/${productId}`)
            console.log('product detail: ', res.data)
            dispatch({
                type: 'PRODUCTDETAIL_FETCH_SUCCESS',
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}