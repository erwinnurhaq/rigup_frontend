import React, {useState, lazy, Suspense} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { Button, IconButton } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { API_URL } from '../support/API_URL'
import Formatter from '../support/FormatterRupiah'
import { addCart, editCart } from '../redux/actions/UserCartAction'

import Loading from './Loading'
const ModalProductDetail = lazy(()=> import('./ModalProductDetail'))


const StoreProductCard = (props) => {
    const {product, showModalWarning, setShowModalWarning, showModalSuccess, setShowModalSuccess} = props
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const [showModalDetail, setShowModalDetail] = useState(false)
    const user = useSelector(({user})=>user.user)
    const userCart = useSelector(({userCart})=>userCart.cart)
    
    const onBtnAddCartClick = async() => {
        if(!user){
            setShowModalWarning(!showModalWarning)
        } else if(quantity<1){
            alert('Minimum purchase 1pcs')
        } else {
            let weight = 0
            if(userCart){
                userCart.forEach(i=> weight+=(i.weight*i.quantity))
                if(weight>=30000){
                    alert('Over weight! Maximum courier weight 30kg. Please split to another transaction.')
                } else {
                    let find = userCart.filter(i=> i.productId === product.id)
                    if(find.length===0){
                        await dispatch(addCart({productId: product.id, quantity}))
                    } else {
                        await dispatch(editCart(find[0].id, find[0].quantity+quantity))
                    }
                    setShowModalSuccess(!showModalSuccess)
                }
            } else {
                await dispatch(addCart({productId: product.id, quantity}))
                setShowModalSuccess(!showModalSuccess)
            }
        }
    }
    
    const onBtnAddWishlistClick =() => {
        if(!user){
            setShowModalWarning(!showModalWarning)
        }
    }

    const renderModalProductDetail = () => showModalDetail ? (
        <Suspense fallback={<Loading/>}>
            <ModalProductDetail
                open={showModalDetail}
                setOpen={setShowModalDetail}
                productId={product.id}
                quantity={quantity}
                setQuantity={setQuantity}
                onBtnAddCartClick={onBtnAddCartClick}
            />
        </Suspense>
    ): null

    return (
        <div className='card'>
            <div className='top' onClick={()=>setShowModalDetail(!showModalDetail)}>
                <img src={`${API_URL}${product.image}`} alt={product.name}/>
                <div className='text'>
                    <div className='productTitle'>{product.name}</div>
                    <div className='productBrand'>{product.brand}</div>
                    <div className='productPrice'>{Formatter.format(product.price)}</div>
                </div>
            </div>
            <div className='bottom'>
                <Button onClick={onBtnAddCartClick}>
                    <div className="btnAddCard">Add to Cart</div>
                    <ShoppingCartIcon />
                </Button>
                <IconButton
                    onClick={onBtnAddWishlistClick}
                    aria-label="Add to Wishlist"
                >
                    <FavoriteIcon />
                </IconButton>
            </div>
            {renderModalProductDetail()}
        </div>
    )
}

export default StoreProductCard
