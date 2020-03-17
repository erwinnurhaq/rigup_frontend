import React, { useState, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, IconButton } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { API_URL } from '../support/API_URL'
import Formatter from '../support/FormatterRupiah'
import { addCart, editCart, addWishlist, deleteWishlist } from '../redux/actions'

import Loading from './Loading'
const ModalProductDetail = lazy(() => import('./ModalProductDetail'))


const StoreProductCard = (props) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const [showModalDetail, setShowModalDetail] = useState(false)

    props = useSelector(({ user, userCart, userWishlist }) => {
        return {
            user: user.user,
            userCart: userCart.cart,
            userWishlist: userWishlist.wishlist,
            ...props
        }
    })

    const onBtnAddCartClick = async () => {
        let id = props.product.productId || props.product.id
        if (!props.user) {
            props.setShowModalWarning(!props.showModalWarning)
        } else if (quantity < 1) {
            alert('Minimum purchase 1pcs')
        } else {
            let weight = 0
            if (props.userCart) {
                props.userCart.forEach(i => weight += (i.weight * i.quantity))
                if (weight >= 30000) {
                    alert('Over weight! Maximum courier weight 30kg. Please split to another transaction.')
                } else {
                    let find = props.userCart.filter(i => i.productId === id)
                    if (find.length === 0) {
                        await dispatch(addCart({ productId: id, quantity }))
                    } else {
                        await dispatch(editCart(find[0].id, find[0].quantity + quantity))
                    }
                    props.setShowModalSuccess(!props.showModalSuccess)
                    setShowModalDetail(false)
                }
            } else {
                await dispatch(addCart({ productId: id, quantity }))
                props.setShowModalSuccess(!props.showModalSuccess)
                setShowModalDetail(false)
            }
        }
    }

    const onBtnAddWishlistClick = async () => {
        let id = props.product.productId || props.product.id
        if (!props.user) {
            props.setShowModalWarning(!props.showModalWarning)
        } else {
            let find = props.userWishlist.filter(i => i.productId === id)
            if (find.length === 0) {
                await dispatch(addWishlist(id))
            } else {
                await dispatch(deleteWishlist(find[0].id))
            }
            props.setShowModalSuccess(!props.showModalSuccess)
            setShowModalDetail(false)
        }
    }

    const checkWishlistColor = () => {
        let id = props.product.productId || props.product.id
        if (props.userWishlist.filter(i => i.productId === id).length > 0) {
            return 'secondary'
        } else {
            return 'inherit'
        }
    }

    const renderModalProductDetail = () => showModalDetail ? (
        <Suspense fallback={<Loading />}>
            <ModalProductDetail
                open={showModalDetail}
                setOpen={setShowModalDetail}
                productId={props.product.productId || props.product.id}
                quantity={quantity}
                setQuantity={setQuantity}
                onBtnAddCartClick={onBtnAddCartClick}
                onBtnAddWishlistClick={onBtnAddWishlistClick}
                checkWishlistColor={checkWishlistColor}
            />
        </Suspense>
    ) : null

    const renderBottom = () => props.product.stock !== 0 ? (
        <div className='bottom'>
            <Button onClick={onBtnAddCartClick}>
                <div className="btnAddCard">Add to Cart</div>
                <ShoppingCartIcon />
            </Button>
            <IconButton
                onClick={onBtnAddWishlistClick}
                aria-label="Add to Wishlist"
            >
                <FavoriteIcon color={checkWishlistColor()} />
            </IconButton>
        </div>
    ) : (
            <div className='bottom'>
                <p style={{ color: 'red' }}>Out of Stock</p>
            </div>
        )

    return (
        <div className='productCardContainer'>
            <div className='top' onClick={() => props.product.stock === 0 ? null : setShowModalDetail(!showModalDetail)}>
                <img src={`${API_URL}${props.product.image}`} alt={props.product.name} />
                <div className='text'>
                    <div className='productTitle'>{props.product.name}</div>
                    <div className='productBrand'>{props.product.brand}</div>
                    <div className='productPrice'>{Formatter.format(props.product.price)}</div>
                </div>
            </div>
            {renderBottom()}
            {renderModalProductDetail()}
        </div>
    )
}

export default StoreProductCard
