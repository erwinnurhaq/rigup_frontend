import axios from 'axios';
import { API_URL } from '../../support/API_URL';
import {
	PRODUCT_LOADING,
	PRODUCT_ERROR,
	PRODUCTLIST_FETCH_SUCCESS,
	PRODUCTLISTCOUNT_FETCH_SUCCESS,
	UNCATEGORIZEDPRODUCTLIST_FETCH_SUCCESS,
	PRODUCTLISTBYCATEGORY_FETCH_SUCCESS,
	PRODUCTLISTBYCATEGORYCOUNT_FETCH_SUCCESS,
	INITIALFORMPRODUCT,
	INITIALPRODUCTDETAIL,
	PRODUCT_INITIAL
} from './Types'

const error = (err) => {
	let error = err.response && Object.keys(err.response).length >= 0 ? err.response.data.message : 'Cannot connect to API'
	return {
		type: PRODUCT_ERROR,
		payload: error
	};
};

export const productInitial = () => {
	return { type: PRODUCT_INITIAL }
}

export const getProductList = (search, sort, limit, offset, filter) => {
	return async (dispatch) => {
		try {
			dispatch({ type: PRODUCT_LOADING });
			const res = await axios.get(`${API_URL}/products`, {
				params: { search, sort, limit, offset, filter }
			});
			console.log('all products: ', res.data);
			dispatch({
				type: PRODUCTLIST_FETCH_SUCCESS,
				payload: res.data
			})
		} catch (err) {
			dispatch(error(err));
		}
	};
};

export const getCountProductList = (search, filter) => {
	return async (dispatch) => {
		try {
			dispatch({ type: PRODUCT_LOADING });
			const res = await axios.get(`${API_URL}/products`, {
				params: { search, filter }
			});
			dispatch({
				type: PRODUCTLISTCOUNT_FETCH_SUCCESS,
				payload: res.data.length
			})
		} catch (err) {
			dispatch(error(err));
		}
	};
};

export const getUncategorizedProduct = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: PRODUCT_LOADING });
			const res = await axios.get(`${API_URL}/products/uncategorized`);
			console.log('uncategorized products: ', res.data);
			dispatch({
				type: UNCATEGORIZEDPRODUCTLIST_FETCH_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			dispatch(error(err));
		}
	};
};

export const getProductByCategoryId = (categoryId, sort, limit, offset) => {
	return async (dispatch) => {
		try {
			dispatch({ type: PRODUCT_LOADING });
			const res = await axios.get(`${API_URL}/products/${categoryId}`, {
				params: { sort, limit, offset }
			});
			console.log('product by category id: ', res.data);
			dispatch({
				type: PRODUCTLISTBYCATEGORY_FETCH_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			dispatch(error(err));
		}
	};
};

export const getCountProductByCategoryId = (categoryId) => {
	return async (dispatch) => {
		try {
			dispatch({ type: PRODUCT_LOADING });
			const res = await axios.get(`${API_URL}/products/${categoryId}/count`);
			console.log('count product by categoryId: ', res.data);
			dispatch({
				type: PRODUCTLISTBYCATEGORYCOUNT_FETCH_SUCCESS,
				payload: res.data.count
			});
		} catch (err) {
			dispatch(error(err));
		}
	};
};

//product -> OBJ, categories -> array of INT
export const addProduct = (formData) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('riguptoken');
			const res = await axios.post(`${API_URL}/products`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data'
				}
			});
			console.log('add product: ', res.data);
			dispatch({ type: INITIALFORMPRODUCT })
			dispatch({ type: INITIALPRODUCTDETAIL })
		} catch (err) {
			dispatch(error(err));
		}
	};
};

export const editProductById = (productId, formData) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('riguptoken');
			const res = await axios.put(`${API_URL}/products/${productId}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data'
				}
			});
			console.log('edit product: ', res.data);
			dispatch({ type: INITIALFORMPRODUCT })
			dispatch({ type: INITIALPRODUCTDETAIL })
		} catch (err) {
			dispatch(error(err));
		}
	};
};

export const deleteProductById = (productId) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('riguptoken');
			const res = await axios.delete(`${API_URL}/products/${productId}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			console.log('delete product: ', res.data);
			dispatch({ type: INITIALFORMPRODUCT })
			dispatch({ type: INITIALPRODUCTDETAIL })
		} catch (err) {
			dispatch(error(err));
		}
	};
};
