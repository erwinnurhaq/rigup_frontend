import axios from 'axios';
import { API_URL } from '../../support/API_URL';
import {
	CATEGORY_LOADING,
	CATEGORY_ERROR,
	CATEGORY_FETCH_SUCCESS,
	MOSTPARENT_FETCH_SUCCESS,
	MOSTCHILD_FETCH_SUCCESS,
	CHILD_FETCH_SUCCESS,
	CHILDOFMAINPARENT_FETCH_SUCCESS,
	SELECT_CAT,
	SELECT_CHILD_CAT,
	SELECT_FILTER_CAT,
	CATEGORIES_SEARCH_FILTER,
	PRODUCTLISTCOUNT_FETCH_SUCCESS,
	CATLIST_CHANGE
} from './Types'

const error = (err) => {
	let error = err.response && Object.keys(err.response).length >= 0 ? err.response.data.message : 'Cannot connect to API'
	return {
		type: CATEGORY_ERROR,
		payload: error
	};
};

export const selectCat = (categoryId) => {
	return (dispatch) => {
		dispatch({
			type: SELECT_CAT,
			payload: categoryId
		});
	};
};

export const selectChildCat = (categoryId) => {
	return (dispatch) => {
		dispatch({
			type: SELECT_CHILD_CAT,
			payload: categoryId
		});
	};
};

export const selectFilter = (categoryId) => {
	return (dispatch) => {
		dispatch({
			type: SELECT_FILTER_CAT,
			payload: categoryId
		});
	};
};

export const getCategoriesSearchFilter = (search) => {
	return async (dispatch) => {
		try {
			const res = await axios.get(`${API_URL}/products`, {
				params: { search }
			});
			dispatch({
				type: PRODUCTLISTCOUNT_FETCH_SUCCESS,
				payload: res.data.length
			})
			let x = res.data.map(i => {
				let obj = {}
				obj.categoryId = i.categoryId
				obj.category = i.category
				obj.count = 1
				return obj
			}).sort((a, b) => a.categoryId - b.categoryId)
			console.log('res.data product list: ', res.data)
			console.log('all before filtered: ', x)
			let categoryFilterResult = []
			let count = 1
			for (let i = 0; i < x.length; i++) {
				if (categoryFilterResult.findIndex(j => j.categoryId === x[i].categoryId) < 0) {
					categoryFilterResult.push(x[i])
					count = 1
				} else {
					categoryFilterResult[categoryFilterResult.length - 1].count = count
				}
				count++
			}
			console.log('after filtered: ', categoryFilterResult)
			dispatch({
				type: CATEGORIES_SEARCH_FILTER,
				payload: categoryFilterResult
			})
		} catch (err) {
			dispatch(error(err));
		}
	}
}

export const getCategories = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: CATEGORY_LOADING });
			const res = await axios.get(`${API_URL}/categories`);
			console.log('all categories: ', res.data);
			dispatch({
				type: CATEGORY_FETCH_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			dispatch(error(err));
		}
	};
};

export const getMostParent = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: CATEGORY_LOADING });
			const res = await axios.get(`${API_URL}/categories/mostparent`);
			console.log('most parent category: ', res.data);
			dispatch({
				type: MOSTPARENT_FETCH_SUCCESS,
				payload: res.data
			});
			dispatch({
				type: CATLIST_CHANGE,
				payload: [res.data]
			});
		} catch (err) {
			dispatch(error(err));
		}
	};
};

export const getMostChild = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: CATEGORY_LOADING });
			const res = await axios.get(`${API_URL}/categories/mostchild`);
			console.log('most child category: ', res.data);
			dispatch({
				type: MOSTCHILD_FETCH_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			dispatch(error(err));
		}
	};
};

export const getChild = (parentId) => {
	return async (dispatch) => {
		try {
			dispatch({ type: CATEGORY_LOADING });
			const res = await axios.get(`${API_URL}/categories/child/${parentId}`);
			console.log('child by parentId: ', res.data);
			dispatch({
				type: CHILD_FETCH_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			dispatch(error(err));
		}
	};
};

export const getChildOfMainParent = (mainParentId) => {
	return async (dispatch) => {
		try {
			dispatch({ type: CATEGORY_LOADING });
			const res = await axios.get(`${API_URL}/categories/childofmainparent/${mainParentId}`);
			console.log('child by mainParentId: ', res.data);
			dispatch({
				type: CHILDOFMAINPARENT_FETCH_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			dispatch(error(err));
		}
	};
};

export const addCategory = ({ newCategory, newParentId, newMainParentId }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: CATEGORY_LOADING });
			const token = localStorage.getItem('riguptoken');
			const res = await axios.post(
				`${API_URL}/categories`,
				{ category: newCategory, parentId: newParentId, mainParentId: newMainParentId },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			console.log('add category: ', res.data);
			dispatch(getCategories());
		} catch (err) {
			dispatch(error(err));
		}
	};
};

export const editCategory = ({ categoryId, newCategory, newParentId, newMainParentId }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: CATEGORY_LOADING });
			const token = localStorage.getItem('riguptoken');
			const res = await axios.put(
				`${API_URL}/categories/${categoryId}`,
				{ category: newCategory, parentId: newParentId, mainParentId: newMainParentId },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			console.log('edit category: ', res.data);
			dispatch(getCategories());
		} catch (err) {
			dispatch(error(err));
		}
	};
};

export const deleteCategory = (categoryId) => {
	return async (dispatch) => {
		try {
			dispatch({ type: CATEGORY_LOADING });
			const token = localStorage.getItem('riguptoken');
			const res = await axios.delete(`${API_URL}/categories/${categoryId}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			console.log('delete category: ', res.data);
			dispatch(getCategories());
		} catch (err) {
			dispatch(error(err));
		}
	};
};
