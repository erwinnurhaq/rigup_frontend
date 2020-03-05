import React, { lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DialogActions, Button, DialogContent } from '@material-ui/core';
import Loading from '../Loading';
import FormSelectCategory from './FormSelectCategory';
import { setInitialFormProduct, setInitialProductDetail } from '../../redux/actions';

const FormProductData = lazy(() => import('./FormProductData'));

function FormAddProduct({ onSaveProductClick, show, setShow }) {
	const dispatch = useDispatch()
	const { newCategories } = useSelector(({ formProduct }) => formProduct);
	return (
		<div>
			<DialogContent>
				<FormSelectCategory />
				{newCategories[0] !== 0 ? (
					<div>
						<br />
						<Suspense fallback={<Loading />}>
							<FormProductData />
						</Suspense>
					</div>
				) : null}
			</DialogContent>
			<DialogActions>
				<Button variant="text" onClick={() => {
					dispatch(setInitialFormProduct())
					dispatch(setInitialProductDetail())
					setShow(!show)
				}}>
					CANCEL
				</Button>
				<Button color="secondary" onClick={onSaveProductClick}>
					SAVE
				</Button>
			</DialogActions>
		</div>
	);
}

export default FormAddProduct;
