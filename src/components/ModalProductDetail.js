import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, IconButton, Typography, TextField } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { API_URL } from '../support/API_URL';

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import formatter from '../support/FormatterRupiah'
import Loading from './Loading'
import { getProductDetailById } from '../redux/actions';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const ModalProductDetail = (props) => {
    const { open, setOpen, productId, quantity, setQuantity, onBtnAddCartClick, onBtnAddWishlistClick, checkWishlistColor } = props
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('productDetailId: ', productId)
        dispatch(getProductDetailById(productId))
    }, [dispatch])

    const product = useSelector(({ productDetail }) => productDetail)
    const { user } = useSelector(({ user }) => user)
    const { wishlist } = useSelector(({ userWishlist }) => userWishlist)
    const [selectedImage, setSelectedImage] = useState(0)

    const handleClose = () => {
        setOpen(false);
    };

    const wishListText = () => {
        if (user && wishlist && wishlist.filter(i => i.productId === productId).length > 0) {
            return 'Remove from Wishlist'
        } else {
            return 'Add to Wishlist'
        }
    }

    const renderImageList = () => product.images.map((i, index) => (
        <div key={i.id} onClick={() => setSelectedImage(index)}>
            <img src={`${API_URL}${i.image}`} alt='productImage' />
        </div>
    ))

    if (product) {
        return (
            <div>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth='lg'>
                    <DialogTitle id="productDetailTitle" onClose={handleClose}>
                        PRODUCT DETAIL
                    </DialogTitle>
                    <div className='modalProductDetailContent'>
                        <div className='detailTopContainer'>
                            <div className='imageContainer'>
                                <div className='selectedImageContainer'>
                                    {product.images ? <img src={`${API_URL}${product.images[selectedImage].image}`} alt='productImage' /> : <Loading type="bar" />}
                                </div>
                                <div className='listImageContainer'>
                                    {product.images ? renderImageList() : <Loading type="bar" />}
                                </div>
                            </div>
                            <div className='dataContainer'>
                                <h2>{product.brand}</h2>
                                <h1>{product.name}</h1>
                                <div className='additional'>
                                    <div>
                                        <LocalOfferIcon />
                                        <p>Competitive Price</p>
                                    </div>
                                    <div>
                                        <ThumbUpIcon />
                                        <p>Original Product</p>
                                    </div>
                                </div>
                                <div className="dataWrapper">
                                    <div className="dataLabel">PRICE</div>
                                    <h3 className="dataPrice">{formatter.format(product.price)}</h3>
                                </div>
                                <div className="dataWrapper">
                                    <div className="dataLabel">QUANTITY</div>
                                    <div className="dataQuantity">
                                        <p>Limited Stock! {product.stock} Available</p>
                                        <div>
                                            <TextField
                                                margin="dense"
                                                label="qty."
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            />
                                            <p>Minimum Purchase 1pcs.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="dataWrapper">
                                    <div className="dataLabel">PRODUCT INFO</div>
                                    <div className="dataInfo">
                                        <div>
                                            <p>Weight (Gr)</p>
                                            <h3>{product.weight}</h3>
                                        </div>
                                        <div>
                                            <p>Wattage (W)</p>
                                            <h3>{product.wattage}</h3>
                                        </div>
                                        <div>
                                            <p>Condition</p>
                                            <h3>New</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='detailBottomContainer'>
                            <h3>DESCRIPTION</h3>
                            <p>{ReactHtmlParser(product.description)}</p>
                        </div>
                    </div>
                    <DialogActions className='btnDetailContainer'>
                        <Button className="btnAddToWishlist" onClick={onBtnAddWishlistClick}>
                            <div>{wishListText()}</div>
                            <FavoriteIcon color={checkWishlistColor()} />
                        </Button>
                        <Button className="btnAddToCart" onClick={onBtnAddCartClick}>
                            <div>Add to Cart</div>
                            <ShoppingCartIcon />
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    } else {
        return (
            <div className='modalProductDetailContainer'>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth='xl'>
                    <DialogTitle id="productDetailTitle" onClose={handleClose}>
                        <Loading />
                    </DialogTitle>
                    <DialogContent className='detailContent' dividers>
                        <Loading />
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default ModalProductDetail
