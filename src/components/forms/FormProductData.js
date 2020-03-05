import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TextField, Select, MenuItem, InputLabel, Button } from '@material-ui/core';
import { setNewProduct, setNewImage, setDeleteImage } from '../../redux/actions';
import Loading from '../Loading';
import { API_URL } from '../../support/API_URL';

const FormProductData = () => {
	const dispatch = useDispatch();
	const productDetail = useSelector(({ productDetail }) => productDetail);
	const brand = useSelector(({ brands }) => brands.brandByCategory);
	const { newProduct, newImage, deleteImage } = useSelector(({ formProduct }) => formProduct);

	const onSelectBrand = (e) => dispatch(setNewProduct('brandId', parseInt(e.target.value)));

	const onInputDescChange = (data) => dispatch(setNewProduct('description', data));

	const onInputBoxChange = (e) => {
		let val = e.target.type === 'number' && e.target.value !== '' ? parseInt(e.target.value) : e.target.value;
		dispatch(setNewProduct(e.target.id, val));
	};

	const imgFileHandler = (e) => {
		let arr = [];
		for (let i = 0; i < e.target.files.length; i++) {
			arr.push(e.target.files[i]);
		}
		console.log(arr);
		dispatch(setNewImage(arr));
	};

	const imgDeleteHandler = (image) => {
		let arr = [...deleteImage]
		let existing = arr.findIndex(i => i.id === image.id)
		existing >= 0 ? arr.splice(existing, 1) : arr.push(image)
		dispatch(setDeleteImage(arr))
	}

	const renderImages = () => productDetail.images && productDetail.images.length > 0 ? (
		<div style={{ display: 'flex', width: '100%', height: '15vh' }}>
			{productDetail.images.map(i => (
				<div key={i.id} style={{
					height: '100%',
					width: '20%',
					display: 'flex',
					flexDirection: 'column'
				}}>
					<img src={`${API_URL}/${i.image}`} alt={i.id}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							opacity: deleteImage.findIndex(a => a.id === i.id) >= 0 ? 0.3 : 1,
							border: deleteImage.findIndex(a => a.id === i.id) >= 0 ? '1px solid lightcoral' : 'none'
						}} />
					<Button variant="outlined" onClick={() => imgDeleteHandler(i)}
						disabled={i.id === null}
					>
						Delete
					</Button>
				</div>
			))}
		</div>
	) : (<h3>This product has no images</h3>)

	return (
		<form encType="multipart/form-data">
			<Select value={newProduct.brandId ? newProduct.brandId : 0} onChange={onSelectBrand}>
				<MenuItem value={0}>Choose Brand:</MenuItem>
				{brand ? (
					brand.map((i) => (
						<MenuItem key={i.brandId} value={i.brandId}>
							{i.brand}
						</MenuItem>
					))
				) : null}
			</Select>
			<TextField
				margin="dense"
				label="Product Name"
				id="name"
				type="text"
				value={newProduct.name ? newProduct.name : ''}
				onChange={onInputBoxChange}
				fullWidth
				required
			/>
			<br />
			<InputLabel style={{ paddingTop: '24px' }}>Description:</InputLabel>
			<CKEditor
				editor={ClassicEditor}
				data={newProduct.description ? newProduct.description : ''}
				onInit={(editor) => {
					console.log('Editor is ready to use!', editor);
				}}
				onChange={(event, editor) => {
					const data = editor.getData();
					onInputDescChange(data);
				}}
			/>
			<TextField
				margin="dense"
				label="Package Weight (Gram)"
				id="weight"
				type="number"
				value={newProduct.weight ? newProduct.weight : 0}
				onChange={onInputBoxChange}
				required
			/>
			<TextField
				margin="dense"
				label="Wattage (Watt)"
				id="wattage"
				type="number"
				value={newProduct.wattage ? newProduct.wattage : 0}
				onChange={onInputBoxChange}
				required
			/>
			<TextField
				margin="dense"
				label="Price"
				id="price"
				type="number"
				value={newProduct.price ? newProduct.price : 0}
				onChange={onInputBoxChange}
				required
			/>
			<TextField
				margin="dense"
				label="Stock"
				id="stock"
				type="number"
				value={newProduct.stock ? newProduct.stock : 0}
				onChange={onInputBoxChange}
				required
			/>
			<br />
			<div>
				<Button variant="outlined" component="label">
					Upload Images
					<input
						accept="image/*"
						type="file"
						multiple
						name="image"
						style={{ display: 'none' }}
						onChange={imgFileHandler}
					/>
				</Button>
				<p>{newImage.length} File Image Selected</p>
			</div>
			{renderImages()}
		</form>
	);
};

export default FormProductData;
