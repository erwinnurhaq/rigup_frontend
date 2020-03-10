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
    selectCat,
    selectFilter, 
    getCategoriesSearchFilter,
    getCountProductList
} from '../redux/actions'

import Loading from './Loading'
import StoreProductCard from './StoreProductCard'
import Pagination from '../components/Pagination';

const ModalWarning = lazy(()=> import('./ModalWarning'))

const StoreBrowseProduct = () => {
    const dispatch = useDispatch()
    const {selectedCat, selectedChildCat, selectedFilter, searchFilter, mostParent, childOfMainParent} = useSelector(({ categories }) => categories)
    const {changeCategoryBox, changeBrowseProducts} = useSelector(({ changeStyle }) => changeStyle)
    const {productList, productListCount, productListByCat, productListByCatCount, error} = useSelector(({ products }) => products)
    
    const [showModalWarning, setShowModalWarning] = useState(false)
    const [showModalSuccess, setShowModalSuccess] = useState(false)

    const initialState = {
		page: 1,
		totalPage: 1,
		limit: 12,
		offset: 0
	};
    const [state, setState] = useState(initialState);
    const sortList = [
        {id: 1, label: 'Last Updated'},
        {id: 2, label: 'Name A to Z'},
        {id: 3, label: 'Name Z to A'},
        {id: 4, label: 'Price Low to High'},
        {id: 5, label: 'Price High to Low'}
    ]
    const [sort, setSort] = useState(1)
    const [search, setSearch] = useState('')

    // useEffect(()=>{
    //     if(selectedCat !== 0){
    //         dispatch(getProductByCategoryId(selectedCat, state.limit, state.offset))
    //     }
    // },[dispatch, selectedCat, state.limit, state.offset])
    
    useEffect(()=>{
        if(productListByCatCount){
            let id = selectedChildCat!==0? selectedChildCat : selectedCat
            dispatch(getCountProductByCategoryId(id))
            dispatch(getProductByCategoryId(id, state.limit, state.offset))
        }
    },[dispatch, state.limit, state.offset])

    useEffect(() => {
        if(productListByCatCount){
            setState((prev) => {
                return { ...prev, totalPage: Math.ceil(productListByCatCount / state.limit) };
            });
        }
    }, [productListByCatCount, state.limit]);

    useEffect(() => {
        if(productListCount){
            setState((prev) => {
                return { ...prev, totalPage: Math.ceil(productListCount / state.limit) };
            });
        }
    }, [productListCount, state.limit]);
    
    useEffect(()=>{
        if(productListCount){
            if(selectedFilter!==0){
                dispatch(getProductList(search, state.limit, state.offset, selectedFilter))
            } else {
                dispatch(getProductList(search, state.limit, state.offset))
            }
        }
    },[dispatch, state.limit, state.offset])

    const onSortChange = (e) => {
        setSort(e.target.value)
    }

    const onBtnSearchClick = async () => {
        setState(initialState)
        dispatch(selectCat(0))
        await dispatch(getCategoriesSearchFilter(search))
        await dispatch(getProductList(search, 12, 0))
    }

    const onBtnFilterAll = async () => {
        setState({...state, page: 1, offset: 0})
        if(childOfMainParent){
            dispatch(selectChildCat(0))
            await dispatch(getCountProductByCategoryId(selectedCat))
            await dispatch(getProductByCategoryId(selectedCat, 12, 0))
        } else if(searchFilter){
            dispatch(selectFilter(0))
            await dispatch(getCategoriesSearchFilter(search))
            await dispatch(getProductList(search, 12, 0))
        }
    }

    const onBtnFilterSearchListClick = async(id) => {
        setState({...state, page: 1, offset: 0})
        dispatch(selectCat(0))
        dispatch(selectFilter(id))
        await dispatch(getCountProductList(search, id))
        await dispatch(getProductList(search, 12, 0, id))
    }

    const onBtnFilterListClick = async(id) => {
        setState({...state, page: 1, offset: 0})
        dispatch(selectFilter(0))
        dispatch(selectChildCat(id))
        await dispatch(getCountProductByCategoryId(id))
        await dispatch(getProductByCategoryId(id, 12, 0))
    }

    const onKeyUp = e => {
        if (e.key === "Enter") {
            onBtnSearchClick()
        }
    }

    const renderListFilter = () => {
        if(searchFilter){
            return searchFilter.map(i=>(
                <Button
                    variant='text' key={i.categoryId}
                    style={selectedFilter===i.categoryId? {backgroundColor: 'darkviolet'}: null}
                    onClick={()=>onBtnFilterSearchListClick(i.categoryId)} 
                >
                    {i.category} ({i.count})
                </Button>))
        } else if(childOfMainParent){
            return childOfMainParent.map(i=> (
                <Button
                    variant='text' key={i.id} 
                    style={selectedChildCat === i.id? {backgroundColor: 'darkviolet'}: null}
                    onClick={()=>onBtnFilterListClick(i.id)} 
                >
                    {i.category}
                </Button>))
        } else {
            return <Loading/>
        }
    } 

    const renderTitleListProduct = () => {
        if(childOfMainParent && selectedChildCat!==0){
            return childOfMainParent.filter(i=> i.id===selectedChildCat)[0].category.toUpperCase()
        } else if(mostParent && selectedChildCat==0) {
            return mostParent.filter(i=> i.id === selectedCat)[0].category.toUpperCase()
        }
    }
    const renderListProduct = () =>{
        if(error){
            return <p style={{color: 'white', fontSize: '4.8rem'}}>No Product Found</p>
        } else if(productList) {
            return productList.map(product=>(
                <StoreProductCard 
                    key={product.id}
                    product={product} 
                    showModalSuccess={showModalSuccess}
                    setShowModalSuccess={setShowModalSuccess}
                    showModalWarning={showModalWarning}
                    setShowModalWarning={setShowModalWarning}
                />
            ))
        } else if(productListByCat){
            return productListByCat.map(product=>(
                <StoreProductCard 
                    key={product.id} 
                    product={product} 
                    showModalSuccess={showModalSuccess}
                    setShowModalSuccess={setShowModalSuccess}
                    showModalWarning={showModalWarning}
                    setShowModalWarning={setShowModalWarning}
                />
            ))
        } else {
            return <Loading />
        }
    }

    const renderModalWarning = () => showModalWarning ? (
        <Suspense fallback={<Loading/>}>
            <ModalWarning
                show={showModalWarning}
                setShow={setShowModalWarning}
                title='Warning'
            >You are not logged in, Please login first to continue.</ModalWarning>
        </Suspense>
    ) : null

    const renderModalSuccess = () => showModalSuccess ? (
        <Suspense fallback={<Loading/>}>
            <ModalWarning
                show={showModalSuccess}
                setShow={setShowModalSuccess}
                title='Success'
            >Product has been added to your cart!</ModalWarning>
        </Suspense>
    ) : null
    
    return (
        <div className={`browseProducts ${changeBrowseProducts ? '' : 'hide'}`}>
            <div className={`browseProductsWrapper ${changeCategoryBox ? 'change' : ''}`}>
                <div className="searchContainer">
                    <div className='searchWrapper'>
                        <TextField
                            margin="dense" label="Search Product" id="search" type='text'
                            value={search}
                            onChange={e=> setSearch(e.target.value)}
                            onKeyUp={onKeyUp}
                            fullWidth required
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={onBtnSearchClick}
                                        onMouseDown={e => e.preventDefault()}
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
                            onChange={onSortChange}
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
                                style={selectedFilter===0 && selectedChildCat===0 ? {backgroundColor: 'darkviolet'}: null}
                            >
                                ALL {productListCount ? `(${productListCount})`:''}
                            </Button>
                            {renderListFilter()}
                        </div>
                    </div>
                    <div className="productsContainer">
                        <h3>{selectedCat!==0 ? renderTitleListProduct() : null}</h3>
                        <div className="productListByCat">
                            {renderListProduct()}
                        </div>
                    </div>
                </div>
                {renderModalWarning()}
                {renderModalSuccess()}
            </div>
        </div>
    )
}

export default StoreBrowseProduct
