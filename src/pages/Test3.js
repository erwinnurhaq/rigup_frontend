import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
    getMostChild,
    getUncategorizedProduct,
    getProductCat,
    assignProductCat,
    deleteAssignedProductCat
} from '../redux/actions'
import Loading from '../components/Loading'


const Test3 = () => {

    const dispatch = useDispatch()

    const initialAssign = {
        productId: 0,
        categoryId: 0
    }

    const [assign, setAssign] = useState(initialAssign)
    const productCat = useSelector(({ productCats }) => productCats.productCats)
    const uncategorized = useSelector(({ products }) => products.uncategorizedProductList)
    const mostChild = useSelector(({ categories }) => categories.mostChild)

    const [desc, setDesc] = useState(``)

    useEffect(() => {
        dispatch(getProductCat())
        dispatch(getUncategorizedProduct())
        dispatch(getMostChild())
    }, [dispatch])

    const onClickAdd = () => {
        if (assign.productId === 0 || assign.categoryId === 0) {
            return alert('Must select product and category')
        }
        dispatch(assignProductCat(assign))
        setAssign(initialAssign)
    }

    const onClickDelete = (id) => {
        if (window.confirm('Are you sure to delete')) {
            dispatch(deleteAssignedProductCat(id))
        }
    }

    const renderProductCat = () => {
        if (productCat) {
            return productCat.map((i, index) => (
                <tr key={index}>
                    <td>{i.id}</td>
                    <td>{i.brand}</td>
                    <td>{i.name}</td>
                    <td>{i.category}</td>
                    <td>
                        <input
                            type="button"
                            value="DELETE"
                            onClick={e => onClickDelete(i.productId)}
                        />
                    </td>
                </tr>
            ))
        } else {
            return <Loading />
        }
    }

    const renderUncategorized = () => {
        if (uncategorized) {
            return uncategorized.map(i => (
                <option key={i.id} value={i.id}>{i.brand} {i.name}</option>
            ))
        } else {
            return <Loading />
        }
    }

    const renderMostChild = () => {
        if (mostChild) {
            return mostChild.map(i => (
                <option key={i.id} value={i.id}>{i.category}</option>
            ))
        } else {
            return <Loading />
        }
    }

    return (
        <div className="testContainer">
            <table>
                <thead>
                    <tr>
                        <td>id</td>
                        <td>Brand</td>
                        <td>Product</td>
                        <td>Category</td>
                        <td>Option</td>
                    </tr>
                </thead>
                <tbody>
                    {renderProductCat()}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan='2' />
                        <td>
                            <select
                                value={assign.productId}
                                onChange={e => setAssign({
                                    ...assign,
                                    productId: parseInt(e.target.value)
                                })}
                            >
                                <option value={0}>Choose Product:</option>
                                {renderUncategorized()}
                            </select>
                        </td>
                        <td>
                            <select
                                value={assign.categoryId}
                                onChange={e => setAssign({
                                    ...assign,
                                    categoryId: parseInt(e.target.value)
                                })}
                            >
                                <option value={0}>Choose Category:</option>
                                {renderMostChild()}
                            </select>
                        </td>
                        <td>
                            <input
                                type="button"
                                value="ADD"
                                onClick={onClickAdd}
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>


            <div>
                <h2>Using CKEditor 5 build in React</h2>
                <CKEditor
                    editor={ClassicEditor}
                    data={desc}
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setDesc(data)
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div>


        </div>
    )
}

export default Test3