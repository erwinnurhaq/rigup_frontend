import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { Case, Motherboard2, Processor, Storage, Memory, VGA, PSU, Monitor, Accessories } from '../components/IconSVG'
import { API_URL } from '../support/API_URL'

import formatter from '../support/FormatterRupiah'
import Loading from '../components/Loading'
import ModalDefault from '../components/ModalDefault'
import { getMostParent, selectCat, getProductByCategoryId, setChangeStyle, addBuild, deleteBuild, addCart, getUserBuild } from '../redux/actions'

const Build = () => {

    const dispatch = useDispatch()
    const { mostParent, selectedCat } = useSelector(({ categories }) => categories)
    const { user } = useSelector(({ user }) => user)
    const cart = useSelector(({ userCart }) => userCart.cart)
    const build = useSelector(({ userBuild }) => userBuild.build)
    const userBuildLoading = useSelector(({ userBuild }) => userBuild.loading)
    const userCartLoading = useSelector(({ userCart }) => userCart.loading)
    const { productListByCat } = useSelector(({ products }) => products)
    const icon = [
        <Case height='100%' width='100%' color='white' />,
        <Processor height='100%' width='100%' color='white' />,
        <Motherboard2 height='100%' width='100%' color='white' />,
        <Memory height='100%' width='100%' color='white' />,
        <VGA height='100%' width='100%' color='white' />,
        <Storage height='100%' width='100%' color='white' />,
        <PSU height='100%' width='100%' color='white' />,
        <Monitor height='100%' width='100%' color='white' />,
        <Accessories height='100%' width='100%' color='white' />
    ]

    const onCatClick = (id) => dispatch(selectCat(id))
    const onRemoveItemBuildClick = async (id) => await dispatch(deleteBuild(id))
    const onSelectionClick = async (i) => {
        let existItem = build.findIndex(j => j.productId === i.id)
        let existCategory = build.findIndex(j => j.mainCategoryId === i.categories[0].categoryId)
        if (existItem >= 0) {
            await dispatch(deleteBuild(build[existItem].id))
        } else if (existCategory >= 0) {
            if (i.categories[0].categoryId === 6 || i.categories[0].categoryId === 9) {
                await dispatch(addBuild({ productId: i.id, quantity: 1 }))
            } else {
                await dispatch(deleteBuild(build[existCategory].id))
                await dispatch(addBuild({ productId: i.id, quantity: 1 }))
            }
        } else {
            await dispatch(addBuild({ productId: i.id, quantity: 1 }))
        }
    }

    const onBtnAddCartClick = async () => {
        let weight = 0
        build.forEach(i => weight += (i.weight * i.quantity))
        if (cart && cart.length > 0) {
            alert('Please clear existing cart first')
        } else if (weight > 30000) {
            alert('Over weight! Maximum courier weight 30kg. Please split into another transaction.')
        } else {
            await dispatch(addCart(build.map(i => [i.productId, i.quantity])))
            await dispatch(getUserBuild())
        }
    }

    const renderIllustMainImg = () => {
        let exist = build.filter(j => j.mainCategoryId === 1)
        if (exist.length > 0) {
            return (
                <div className="illustImgWrapper">
                    <img src={`${API_URL}${exist[0].image}`} />
                </div>
            )
        } else {
            return (
                <div className="illustImgWrapper">
                    <h1>Pick a Case</h1>
                </div>
            )
        }
    }

    const renderIllustList = () => mostParent ? mostParent.map((i, idx) => {
        let exist = build.filter(j => j.mainCategoryId === i.id)
        if (exist.length > 0) {
            return (
                <div
                    key={idx}
                    className="illustList"
                    style={{ transform: `rotate(${idx * 20 - 80}deg)`, transformOrigin: 'left' }}
                >
                    <div className="imgIllustList">
                        <img src={`${API_URL}${exist[0].image}`} />
                    </div>
                </div>
            )
        } else {
            return (
                <div
                    key={idx}
                    className="illustList"
                    style={{ transform: `rotate(${idx * 20 - 80}deg)`, transformOrigin: 'left' }}
                >
                    <div className="imgIllustList" />
                </div>
            )
        }
    }) : <Loading />

    const renderSummaryProductList = (id) => {
        if (build.length > 0) {
            return build.filter(j => j.mainCategoryId === id).map(k => (
                <div className="summaryProductList" key={k.id}>
                    <div className="summaryRemoveItem"
                        onClick={() => onRemoveItemBuildClick(k.id)}
                    >X</div>
                    <div className="summaryProductName">
                        - {k.name}
                    </div>
                    <div className="summaryProductPrice">
                        {formatter.format(k.price)}
                    </div>
                </div>
            ))
        }
    }

    const renderIllustSummary = () => {
        if (mostParent && build.length > 0) {
            return mostParent.map(i => (
                <div key={i.id} className="summarySection">
                    <div className="summarySectionLabel">
                        {i.category}
                    </div>
                    {renderSummaryProductList(i.id)}
                </div>
            ))
        } else {
            return (
                <div className="illustSummaryWrapper">
                    <h1>{!user ? 'Please Login First' : ''}</h1>
                </div>
            )
        }
    }

    const renderSummaryPrice = () => {
        let count = 0;
        build.forEach(i => {
            count += i.price
        });
        return formatter.format(count)
    }

    const renderIllustAction = () => build.length > 0 ? (
        <div className="illustActionContainer">
            <Button onClick={onBtnAddCartClick}>Add Cart</Button>
        </div>
    ) : null

    const renderSelection = () => productListByCat ? productListByCat.map(i => {
        return (
            <div
                key={i.id}
                className={`productList ${build.filter(j => j.productId === i.id).length > 0 ? 'active' : ''}`}
                onClick={i.stock > 0 ? () => onSelectionClick(i) : null}
            >
                <div className="imgContainer">
                    <img src={`${API_URL}${i.image}`} alt={`${i.id}_${i.brand}`} />
                </div>
                <div className="product">
                    <p className="productName">{i.name}</p>
                    <p className="productBrand">{i.brand}</p>
                </div>
                <div className="price">{i.stock > 0 ? formatter.format(i.price) : 'Out of Stock'}</div>
            </div>
        )
    }) : <Loading />

    const renderCategory = () => mostParent ? mostParent.map(cat => (
        <div className={`categoryList ${selectedCat === cat.id ? 'active' : ''}`}
            key={cat.id} onClick={() => onCatClick(cat.id)}
        >
            <p>{cat.category}</p>
            <div className='svgContainer'>
                {icon[cat.id - 1]}
            </div>
        </div>
    )) : <Loading />

    const renderModalLoading = () => (
        <ModalDefault
            show={userBuildLoading || userCartLoading}
            title='Please Wait'
            size='xs'
        >
            <Loading />
        </ModalDefault>
    )

    //fetch main category list (case, processor, etc)
    //set selected category to 1 on first render
    //and will set selected category to none and browse product element hide on leaving build.js page
    useEffect(() => {
        dispatch(getMostParent())
        dispatch(selectCat(1))
        return () => {
            dispatch(selectCat(0))
            dispatch(setChangeStyle('changeBrowseProducts', false))
        }
    }, [dispatch])

    //fetch product list by category, will re-fetch when selected category change
    useEffect(() => {
        if (selectedCat !== 0) {
            dispatch(getProductByCategoryId(selectedCat, 8))
        }
    }, [dispatch, selectedCat])

    return (
        <div className="buildContainer">
            <div className="buildWrapper">
                <div className="illustrationSection">
                    <div className="illustImgCase">
                        {renderIllustMainImg()}
                    </div>
                    <div className="illustMain">
                        {renderIllustList()}
                    </div>
                    <div className="illustSummary">
                        <div className="illustSummaryWrapper">
                            {renderIllustSummary()}
                            <div className="summaryPrice">
                                {build.length > 0 ? `Total Price: ${renderSummaryPrice()}` : `Let's start build your RIG!`}
                            </div>
                            {renderIllustAction()}
                        </div>
                    </div>
                </div>
                <div className="selectionSection">
                    <div className="selectionWrapper">
                        {renderSelection()}
                    </div>
                </div>
                <div className="categorySection">
                    {renderCategory()}
                </div>
            </div>
            {renderModalLoading()}
        </div>
    )
}

export default Build
