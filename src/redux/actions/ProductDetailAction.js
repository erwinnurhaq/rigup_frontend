import axios from 'axios'
import { API_URL } from '../../support/API_URL'

export const getProductDetailById = (productId, mostParent) => {
    return async dispatch => {
        try {
            const res = await axios.get(`${API_URL}/products/detail/${productId}`)
            console.log('product detail: ', res.data)
            dispatch({
                type: 'PRODUCTDETAIL_FETCH_SUCCESS',
                payload: res.data
            })
            const cat = res.data.categories.map(i => i.categoryId)
            const childTree = await axios.get(`${API_URL}/categories/childtree`, {
                params: { parentId: cat }
            });
            dispatch({
                type: 'FORMDETAILPRODUCT',
                payload: {
                    catList: [mostParent, ...childTree.data],
                    newCategories: cat,
                    newProduct: {
                        brandId: res.data.brandId,
                        name: res.data.name,
                        description: res.data.description,
                        weight: res.data.weight,
                        wattage: res.data.wattage,
                        price: res.data.price,
                        stock: res.data.stock
                    },
                    newImage: []
                }
            })
        } catch (err) {
            console.log(err.response.data)
        }
    }
}

export const setInitialProductDetail = () => {
    return { type: 'INITIALPRODUCTDETAIL' }
}