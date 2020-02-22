import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import BrandReducer from './BrandReducer'
import CategoryReducer from './CategoryReducer'
import ProductReducer from './ProductReducer'

export default combineReducers({
    user: UserReducer,
    brands: BrandReducer,
    categories: CategoryReducer,
    products: ProductReducer
})