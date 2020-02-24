import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'

import { getMostParent, getProducts } from '../redux/actions'
import Loading from '../components/Loading'
const ModalAddProduct = lazy(() => import('../components/ModalAddProduct'))
const FormAddProduct = lazy(() => import('../components/forms/FormAddProduct'))

const ManageProduct = () => {
    const dispatch = useDispatch()
    const categories = useSelector(({ categories }) => categories)
    const products = useSelector(({ products }) => products)

    const initialState = {
        selectedCat: 1,
        initialNumber: 0
    }
    const [state, setState] = useState(initialState)
    const [showModalAdd, setShowModalAdd] = useState(false)

    useEffect(() => {
        dispatch(getMostParent())
        dispatch(getProducts(state.selectedCat))
    }, [dispatch])

    const onCatTabClick = category => {
        setState({ ...state, selectedCat: category })
        dispatch(getProducts('category', category))
    }

    const onAddProductClick = () => {
        setShowModalAdd(!showModalAdd)
    }

    const renderCatTab = () => !categories.mostParent ? (<Loading />) : (
        categories.mostParent.map(i => (
            <li
                key={i.id} name={i.category}
                style={{
                    padding: '0 15px',
                    listStyle: 'none',
                    fontWeight: `${state.selectedCat === i.category ? 'bold' : 'normal'}`
                }}
                onClick={() => onCatTabClick(i.category)}
            >
                {i.category}
            </li>
        ))
    )

    const renderProductList = () => products.loading ? (<tr><td><Loading /></td></tr>) : (
        products.productList.map((i, index) => (
            <tr key={index}>
                <td>{state.initialNumber + (index + 1)}</td>
                <td>{i.category.join(' > ')}</td>
                <td>{i.brand}</td>
                <td>{i.name}</td>
                <td>{i.price}</td>
                <td>{i.stock}</td>
                <td>
                    <Button variant='outlined' >Edit Details</Button>
                </td>
                <td>
                    <Button color='secondary' variant='contained'>Delete</Button>
                </td>
            </tr>
        ))
    )

    return (
        <div className="manageProductContainer">
            <div style={{ width: '100%' }}>
                <div>
                    <ul style={{ display: 'flex', justifyContent: 'center' }}>
                        {renderCatTab()}
                    </ul>
                    <Button onClick={onAddProductClick}>
                        ADD PRODUCT
                    </Button>
                </div>
                <div>
                    <table style={{ width: '80%', margin: 'auto' }}>
                        <thead>
                            <tr>
                                <td>No.</td>
                                <td>Categories</td>
                                <td>Brand</td>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Stock</td>
                                <td colSpan='2' width='15%'>options</td>
                            </tr>
                        </thead>
                        <tbody>
                            {renderProductList()}
                        </tbody>
                    </table>
                </div>
            </div>
            {showModalAdd ? (
                <Suspense fallback={<Loading />}>
                    <ModalAddProduct
                        show={showModalAdd}
                        setShow={setShowModalAdd}
                    >
                        <FormAddProduct
                            mostParent={categories.mostParent}
                            show={showModalAdd}
                            setShow={setShowModalAdd}
                        />
                    </ModalAddProduct>
                </Suspense>
            ) : null}
        </div>
    )
}

export default ManageProduct
