import axios from 'axios'
import { API_URL } from '../../support/API_URL'
import {
    REGISTER_INPUT_ALLCHANGE,
    REGISTER_INPUT_CHANGE,
    CITY_LIST_FETCH_SUCCESS,
    REGISTER_INPUT_INITIAL,
    REGISTER_USER_INPUT_INITIAL
} from './Types'

export const setRegisterInput = (prop, value) => {
    return {
        type: REGISTER_INPUT_CHANGE,
        payload: { prop, value }
    };
};

export const setRegisterInputAll = (data) => {
    return {
        type: REGISTER_INPUT_ALLCHANGE,
        payload: data
    };
};

export const setRegisterInitial = () => {
    return { type: REGISTER_INPUT_INITIAL }
};

export const setRegisterUserInitial = () => {
    return { type: REGISTER_USER_INPUT_INITIAL }
};

export const fetchCityList = () => {
    return async dispatch => {
        try {
            let res = await axios.get(`${API_URL}/ro/city`)
            dispatch({ type: CITY_LIST_FETCH_SUCCESS, payload: res.data })
        } catch (err) {
            console.log(err)
        }
    }
}