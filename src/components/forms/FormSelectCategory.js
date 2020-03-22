import React from 'react';
import axios from 'axios';
import { API_URL } from '../../support/API_URL';
import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem } from '@material-ui/core';
import { getBrandByCategoryId, setCatList, setNewCategories, setNewProduct } from '../../redux/actions';

function FormSelectCategory() {
	const dispatch = useDispatch();
	const { catList, newCategories } = useSelector(({ formProduct }) => formProduct);

	const onSelectCat = async (e, index) => {
		try {
			let val = parseInt(e.target.value);
			if (index === 0) {
				await dispatch(getBrandByCategoryId(val));
			}
			const catChild = await axios.get(`${API_URL}/categories/child/${val}`);
			console.log(catChild)
			if (catChild.data.length !== 0 || catList.length === 1) {
				catList.splice(index + 1, catList.length - index - 1, catChild.data);
			}
			newCategories.splice(index, newCategories.length - index, val);
			dispatch(setCatList(catList));
			dispatch(setNewCategories(newCategories));
			dispatch(setNewProduct('brandId', 0));
		} catch (err) {
			console.log(err);
		}
	};

	return catList.map((category, index) => (
		<Select
			key={index}
			value={newCategories[index] ? newCategories[index] : 0}
			onChange={(e) => onSelectCat(e, index)}
		>
			<MenuItem value={0}>Choose Category:</MenuItem>
			{category.map((i) => (
				<MenuItem key={i.id} value={i.id}>
					{i.category}
				</MenuItem>
			))}
		</Select>
	));
}

export default FormSelectCategory;
