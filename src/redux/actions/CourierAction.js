import axios from 'axios'
import { API_URL } from '../../support/API_URL'

export const fetchCourier = (destination, weight) => {
    return async dispatch =>  {
        try{
            const token = localStorage.getItem('riguptoken')
            const res = await axios.post(`${API_URL}/ro/cost`, {
                origin: 152, destination, weight, courier: 'jne'
            },{
                headers: {Authorization: `Bearer ${token}`}
            })
            dispatch({
                type: 'COURIER_FETCHED',
                payload: res.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const selectCourier = (id) => {
    console.log(id)
    return {type: 'SELECT_COURIER', payload: id}
}

export const emptyCourier = () => {
    return {type: 'COURIER_EMPTY'}
}