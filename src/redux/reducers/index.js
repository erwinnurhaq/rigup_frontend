import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import BrandReducer from './BrandReducer';
import BrandCatReducer from './BrandCatReducer';
import CategoryReducer from './CategoryReducer';
import ProductReducer from './ProductReducer';
import ProductCatReducer from './ProductCatReducer';
import ProductDetailReducer from './ProductDetailReducer';
import ManageUserReducer from './ManageUserReducer';
import FormProductReducer from './FormProductReducer';

export default combineReducers({
	user: UserReducer,
	brands: BrandReducer,
	brandCats: BrandCatReducer,
	categories: CategoryReducer,
	products: ProductReducer,
	productCats: ProductCatReducer,
	productDetail: ProductDetailReducer,
	manageUser: ManageUserReducer,
	formProduct: FormProductReducer
});
