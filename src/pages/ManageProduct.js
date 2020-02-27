import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, TableRow, TableCell, Table, TableHead, TableBody, TableFooter, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import {
    selectCat,
    getMostParent,
    getProductDetailById,
    getProductByCategoryId,
    getCountProductByCategoryId,
    deleteProductById
} from '../redux/actions'

import Loading from '../components/Loading'
import TableHeadRow from '../components/TableHeadRow'
import Pagination from '../components/Pagination'
const ModalDefault = lazy(() => import('../components/ModalDefault'))
const ModalConfirm = lazy(() => import('../components/ModalConfirm'))
const FormAddProduct = lazy(() => import('../components/forms/FormAddProduct'))
const FormEditProduct = lazy(() => import('../components/forms/FormEditProduct'))

const ManageProduct = () => {

    const dispatch = useDispatch()
    const categories = useSelector(({ categories }) => categories)
    const products = useSelector(({ products }) => products)

    const initialState = {
        page: 1,
        totalPage: 1,
        limit: 10,
        offset: 0
    }
    const [state, setState] = useState(initialState)
    const [selectedProduct, setSelectedProduct] = useState(0)
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalConfirm, setShowModalConfirm] = useState(false)

    useEffect(() => { dispatch(getMostParent()) }, [dispatch])

    useEffect(() => {
        dispatch(getCountProductByCategoryId(categories.selectedCat))
    }, [dispatch, categories.selectedCat])

    useEffect(() => {
        dispatch(getProductByCategoryId(categories.selectedCat, state.limit, state.offset))
    }, [dispatch, categories.selectedCat, state.limit, state.offset])

    useEffect(() => {
        setState(prev => {
            return { ...prev, totalPage: Math.ceil(products.productListByCatCount / state.limit) }
        })
    }, [products.productListByCatCount, state.limit])

    const onCatTabClick = async categoryId => {
        setState(initialState)
        await dispatch(selectCat(categoryId))
    }

    const onAddProductClick = () => {
        setShowModalAdd(!showModalAdd)
    }

    const onDetailsClick = async productId => {
        await dispatch(getProductDetailById(productId))
        setShowModalEdit(!showModalEdit)
    }

    const onDeleteClick = async productId => {
        await dispatch(deleteProductById(productId))
        setShowModalConfirm(!showModalConfirm)
        await dispatch(getCountProductByCategoryId(categories.selectedCat))
        await dispatch(getProductByCategoryId(categories.selectedCat, state.limit, state.offset))
    }

    const deleteConfirmation = productId => {
        setSelectedProduct(productId)
        setShowModalConfirm(!showModalConfirm)
    }

    const onSetLimit = e => {
        setState({ ...state, limit: e.target.value })
    }

    const onFirstPageClick = () => {
        setState({ ...state, page: 1, offset: 0 })
    }

    const onNextPageClick = () => {
        setState({
            ...state,
            page: state.page += 1,
            offset: state.offset += state.limit
        })
    }

    const onPrevPageClick = () => {
        setState({
            ...state,
            page: state.page -= 1,
            offset: state.offset -= state.limit
        })
    }

    const onLastPageClick = () => {
        setState({
            ...state,
            page: state.totalPage,
            offset: (state.totalPage - 1) * state.limit
        })
    }

    const renderCatTab = () => !categories.mostParent ? (<Loading />) : (
        categories.mostParent.map(i => (
            <li key={i.id} style={{
                padding: '0 15px', listStyle: 'none', cursor: 'pointer',
                borderBottom: `${categories.selectedCat === i.id ? '1px solid darkviolet' : 'none'}`,
                fontWeight: `${categories.selectedCat === i.id ? 'bold' : 'normal'}`
            }} onClick={() => onCatTabClick(i.id)}
            >{i.category}</li>
        ))
    )

    //table material
    const columns = [
        { id: 'id', label: '#', minWidth: 50, align: 'center' },
        { id: 'categories', label: 'Categories', minWidth: 150, align: 'center' },
        { id: 'brand', label: 'Brand', minWidth: 100, align: 'center' },
        { id: 'name', label: 'Product Name', minWidth: 150, align: 'center' },
        { id: 'price', label: 'Price', minWidth: 100, align: 'center' },
        { id: 'stock', label: 'Stock', minWidth: 50, align: 'center' },
        { id: 'options', label: 'Options', minWidth: 100, align: 'center' }
    ];
    //end table material

    const renderProductList = () => {
        if (products.loading) {
            return new Array(state.limit).fill(0).map((i, index) => (
                <TableRow key={index}>
                    {new Array(7).fill(0).map((j, index) => (
                        <TableCell key={index} style={{ position: 'relative', height: '50px' }}>
                            <Loading type='bar' />
                        </TableCell>
                    ))}
                </TableRow>
            ))
        } else if (products && products.productListByCat) {
            return products.productListByCat.map((i, index) => (
                <TableRow key={index}>
                    <TableCell>{state.offset + (index + 1)}</TableCell>
                    <TableCell>{i.categories.map(c => c.category).join(' > ')}</TableCell>
                    <TableCell>{i.brand}</TableCell>
                    <TableCell>{i.name}</TableCell>
                    {/* <TableCell dangerouslySetInnerHTML={{ __html: i.description }} /> */}
                    <TableCell>{i.price}</TableCell>
                    <TableCell>{i.stock}</TableCell>
                    <TableCell>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton aria-label="Detail Edit"
                                onClick={() => onDetailsClick(i.id)}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="Delete"
                                onClick={() => deleteConfirmation(i.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </TableCell>
                </TableRow>
            ))
        }
    }

    const renderPagination = () => (
        <TableRow>
            <TableCell colSpan={7} align='right'>
                <Pagination
                    totalProduct={products.productListByCatCount}
                    limit={state.limit}
                    page={state.page}
                    totalPage={state.totalPage}
                    onSetLimit={onSetLimit}
                    onFirstPageClick={onFirstPageClick}
                    onPrevPageClick={onPrevPageClick}
                    onNextPageClick={onNextPageClick}
                    onLastPageClick={onLastPageClick}
                />
            </TableCell>
        </TableRow>
    )

    const renderFormAdd = () => showModalAdd ? (
        <Suspense fallback={<Loading />}>
            <ModalDefault
                show={showModalAdd}
                setShow={setShowModalAdd}
                title='Add New Product'
            >
                <Suspense fallback={<Loading />}>
                    <FormAddProduct
                        limit={state.limit}
                        offset={state.offset}
                        mostParent={categories.mostParent}
                        show={showModalAdd}
                        setShow={setShowModalAdd}
                    />
                </Suspense>
            </ModalDefault>
        </Suspense>
    ) : null

    const renderFormEdit = () => showModalEdit ? (
        <Suspense fallback={<Loading />}>
            <ModalDefault
                show={showModalEdit}
                setShow={setShowModalEdit}
                title='Detail Product'
            >
                <Suspense fallback={<Loading />}>
                    <FormEditProduct
                        limit={state.limit}
                        offset={state.offset}
                        selectedProduct={state.selectedProduct}
                        mostParent={categories.mostParent}
                        show={showModalEdit}
                        setShow={setShowModalEdit}
                    />
                </Suspense>
            </ModalDefault>
        </Suspense>
    ) : null

    const renderModalConfim = () => (
        <Suspense fallback={<Loading />}>
            <ModalConfirm
                show={showModalConfirm}
                setShow={setShowModalConfirm}
                title='Are you sure?'
                cb={() => onDeleteClick(selectedProduct)}
            />
        </Suspense>
    )

    return (
        <div className="manageProductContainer">
            <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', paddingBottom: '25px' }}>
                    <ul style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {renderCatTab()}
                    </ul>
                    <Button onClick={onAddProductClick} variant='outlined'>
                        <p style={{ padding: '0 5px' }}>ADD PRODUCT</p>
                        <AddCircleOutlineIcon />
                    </Button>
                </div>
                <div>
                    <Table style={{ width: '80%', margin: 'auto' }}>
                        <TableHead>
                            <TableHeadRow columns={columns} />
                        </TableHead>
                        <TableBody>
                            {renderProductList()}
                        </TableBody>
                        <TableFooter>
                            {renderPagination()}
                        </TableFooter>
                    </Table>
                </div>
            </div>
            {renderFormAdd()}
            {renderFormEdit()}
            {renderModalConfim()}
        </div>
    )
}

export default ManageProduct
