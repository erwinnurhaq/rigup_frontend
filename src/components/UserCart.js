import React, { useState, useEffect, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { API_URL } from '../support/API_URL';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    DialogActions
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import TableHeadRow from '../components/TableHeadRow'
import Loading from '../components/Loading'
import formatter from '../support/FormatterRupiah'
import {
    emptyCart,
    editCart,
    deleteCart,
    fetchCityList,
    fetchCourier,
    selectCourier,
    emptyCourier,
    checkOut,
    selectTransaction,
    setImageReceipt,
    setImageReceiptError,
    uploadReceipt
} from '../redux/actions'

const ModalWarning = lazy(() => import('./ModalWarning'))
const ModalConfirm = lazy(() => import('./ModalConfirm'))
const ModalDefault = lazy(() => import('./ModalDefault'))
const ModalTransactionSuccess = lazy(() => import('./ModalTransactionSuccess'))

const UserCart = (props) => {
    const dispatch = useDispatch()
    const userCart = useSelector(({ userCart }) => userCart.cart)
    const user = useSelector(({ user }) => user.user)
    const cityList = useSelector(({ formRegister }) => formRegister.cityList)
    const { courierList, selectedCourier } = useSelector(({ courier }) => courier)
    const { list, selected, receiptImg } = useSelector(({ userTransaction }) => userTransaction)
    const transactionLoading = useSelector(({ userTransaction }) => userTransaction.loading)
    const [showModalWarning, setShowModalWarning] = useState(false)
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const [showModalSuccess, setShowModalSuccess] = useState(false)
    const [selectedCart, setSelectedCart] = useState(0)
    const [willDeleteCart, setWillDeleteCart] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [destination, setDestination] = useState(user.address)
    const [cityId, setCityId] = useState(user.cityId)

    const [totalQuantity, setTotalQuantity] = useState(0)
    const [totalWeight, setTotalWeight] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const columns = [
        { id: 'id', label: '#', minWidth: 50, align: 'center' },
        { id: 'mainImage', label: 'Image', minWidth: 50, align: 'center' },
        { id: 'productName', label: 'Product', minWidth: 150, align: 'center' },
        { id: 'quantity', label: 'Quantity', minWidth: 100, align: 'center' },
        { id: 'price', label: 'Price', minWidth: 100, align: 'center' },
        { id: 'options', label: 'Options', minWidth: 100, align: 'center' }
    ];

    const onEditCartClick = item => {
        setSelectedCart(item.id)
        setQuantity(item.quantity)
    }

    const saveEditItemCart = async () => {
        if (quantity < 1) {
            alert('Minimum purchase 1 pcs')
        } else {
            await dispatch(editCart(selectedCart, quantity))
            setSelectedCart(0)
            setQuantity(0)
        }
    }

    const deleteItemCart = async () => {
        await dispatch(deleteCart(willDeleteCart))
        setWillDeleteCart(0)
        setShowModalConfirm(false)
    }

    const onDeleteCartClick = item => {
        setWillDeleteCart(item.id)
        setShowModalConfirm(true)
    }

    const onBuyNowClick = async () => {
        if (!userCart || userCart.length === 0) {
            setShowModalWarning(true)
        } else if (userCart && userCart.findIndex(i => i.stock === 0) >= 0) {
            alert('One of products in your cart is out of stock, please remove it to continue!')
        } else {
            let data = {
                deliveryAddress: destination,
                totalProduct: userCart.length,
                totalQuantity,
                totalWeight,
                totalPrice,
                shippingCourier: `JNE ${courierList.costs[selectedCourier - 1].service}`,
                shippingCost: courierList.costs[selectedCourier - 1].cost[0].value,
                totalCost: courierList.costs[selectedCourier - 1].cost[0].value + totalPrice
            }
            console.log(data)
            setShowModalSuccess(true)
            await dispatch(checkOut(data))
        }
    }

    const imgFileHandler = (e) => {
        const files = e.target.files
        const fileType = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
        if (files.length > 0 && fileType.findIndex(a => files[0].type === a) >= 0 && files[0].size <= (1024 * 1024 * 5)) {
            dispatch(setImageReceipt(files[0]));
        } else {
            dispatch(setImageReceiptError('file type jpeg/ jpg/ png/ gif only and file size max 5mb'))
        }
    };

    const upload = async () => {
        if (receiptImg) {
            let transactionCode = list.filter(i => i.id === selected)[0].transactionCode
            let formData = new FormData();
            formData.append('image', receiptImg)
            await dispatch(uploadReceipt(transactionCode, formData))
            dispatch(emptyCart());
            props.history.push('/userdashboard/transaction');
        } else {
            alert('Please Upload Receipt Payment Image File!')
        }
    }

    const fnTotalQuantity = () => {
        let qty = 0
        userCart.forEach(i => qty += i.quantity)
        setTotalQuantity(qty)
    }

    const fnTotalWeight = () => {
        let weight = 0
        userCart.forEach(i => weight += (i.weight * i.quantity))
        setTotalWeight(weight)
    }

    const fnTotalPrice = () => {
        let price = 0
        userCart.forEach(i => price += (i.price * i.quantity))
        setTotalPrice(price)
    }

    useEffect(() => {
        dispatch(fetchCityList())
    }, [dispatch])

    useEffect(() => {
        if (userCart) {
            fnTotalQuantity()
            fnTotalWeight()
            fnTotalPrice()
        }
    }, [userCart])

    useEffect(() => {
        if (totalWeight !== 0) {
            dispatch(fetchCourier(cityId, totalWeight))
        } else {
            dispatch(emptyCourier())
        }
    }, [dispatch, cityId, totalWeight])

    const renderCityList = () => cityList.length > 0 ? cityList.map(i => (
        <MenuItem key={i.city_id} value={i.city_id}>{i.type} {i.city_name}</MenuItem>
    )) : null

    const renderCourierList = () => courierList ? courierList.costs.map((i, index) => (
        <div key={index}
            className={`listCourierContainer ${selectedCourier === index + 1 ? 'active' : ''}`}
            onClick={() => dispatch(selectCourier(index + 1))}
        >
            <h3>{i.service}</h3>
            <div className="serviceLabel">
                <p>{i.description}</p>
                <p>Estimation {i.cost[0].etd} days</p>
            </div>
            <div className="serviceCost">
                <p>{formatter.format(i.cost[0].value)}</p>
            </div>
        </div>
    )) : null

    const renderTextBox = () => (
        <div className='itemCartQuantity'>
            <TextField margin="dense" label="Qty" id="itemCartQuantity"
                type="number" fullWidth required
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value))}
            />
        </div>
    )

    const renderCartList = () => userCart && userCart.length > 0 ? userCart.map((i, index) => (
        <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
                <img src={`${API_URL}${i.image}`} alt={i.name} style={{ width: '50px' }} />
            </TableCell>
            <TableCell>{i.name}</TableCell>
            <TableCell>{selectedCart === i.id ? renderTextBox() : i.quantity}</TableCell>
            <TableCell>{i.stock > 0 ? formatter.format(i.price * i.quantity) : 'Out of Stock'}</TableCell>
            <TableCell>
                {selectedCart === i.id ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton aria-label="Save" onClick={saveEditItemCart}>
                            <SaveIcon style={{ color: 'white' }} />
                        </IconButton>
                        <IconButton aria-label="Cancel" onClick={() => setSelectedCart(0)}>
                            <CancelIcon style={{ color: 'white' }} />
                        </IconButton>
                    </div>
                ) : (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton aria-label="Edit" onClick={() => onEditCartClick(i)}>
                                <EditIcon style={{ color: 'white' }} />
                            </IconButton>
                            <IconButton aria-label="Delete" onClick={() => onDeleteCartClick(i)}>
                                <DeleteIcon style={{ color: 'white' }} />
                            </IconButton>
                        </div>
                    )}
            </TableCell>
        </TableRow>
    )) : (
            <TableRow>
                <TableCell colSpan={6}>Cart Empty</TableCell>
            </TableRow>
        )

    const renderModalWarningWeight = () => showModalWarning ? (
        <Suspense fallback={<Loading />}>
            <ModalWarning
                show={showModalWarning}
                setShow={setShowModalWarning}
                title='Warning'
            >
                Weight is over 30kg! Please split into another transaction!
            </ModalWarning>
        </Suspense>
    ) : null

    const renderModalWarning = () => showModalWarning ? (
        <Suspense fallback={<Loading />}>
            <ModalWarning
                show={showModalWarning}
                setShow={setShowModalWarning}
                title='Warning'
            >
                Please add something to cart!
            </ModalWarning>
        </Suspense>
    ) : null

    const renderModalConfirmDelete = () => showModalConfirm ? (
        <Suspense fallback={<Loading />}>
            <ModalConfirm
                show={showModalConfirm}
                setShow={setShowModalConfirm}
                title='Confirm Delete'
                cb={deleteItemCart}
            >
                Delete this item from your cart?
            </ModalConfirm>
        </Suspense>
    ) : null

    const renderModalSuccess = () => {
        if (showModalSuccess && transactionLoading) {
            return (
                <Suspense fallback={<Loading />}>
                    <ModalDefault
                        show={showModalSuccess}
                        title='Please Wait'
                    >
                        <Loading />
                    </ModalDefault>
                </Suspense>
            )
        } else if (showModalSuccess && !transactionLoading) {
            return (
                <Suspense fallback={<Loading />}>
                    <ModalTransactionSuccess
                        show={showModalSuccess}
                        title='Transaction Success'
                        btnNo='Go to My Transactions'
                        cbNo={() => {
                            dispatch(selectTransaction(0))
                            dispatch(emptyCart());
                            props.history.push('/userdashboard/transaction');
                        }}
                        btnYes='Upload Payment Receipt'
                        cbYes={upload}
                        imgFileHandler={imgFileHandler}
                    />
                </Suspense>
            )
        } else {
            return null
        }
    }

    return (
        <div className='userCartContainer'>
            <div className="userCartWrapper">
                <Table>
                    <TableHead>
                        <TableHeadRow columns={columns} />
                    </TableHead>
                    <TableBody>{renderCartList()}</TableBody>
                </Table>
            </div>
            <div className="userDataWrapper">
                <div className="userDataWrapperTop">
                    <div className="dataWrapper">
                        <div className="dataLabel">SUMMARY</div>
                    </div>
                    <div className="dataWrapper">
                        <div className="dataInfo">
                            <div>
                                <p>Total Product</p>
                                <h3>{userCart ? userCart.length : '0'}</h3>
                            </div>
                            <div>
                                <p>Total Quantity</p>
                                <h3>{totalQuantity}</h3>
                            </div>
                            <div>
                                <p>Total Weight</p>
                                <h3>{totalWeight / 1000} Kg</h3>
                            </div>
                            <div>
                                <p>Total Price</p>
                                <h3>{formatter.format(totalPrice)}</h3>
                            </div>
                            <div>
                                <p>Shipping Cost</p>
                                <h3>{courierList ? formatter.format(courierList.costs[selectedCourier - 1].cost[0].value) : '0'}</h3>
                            </div>
                            <div>
                                <p>Total Cost</p>
                                <h3>{courierList ? formatter.format(courierList.costs[selectedCourier - 1].cost[0].value + totalPrice) : '0'}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="dataWrapper">
                        <div className="dataLabel">SHIPPING DESTINATION</div>
                        <div className="dataDestination">
                            <TextField margin="dense" label="Address" id="itemCartQuantity"
                                type="text" fullWidth multiline
                                value={destination}
                                onChange={e => setDestination(e.target.value)}
                            />
                            <FormControl required style={{ width: '50%', marginLeft: '20px' }}>
                                <InputLabel id="selectCity">City</InputLabel>
                                <Select
                                    labelId="cityId"
                                    id="cityId"
                                    name="cityId"
                                    value={cityId}
                                    onChange={e => setCityId(parseInt(e.target.value))}
                                    style={{ color: 'white' }}
                                >
                                    <MenuItem value="0"><em>Please select one:</em></MenuItem>
                                    {renderCityList()}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="dataWrapper">
                        <div className="dataLabel">SHIPPING COURIER (JNE)</div>
                        {renderCourierList()}
                    </div>
                </div>
                <div className="userDataWrapperBottom">
                    <Button onClick={onBuyNowClick}>BUY NOW</Button>
                </div>
            </div>
            {renderModalWarningWeight()}
            {renderModalWarning()}
            {renderModalConfirmDelete()}
            {renderModalSuccess()}
        </div>
    )
}

export default withRouter(UserCart)
