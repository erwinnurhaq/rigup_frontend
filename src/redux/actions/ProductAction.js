import axios from 'axios';
import { API_URL } from '../../support/API_URL';

const error = (err) => {
	let error = err.response ? err.response.data.error : 'Cannot connect to API';
	return {
		type: 'PRODUCT_ERROR',
		payload: error
	};
};

export const getProducts = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: 'PRODUCT_LOADING' });
			const res = await axios.get(`${API_URL}/products`);
			console.log('all products: ', res.data);
			dispatch({
				type: 'PRODUCTLIST_FETCH_SUCCESS',
				payload: res.data
			});
		} catch (err) {
			dispatch(error(err));
		}
	};
};

export const getUncategorizedProduct = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: 'PRODUCT_LOADING' });
			const res = await axios.get(`${API_URL}/products/uncategorized`);
			console.log('uncategorized products: ', res.data);
			dispatch({
				type: 'UNCATEGORIZEDPRODUCTLIST_FETCH_SUCCESS',
				payload: res.data
			});
		} catch (err) {
			dispatch(error(err));
		}
	};
};

export const getProductByCategoryId = (categoryId, limit, offset) => {
	return async (dispatch) => {
		try {
			dispatch({ type: 'PRODUCT_LOADING' });
			const res = await axios.get(`${API_URL}/products/${categoryId}`, {
				params: { limit, offset }
			});
			console.log('product by category id: ', res.data);
			dispatch({
				type: 'PRODUCTLISTBYCATEGORY_FETCH_SUCCESS',
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
			dispatch({ type: 'PRODUCT_LOADING' });
			const count = await axios.get(`${API_URL}/products/${categoryId}/count`);
			console.log('count product by categoryId: ', count.data);
			dispatch({
				type: 'PRODUCTLISTBYCATEGORYCOUNT_FETCH_SUCCESS',
				payload: count.data.count
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
			dispatch({ type: 'INITIALFORMPRODUCT' })
			dispatch({ type: 'INITIALPRODUCTDETAIL' })
			// dispatch(getProductByCategoryId(newCategories[0], 10, 0))
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
			dispatch({ type: 'INITIALFORMPRODUCT' })
			dispatch({ type: 'INITIALPRODUCTDETAIL' })
			// dispatch(getProductByCategoryId(newCategories[0]))
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
			dispatch({ type: 'INITIALFORMPRODUCT' })
			dispatch({ type: 'INITIALPRODUCTDETAIL' })
		} catch (err) {
			dispatch(error(err));
		}
	};
};
