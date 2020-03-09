import axios from 'axios'
import { API_URL } from '../../support/API_URL'

export const setRegisterInput = (prop, value) => {
    return {
        type: 'REGISTER_INPUT_CHANGE',
        payload: { prop, value }
    };
};

export const setRegisterInitial = () => {
    return { type: 'REGISTER_INPUT_INITIAL' }
};

export const fetchCityList = () => {
    return async dispatch => {
        try {
            let res = await axios.get(`${API_URL}/ro/city`)
            dispatch({ type: 'CITY_LIST_FETCH_SUCCESS', payload: res.data })
        } catch (err) {
            console.log(err)
        }
    }
}