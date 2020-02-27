import React, { useState, lazy, Suspense, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { API_URL } from '../../support/API_URL'
import { Select, MenuItem, DialogActions, Button, DialogContent } from '@material-ui/core'

import FormProductData from './FormProductData'
import Loading from '../Loading'
import { getBrandByCategoryId, editProductById, getProductByCategoryId, selectCat } from '../../redux/actions'

const ModalWarning = lazy(() => import('../ModalWarning'))

function FormEditProduct({ limit, offset, mostParent, show, setShow }) {

    const dispatch = useDispatch()
    const brandByCategory = useSelector(({ brands }) => brands.brandByCategory)
    const productDetail = useSelector(({ products }) => products.productDetail)

    const initialState = {
        catList: [mostParent],
        newCategories: [0],
        newProduct: { brandId: 0, name: '', description: '', weight: '', wattage: '', price: '', stock: '' }
    }
    const [state, setState] = useState(initialState)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setData()
    }, [productDetail])

    const setData = async () => {
        if (productDetail) {
            let categories = productDetail.categories.map(i => i.categoryId)
            const catListAdd = await axios.get(`${API_URL}/categories/childtree`, {
                params: { parentId: categories }
            })
            console.log('catlistadd', catListAdd)
            await dispatch(getBrandByCategoryId(categories[0]))
            setState({
                catList: [mostParent, ...catListAdd.data],
                newCategories: categories,
                newProduct: {
                    brandId: productDetail.brandId,
                    name: productDetail.name,
                    description: productDetail.description,
                    weight: productDetail.weight,
                    wattage: productDetail.wattage,
                    price: productDetail.price,
                    stock: productDetail.stock
                }
            })
        }
    }

    let { catList, newCategories, newProduct } = state

    const onSelectCat = async (e, index) => {
        try {
            let val = parseInt(e.target.value)
            if (index === 0) { await dispatch(getBrandByCategoryId(val)) }

            const catChild = await axios.get(`${API_URL}/categories/child/${val}`)
            if (catChild.data.length !== 0 || catList.length === 1) {
                catList.splice(index + 1, catList.length - index - 1, catChild.data)
            }
            newCategories.splice(index, newCategories.length - index, val)
            setState({
                ...state, catList, newCategories,
                newProduct: { ...state.newProduct, brandId: 0 }
            })
        } catch (err) {
            console.log(err)
        }
    }

    const onSelectBrand = e => setState({
        ...state, newProduct: {
            ...newProduct, brandId: parseInt(e.target.value)
        }
    })


    const onInputChange = e => {
        let val = e.target.type === 'number' && e.target.value !== '' ? parseInt(e.target.value) : e.target.value
        setState({
            ...state, newProduct: {
                ...newProduct,
                [e.target.id]: val
            }
        })
    }

    const onInputDescChange = data => {
        setState({
            ...state, newProduct: {
                ...newProduct, description: data
            }
        })
    }

    const onSaveProductClick = async () => {

        for (const key in state.newProduct) {
            if (state.newProduct[key] === initialState.newProduct[key]
                || state.newCategories[0] === initialState.newCategories[0]) {
                return setShowModal(!showModal)
            }
        }
        let data = { productId: productDetail.id, newProduct, newCategories }
        console.log(data)
        await dispatch(editProductById(data))
        await dispatch(getProductByCategoryId(data.newCategories[0], limit, offset))
        await dispatch(selectCat(data.newCategories[0]))
        setState(initialState)
        setShow(!show)
    }

    const renderSelectCategory = () =>
        catList.length > 1 ? catList.map((category, index) => (
            <Select
                key={index}
                value={newCategories[index] ? newCategories[index] : 0}
                onChange={e => onSelectCat(e, index)}
            >
                <MenuItem value={0}>Choose Category:</MenuItem>
                {category.map(i => (
                    <MenuItem key={i.id} value={i.id}>{i.category}</MenuItem>
                ))}
            </Select>
        )) : null


    console.log(state)
    return (
        <div>
            <DialogContent>
                {renderSelectCategory()}
                {newCategories[0] !== 0 && productDetail ? (
                    <div>
                        <br />
                        <FormProductData
                            product={newProduct}
                            brand={brandByCategory}
                            onSelectBrand={onSelectBrand}
                            onInputChange={onInputChange}
                            onInputDescChange={onInputDescChange}
                        />
                    </div>
                ) : (<Loading />)}
            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={() => setShow(!show)} >CANCEL</Button>
                <Button color="secondary" onClick={onSaveProductClick} >EDIT &amp; SAVE</Button>
            </DialogActions>
            {showModal ? (
                <Suspense fallback={<Loading />}>
                    <ModalWarning
                        title='Warning'
                        show={showModal}
                        setShow={setShowModal}
                    >Please select category and fill the form correctly!</ModalWarning>
                </Suspense>
            ) : null}
        </div>
    )
}

export default FormEditProduct

