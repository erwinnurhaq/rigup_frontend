import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField, Button, InputAdornment, IconButton, Select, MenuItem } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import {
    getChildOfMainParent,
    getProductByCategoryId,
    getCountProductByCategoryId,
    selectChildCat,
    getProductList,
    selectFilter,
    getCategoriesSearchFilter,
    getCountProductList,
    setSearch
} from '../redux/actions'

import Loading from './Loading'
import StoreProductCard from './StoreProductCard'
import Pagination from '../components/Pagination';
import ModalDefault from './ModalDefault'

const ModalWarning = lazy(() => import('./ModalWarning'))

const StoreBrowseProduct = () => {

    const dispatch = useDispatch()
    const { selectedCat, selectedChildCat, selectedFilter, searchFilter, childOfMainParent } = useSelector(({ categories }) => categories)
    const { changeCategoryBox, changeBrowseProducts } = useSelector(({ changeStyle }) => changeStyle)
    const { productList, productListCount, productListByCat, productListByCatCount, error } = useSelector(({ products }) => products)
    const userCartLoading = useSelector(({ userCart }) => userCart.loading)
    const userWishlistLoading = useSelector(({ userWishlist }) => userWishlist.loading)
    const search = useSelector(({ search }) => search)

    const [showModalWarning, setShowModalWarning] = useState(false)

    const initialState = {
        page: 1,
        totalPage: 1,
        limit: 12,
        offset: 0
    };
    const [state, setState] = useState(initialState);
    const sortList = [
        { id: 1, label: 'Last Updated' },
        { id: 2, label: 'Name A to Z' },
        { id: 3, label: 'Name Z to A' },
        { id: 4, label: 'Price Low to High' },
        { id: 5, label: 'Price High to Low' }
    ]
    const [sort, setSort] = useState(1)
    const [activeCat, setActiveCat] = useState(null)

    //----------------------------------------USE EFFECT---------------------------------------//

    const getProductFunction = async () => {
        if (selectedCat !== null) {
            if (search.length === 0 && activeCat !== selectedCat) {
                setActiveCat(selectedCat)
                setState(initialState)
                await dispatch(getChildOfMainParent(selectedCat))
                await dispatch(getCountProductByCategoryId(selectedCat))
                await dispatch(getProductByCategoryId(selectedCat, sort, 12, 0))
            } else if (search.length === 0 && activeCat === selectedCat) {
                let id = selectedChildCat !== 0 ? selectedChildCat : selectedCat
                await dispatch(getCountProductByCategoryId(id))
                await dispatch(getProductByCategoryId(id, sort, state.limit, state.offset))
            } else if (search.length > 0 && selectedFilter > 0) {
                dispatch(getProductList(search, sort, state.limit, state.offset, selectedFilter))
            } else {
                dispatch(getProductList(search, sort, state.limit, state.offset, selectedCat))
            }
        }
    }

    const setTotalPageFunction = () => {
        let count = productListByCatCount || productListCount
        setState({ ...state, totalPage: Math.ceil(count / state.limit) })
    }

    useEffect(() => {
        getProductFunction()
    }, [dispatch, sort, state.limit, state.offset, selectedChildCat, selectedCat, selectedFilter])

    useEffect(() => {
        setTotalPageFunction()
    }, [productListByCatCount, productListCount, productListCount, state.limit]);

    //----------------------------------------USE EFFECT---------------------------------------//

    const onBtnSearchClick = async () => {
        setState({ ...state, page: 1, offset: 0 })
        await dispatch(getCategoriesSearchFilter(search, selectedCat))
        await dispatch(getProductList(search, sort, 12, 0, selectedCat))
    }

    const onBtnFilterAll = async () => {
        setState({ ...state, page: 1, offset: 0 })
        dispatch(selectFilter(0))
        dispatch(selectChildCat(0))
        if (search.length > 0) {
            await dispatch(getCountProductList(search, selectedCat))
        }
    }

    const onBtnFilterSearchListClick = async (id) => {
        setState({ ...state, page: 1, offset: 0 })
        dispatch(selectFilter(id))
        await dispatch(getCountProductList(search, id))
    }

    const onBtnFilterListClick = (id) => {
        setState({ ...state, page: 1, offset: 0 })
        dispatch(selectFilter(0))
        dispatch(selectChildCat(id))
        dispatch(setSearch(''))
    }

    const onKeyUp = e => {
        if (e.key === "Enter" && search.length > 0) {
            onBtnSearchClick()
        }
    }

    const renderListFilter = () => {
        if (searchFilter) {
            return searchFilter.map(i => (
                <Button
                    variant='text' key={i.categoryId}
                    style={selectedFilter === i.categoryId ? { backgroundColor: 'darkviolet' } : null}
                    onClick={() => onBtnFilterSearchListClick(i.categoryId)}
                >
                    {i.category} ({i.count})
                </Button>))
        } else if (childOfMainParent) {
            return childOfMainParent.map(i => (
                <Button
                    variant='text' key={i.id}
                    style={selectedChildCat === i.id ? { backgroundColor: 'darkviolet' } : null}
                    onClick={() => onBtnFilterListClick(i.id)}
                >
                    {i.category} ({i.count})
                </Button>))
        } else {
            return <Loading />
        }
    }

    const renderTitleListProduct = () => {
        if (childOfMainParent && selectedChildCat > 0) {
            return childOfMainParent.filter(i => i.id === selectedChildCat)[0].category.toUpperCase()
        } else {
            return 'ALL'
        }
    }
    const renderListProduct = () => {
        if (error) {
            return <p style={{ color: 'white', fontSize: '4.8rem' }}>No Product Found</p>
        } else if (productList) {
            return productList.map(product => (
                <StoreProductCard
                    key={product.id}
                    product={product}
                    showModalWarning={showModalWarning}
                    setShowModalWarning={setShowModalWarning}
                />
            ))
        } else if (productListByCat) {
            return productListByCat.map(product => (
                <StoreProductCard
                    key={product.id}
                    product={product}
                    showModalWarning={showModalWarning}
                    setShowModalWarning={setShowModalWarning}
                />
            ))
        } else {
            return <Loading />
        }
    }

    const renderModalWarning = () => showModalWarning ? (
        <Suspense fallback={<Loading />}>
            <ModalWarning
                show={showModalWarning}
                setShow={setShowModalWarning}
                title='Warning'
            >You are not logged in, Please login first to continue.</ModalWarning>
        </Suspense>
    ) : null

    const renderModalLoading = () => (
        <ModalDefault
            show={userCartLoading || userWishlistLoading}
            title='Please Wait'
            size='xs'
        >
            <Loading />
        </ModalDefault>
    )

    return (
        <div className={`browseProducts ${changeBrowseProducts ? '' : 'hide'}`} style={{ marginTop: `${changeCategoryBox ? '8vh' : '0'}` }}>
            <div className='browseProductsWrapper'>
                <div className="searchContainer">
                    <div className='searchWrapper'>
                        <TextField
                            margin="dense" label="Search Product" id="search" type='text'
                            value={search}
                            onChange={e => dispatch(setSearch(e.target.value))}
                            onKeyUp={onKeyUp}
                            fullWidth required
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={onBtnSearchClick}
                                        onMouseDown={e => e.preventDefault()}
                                        disabled={search.length === 0}
                                    >
                                        <SearchIcon style={{ color: 'whitesmoke' }} />
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                    </div>
                    <div className="sortWrapper">
                        <Select
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                        >
                            {sortList.map(i => (
                                <MenuItem key={i.id} value={i.id} >{i.label}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="browseProductPagination">
                        <Pagination
                            totalProduct={productListByCatCount || productListCount}
                            rangeLimit={[6, 12, 18, 24, 36, 60]}
                            state={state}
                            setState={setState}
                            color='white'
                        />
                    </div>
                </div>
                <div className="contentContainer">
                    <div className="filterContainer">
                        <h3>FILTER:</h3>
                        <div className="childOfMainParent">
                            <Button
                                variant='text' onClick={onBtnFilterAll}
                                style={selectedFilter === 0 && selectedChildCat === 0 ? { backgroundColor: 'darkviolet' } : null}
                            >
                                ALL
                            </Button>
                            {renderListFilter()}
                        </div>
                    </div>
                    <div className="productsContainer">
                        <h3>{renderTitleListProduct()}</h3>
                        <div className="productListByCat">
                            {renderListProduct()}
                        </div>
                    </div>
                </div>
                {renderModalWarning()}
                {renderModalLoading()}
            </div>
        </div>
    )
}

export default StoreBrowseProduct
