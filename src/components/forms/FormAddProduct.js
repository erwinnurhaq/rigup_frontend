import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { API_URL } from '../../support/API_URL'
import { Select, MenuItem, DialogActions, Button, DialogContent } from '@material-ui/core'
import { getBrandByCategory } from '../../redux/actions'
import FormProductData from './FormProductData'
import FormProductDetail from './FormProductDetail'

function FormAddProduct({ mostParent, show, setShow }) {
    const dispatch = useDispatch()
    const brandByCategory = useSelector(({ brands }) => brands.brandByCategory)

    const [state, setState] = useState({
        catList: [mostParent],
        assignedCatId: [0],
        assignedCatParent: '',
        newProduct: { brand: 0, name: '', price: '', stock: '' },
        newProductDetail: {}
    })
    let { catList, assignedCatId, assignedCatParent, newProduct, newProductDetail } = state

    const onSelectCat = async (e, index) => {
        const val = parseInt(e.target.value)
        if (index === 0) {
            assignedCatParent = catList[0].filter(i => i.id === val)[0].category
            dispatch(getBrandByCategory(val))
        }
        const nextList = await axios.post(`${API_URL}/categories/child?id=${val}`)
        if (nextList.data.length !== 0 || catList.length === 1) {
            catList.splice(index + 1, catList.length - index - 1, nextList.data)
        }
        assignedCatId.splice(index, assignedCatId.length - index - 1, val)
        setState({
            ...state, catList, assignedCatId, assignedCatParent, newProduct: {
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

    const onInputChangeB = e => {
        let val = e.target.type === 'number' && e.target.value !== '' ? parseInt(e.target.value) : e.target.value
        setState({
            ...state, newProductDetail: {
                ...newProductDetail,
                [e.target.id]: val
            }
        })
    }

    const onSaveProductClick = () => {
        let data = {
            product: newProduct,
            productDetail: newProductDetail,
            categories: assignedCatId.slice(0, assignedCatId.length - 1),
            parent: assignedCatParent
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
    return (
        <div>
            <DialogContent>
                {renderSelectCategory()}
                {assignedCatId[0] !== 0 ? (
                    <div>
                        <br />
                        <p>New Product:</p>
                        <FormProductData
                            product={newProduct}
                            brand={brandByCategory}
                            onSelectBrand={onSelectBrand}
                            onInputChange={onInputChangeA}
                        />
                        <br />
                        <p>Detail:</p>
                        <FormProductDetail
                            parentCategory={assignedCatParent}
                            productDetail={newProductDetail}
                            onInputChange={onInputChangeB}
                        />
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

