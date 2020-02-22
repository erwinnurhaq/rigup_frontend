import React, { useState, useEffect, Suspense, lazy } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { API_URL } from '../support/API_URL'
import { TextField, Select, MenuItem, DialogActions, Button, DialogContent } from '@material-ui/core'

import { getAllCategories, getChild, getBrandByCategory } from '../redux/actions'
import Loading from './Loading'

const FormAddProduct = ({ mostParent, show, setShow }) => {

    const dispatch = useDispatch()
    const brandByCategory = useSelector(({ brands }) => brands.brandByCategory)

    const [state, setState] = useState({
        catList: [mostParent],
        assignedCatId: [0],
        newProduct: { brand: 0, name: '', price: '', stock: '' },
        newProductDetail: { desription: '' }
    })
    const { catList, assignedCatId, newProduct, newProductDetail } = state

    const onSelectCat = async (e, index) => {
        const val = parseInt(e.target.value)

        if (index === 0) { dispatch(getBrandByCategory(val)) }
        const nextList = await axios.post(`${API_URL}/categories/child`, null, {
            params: { id: val }
        })

        if (nextList.data.length !== 0 || catList.length === 1) {
            catList.splice(index + 1, catList.length - index - 1, nextList.data)
        }
        assignedCatId.splice(index, assignedCatId.length - index - 1, val)
        setState({
            ...state, catList, assignedCatId, newProduct: {
                ...newProduct,
                brand: 0
            }
        })
    }

    const onSelectBrand = e => setState({
        ...state, newProduct: {
            ...newProduct, brand: parseInt(e.target.value)
        }
    })


    const onInputChangeA = e => {
        let val = e.target.type === 'number' && e.target.value !== '' ? parseInt(e.target.value) : e.target.value
        setState({
            ...state, newProduct: {
                ...newProduct,
                [e.target.id]: val
            }
        })
    }

    const onSaveProductClick = () => {
        let data = {
            product: newProduct,
            productDetail: newProductDetail,
            categories: assignedCatId.slice(0, assignedCatId.length - 1),
            parent: catList[0].filter(i => i.id === assignedCatId[0])[0].category
        }
        console.log(data)
    }

    const renderSelectCategory = () => (
        catList.map((category, index) => (
            <Select
                key={index}
                value={assignedCatId[index]}
                onChange={e => onSelectCat(e, index)}
            >
                <MenuItem value={0}>Choose Category:</MenuItem>
                {category.map(i => (
                    <MenuItem key={i.id} value={i.id}>{i.category}</MenuItem>
                ))}
            </Select>
        ))
    )

    const renderSelectBrand = () => (
        <Select
            value={newProduct.brand}
            onChange={onSelectBrand}
        >
            <MenuItem value={0}>Choose Brand:</MenuItem>
            {brandByCategory ? brandByCategory.map(i => (
                <MenuItem key={i.brandId} value={i.brandId}>{i.brand}</MenuItem>
            )) : null}
        </Select>
    )

    const renderFormAddProductDetail = () => {
        // mostParent.filter(i=> i.id === assignedCatId[0])[0].category
    }

    console.log({ catList, assignedCatId, newProduct, newProductDetail })
    return (
        <div>
            <DialogContent>
                {renderSelectCategory()}
                {assignedCatId[0] !== 0 ? (
                    <div>
                        <br />
                        <p>New Product:</p>
                        <div>
                            {renderSelectBrand()}
                            <TextField
                                margin="dense" label="Product Name" id="name" type="text"
                                value={newProduct.name}
                                onChange={onInputChangeA}
                                fullWidth required
                            />
                            <TextField
                                margin="dense" label="Price" id="price" type="number"
                                value={newProduct.price}
                                onChange={onInputChangeA}
                                required
                            />
                            <TextField
                                margin="dense" label="Stock" id="stock" type="number"
                                value={newProduct.stock}
                                onChange={onInputChangeA}
                                required
                            />
                        </div>
                        <br />
                        <p>Detail:</p>
                        <div>
                            <TextField
                                margin="dense" label="Product Desription" id="description"
                                type="text" multiline fullWidth
                            />
                            {renderFormAddProductDetail()}
                        </div>
                    </div>
                ) : null}
            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={() => setShow(!show)} >CANCEL</Button>
                <Button color="secondary" onClick={onSaveProductClick} >SAVE</Button>
            </DialogActions>
        </div>
    )
}

export default FormAddProduct
