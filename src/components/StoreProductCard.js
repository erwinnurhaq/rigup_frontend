import React from 'react'
import { Button, IconButton } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { API_URL } from '../support/API_URL'
import Formatter from '../support/FormatterRupiah'

const StoreProductCard = ({product}) => {
    return (
        <div className='card'>
            <div className='top'>
                <img src={`${API_URL}${product.image}`} alt={product.name}/>
                <div className='text'>
                    <div className='productTitle'>{product.name}</div>
                    <div className='productBrand'>{product.brand}</div>
                    <div className='productPrice'>{Formatter.format(product.price)}</div>
                </div>
            </div>
            <div className='bottom'>
                <Button>
                    <div className="btnAddCard">Add to Cart</div>
                    <ShoppingCartIcon />
                </Button>
                <IconButton
                    // onClick={onFirstPageClick}
                    aria-label="Add to Wishlist"
                >
                    <FavoriteIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default StoreProductCard
