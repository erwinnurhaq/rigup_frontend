import React, { useEffect } from 'react'
import { Button } from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { useSelector, useDispatch } from 'react-redux'

import {
    setChangeStyle,
    selectFilter,
    selectCat,
    selectChildCat,
    setSearch,
    productInitial
} from '../redux/actions'

import StoreCarousel from '../components/StoreCarousel'
import StoreCategoryBox from '../components/StoreCategoryBox'
import StoreBrowseProduct from '../components/StoreBrowseProduct'
import StoreBottomContentA from '../components/StoreBottomContentA'

const Store = () => {
    const dispatch = useDispatch()
    const changeBrowseProducts = useSelector(({ changeStyle }) => changeStyle.changeBrowseProducts)

    const listLogo = [
        'cubegaming.png', 'asrock.png', 'asus.png', 'avexir.png', 'biostar.png', 'galax.png', 'gskill.png',
        'kingston.png', 'klevv.png', 'logitech.png', 'samsung.png', 'sandisk.png', 'seasonic.png', 'zotac.png'
    ]

    const onBrowseProductsClick = () => {
        if (changeBrowseProducts === false) {
            dispatch(setChangeStyle('changeBrowseProducts', true))
            window.scrollTo(0, 0.725 * window.innerHeight)
            dispatch(selectCat(0))
            dispatch(selectFilter(0))
            dispatch(selectChildCat(0))
            dispatch(setSearch(''))
        } else {
            dispatch(setChangeStyle('changeBrowseProducts', false))
            window.scrollTo(0, 0)
            dispatch(selectCat(null))
            dispatch(selectFilter(null))
            dispatch(selectChildCat(null))
            dispatch(productInitial())
            dispatch(setSearch(''))
        }
    }

    useEffect(() => {
        document.title = 'Store - RIGUP!'
    }, [])

    return (
        <div className='storeContainer'>
            <StoreCarousel />
            <StoreCategoryBox />
            <StoreBrowseProduct />
            <Button className='btnBrowseProducts' onClick={onBrowseProductsClick} >
                <div style={{ display: 'flex' }}>
                    <p>{changeBrowseProducts ? 'HIDE BROWSE PRODUCTS' : 'BROWSE PRODUCTS'}</p>
                    {changeBrowseProducts ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </div>
            </Button>
            <div className='sectionBottomA'>
                <StoreBottomContentA
                    image='LOWPRICE.png'
                    title='Low Price'
                    text='Competitive product price set compared to other shop.'
                />
                <StoreBottomContentA
                    image='SECURE.png'
                    title='Secure'
                    text='Your transaction is secured, with open customer call center available.'
                />
                <StoreBottomContentA
                    image='TRUSTED.png'
                    title='Trusted'
                    text='Years in tech bussiness, pokoknya percaya dah.'
                />
            </div>
            <div className='sectionBottomB'>
                <p>BRAND PARTNERS:</p>
                <div className="logo">
                    {listLogo.map(logo => (
                        <img src={require(`../img/brands/${logo}`)} alt={logo} key={logo} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Store
