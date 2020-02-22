import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    getUncategorizedProducts,
    getMostChild,
    assignProductCat,
    getProductCat,
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
    const productCat = useSelector(({ products }) => products.productCat)
    const uncategorized = useSelector(({ products }) => products.uncategorizedProductList)
    const mostChild = useSelector(({ categories }) => categories.mostChild)

    useEffect(() => {
        dispatch(getProductCat())
        dispatch(getUncategorizedProducts())
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
                    <td>{index + 1}</td>
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
                <option key={i.id} value={i.id}>{i.name}</option>
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
                        <td>Index</td>
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
                        <td />
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
        </div>
    )
}

export default Test3