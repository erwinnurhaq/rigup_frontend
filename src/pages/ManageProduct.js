import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TableRow, TableCell, Table, TableHead, TableBody, TableFooter, IconButton, Select, MenuItem } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { API_URL } from '../support/API_URL';

import {
	selectCat,
	getMostParent,
	getProductDetailById,
	getProductByCategoryId,
	getCountProductByCategoryId,
	deleteProductById,
	addProduct,
	setInitialFormProduct,
	getBrandByCategoryId,
	editProductById,
	setInitialProductDetail
} from '../redux/actions';

import Formatter from '../support/FormatterRupiah'
import Loading from '../components/Loading';
import TableHeadRow from '../components/TableHeadRow';
import Pagination from '../components/Pagination';
const ModalDefault = lazy(() => import('../components/ModalDefault'));
const ModalWarning = lazy(() => import('../components/ModalWarning'));
const ModalConfirm = lazy(() => import('../components/ModalConfirm'));
const FormAddProduct = lazy(() => import('../components/forms/FormAddProduct'));

const ManageProduct = () => {
	const dispatch = useDispatch();
	const categories = useSelector(({ categories }) => categories);
	const productDetail = useSelector(({ productDetail }) => productDetail);
	const products = useSelector(({ products }) => products);
	const { newCategories, newProduct, newImage, deleteImage } = useSelector(({ formProduct }) => formProduct);

	const initialState = {
		page: 1,
		totalPage: 1,
		limit: 10,
		offset: 0
	};
	const [state, setState] = useState(initialState);
	const sortList = [
		{ id: 1, label: 'Last Updated' },
		{ id: 2, label: 'Name A to Z' },
		{ id: 3, label: 'Name Z to A' },
		{ id: 4, label: 'Price Low to High' },
		{ id: 5, label: 'Price High to Low' },
		{ id: 6, label: 'Stock Low to High' },
		{ id: 7, label: 'Stock High to Low' }
	]
	const [sort, setSort] = useState(1)
	const [selectedProduct, setSelectedProduct] = useState(0);
	const [showModalForm, setShowModalForm] = useState(false);
	const [showModalWarning, setShowModalWarning] = useState(false);
	const [showModalConfirm, setShowModalConfirm] = useState(false);

	//------------------------------useeffect
	useEffect(() => {
		dispatch(getMostParent());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getCountProductByCategoryId(categories.selectedCat));
		dispatch(getProductByCategoryId(categories.selectedCat, sort, state.limit, state.offset));
	}, [dispatch, categories.selectedCat, sort, state.limit, state.offset]);

	useEffect(() => {
		setState((prev) => {
			return { ...prev, totalPage: Math.ceil(products.productListByCatCount / state.limit) };
		});
	}, [products.productListByCatCount, state.limit]);
	//------------------------------useeffect

	const onCatTabClick = async (categoryId) => {
		setState(initialState);
		await dispatch(selectCat(categoryId));
	};

	const onAddProductClick = () => {
		setShowModalForm(!showModalForm);
	};

	const onDetailsClick = async (product) => {
		await dispatch(setInitialFormProduct());
		await dispatch(getProductDetailById(product.id, categories.mostParent));
		await dispatch(getBrandByCategoryId(product.categories[0].categoryId));
		setShowModalForm(!showModalForm);
	};

	const onDeleteClick = async (productId) => {
		await dispatch(deleteProductById(productId));
		setShowModalConfirm(!showModalConfirm);
		await dispatch(getCountProductByCategoryId(categories.selectedCat));
		await dispatch(getProductByCategoryId(categories.selectedCat, sort, state.limit, state.offset));
		dispatch(setInitialFormProduct());
		dispatch(setInitialProductDetail());
	};

	const deleteConfirmation = (productId) => {
		setSelectedProduct(productId);
		setShowModalConfirm(!showModalConfirm);
	};

	const onSaveProductClick = async () => {
		if (newProduct.brandId === 0 ||
			newProduct.name === '' ||
			newProduct.description === '' ||
			newProduct.weight === 0 ||
			newProduct.price === 0 ||
			newCategories[0] === 0
		) {
			return setShowModalWarning(!showModalWarning);
		}

		let formData = new FormData();
		newImage.forEach((i) => {
			formData.append('image', i);
		})

		if (productDetail.id) {
			//for edit form
			formData.append('data', JSON.stringify({ newProduct, newCategories }));
			formData.append('deleteImage', JSON.stringify(deleteImage))
			await dispatch(editProductById(productDetail.id, formData))
		} else {
			//for add form
			let data = {
				newProduct,
				newCategories: newCategories.slice(0, newCategories.length - 1)
			}
			formData.append('data', JSON.stringify(data));
			await dispatch(addProduct(formData));
		}
		await dispatch(selectCat(newCategories[0]))
		await dispatch(getCountProductByCategoryId(newCategories[0]));
		await dispatch(getProductByCategoryId(newCategories[0], sort, state.limit, state.offset));
		setShowModalForm(!showModalForm);
	};

	const renderCatTab = () => !categories.mostParent ? (<li><Loading /></li>) : (
		categories.mostParent.map((i) => (
			<li key={i.id} onClick={() => onCatTabClick(i.id)}
				style={{
					padding: '0 15px',
					listStyle: 'none',
					cursor: 'pointer',
					borderBottom: `${categories.selectedCat === i.id ? '1px solid darkviolet' : 'none'}`,
					fontWeight: `${categories.selectedCat === i.id ? 'bold' : 'normal'}`
				}}
			>{i.category}</li>
		))
	);

	//table material
	const columns = [
		{ id: 'id', label: '#', minWidth: 50, align: 'center' },
		{ id: 'mainImage', label: 'Image', minWidth: 50, align: 'center' },
		{ id: 'categories', label: 'Categories', minWidth: 150, align: 'center' },
		{ id: 'brand', label: 'Brand', minWidth: 100, align: 'center' },
		{ id: 'name', label: 'Product Name', minWidth: 150, align: 'center' },
		{ id: 'price', label: 'Price', minWidth: 100, align: 'center' },
		{ id: 'stock', label: 'Stock', minWidth: 50, align: 'center' },
		{ id: 'options', label: 'Options', minWidth: 100, align: 'center' }
	];
	//end table material

	const renderProductList = () => {
		if (products.loading) {
			let rows = products.productListByCatCount < state.limit ? products.productListByCatCount : state.limit;
			return new Array(rows).fill(0).map((i, index) => (
				<TableRow key={index}>
					{new Array(8).fill(0).map((j, index) => (
						<TableCell key={index} style={{ position: 'relative', height: '50px' }}>
							<Loading type="bar" />
						</TableCell>
					))}
				</TableRow>
			));
		} else if (products && products.productListByCat) {
			return products.productListByCat.map((i, index) => (
				<TableRow key={index}>
					<TableCell align="center">{state.offset + (index + 1)}</TableCell>
					<TableCell>
						<img src={`${API_URL}${i.image}`} alt={i.name} style={{ width: '50px' }} />
					</TableCell>
					<TableCell>{i.categories.map((c) => c.category).join(' > ')}</TableCell>
					<TableCell>{i.brand}</TableCell>
					<TableCell>{i.name}</TableCell>
					{/* <TableCell dangerouslySetInnerHTML={{ __html: i.description }} /> */}
					<TableCell>{Formatter.format(i.price)}</TableCell>
					<TableCell>{i.stock}</TableCell>
					<TableCell>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<IconButton aria-label="Detail Edit" onClick={() => onDetailsClick(i)}>
								<EditIcon />
							</IconButton>
							<IconButton aria-label="Delete" onClick={() => deleteConfirmation(i.id)}>
								<DeleteIcon />
							</IconButton>
						</div>
					</TableCell>
				</TableRow>
			));
		}
	};

	const renderForm = () =>
		showModalForm ? (
			<Suspense fallback={<Loading />}>
				<ModalDefault show={showModalForm} title="Product Detail">
					<Suspense fallback={<Loading />}>
						<FormAddProduct
							onSaveProductClick={onSaveProductClick}
							show={showModalForm}
							setShow={setShowModalForm}
						/>
					</Suspense>
				</ModalDefault>
			</Suspense>
		) : null;

	const renderModalConfim = () =>
		showModalConfirm ? (
			<Suspense fallback={<Loading />}>
				<ModalConfirm
					show={showModalConfirm}
					setShow={setShowModalConfirm}
					title="Are you sure?"
					cb={() => onDeleteClick(selectedProduct)}
				/>
			</Suspense>
		) : null;

	const renderModalWarning = () =>
		showModalWarning ? (
			<Suspense fallback={<Loading />}>
				<ModalWarning title="Warning" show={showModalWarning} setShow={setShowModalWarning}>
					Please select category and fill the form correctly!
				</ModalWarning>
			</Suspense>
		) : null;

	return (
		<div className="manageProductContainer">
			<div className="manageProductWrapper">
				<div className="productHeader">
					<ul>{renderCatTab()}</ul>
					<Button onClick={onAddProductClick} variant="outlined">
						<p style={{ padding: '0 5px' }}>ADD PRODUCT</p>
						<AddCircleOutlineIcon />
					</Button>
				</div>
				<Table style={{ width: '80%', margin: 'auto' }}>
					<TableHead>
						<TableHeadRow columns={columns} />
					</TableHead>
					<TableBody>{renderProductList()}</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={7}>
								<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
									<Select
										value={sort}
										onChange={e => setSort(e.target.value)}
									>
										{sortList.map(i => (
											<MenuItem key={i.id} value={i.id} >{i.label}</MenuItem>
										))}
									</Select>
									<Pagination
										totalProduct={products.productListByCatCount}
										rangeLimit={[5, 10, 15, 20, 25, 50]}
										state={state}
										setState={setState}
									/>
								</div>
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
			{renderForm()}
			{renderModalWarning()}
			{renderModalConfim()}
		</div>
	);
};

export default ManageProduct;
