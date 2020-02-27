import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import BrandReducer from './BrandReducer'
import BrandCatReducer from './BrandCatReducer'
import CategoryReducer from './CategoryReducer'
import ProductReducer from './ProductReducer'
import ProductCatReducer from './ProductCatReducer'
import ProductDetailReducer from './ProductDetailReducer'

export default combineReducers({
    user: UserReducer,
    brands: BrandReducer,
    brandCats: BrandCatReducer,
    categories: CategoryReducer,
    products: ProductReducer,
    productCats: ProductCatReducer,
    productDetail: ProductDetailReducer
})