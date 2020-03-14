import React, { useState, useEffect, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, TableHead, TableBody, IconButton, TableRow, TableCell, Button, DialogActions } from '@material-ui/core';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TableHeadRow from './TableHeadRow'
import formatter from '../support/FormatterRupiah'
import Loading from './Loading';
import { getUserTransactionList, getUserTransactionDetailList, selectTransaction, setImageReceipt, setImageReceiptError, uploadReceipt } from '../redux/actions'
import { API_URL } from '../support/API_URL';

const ModalTransactionSuccess = lazy(() => import('./ModalTransactionSuccess'))
const ModalDefault = lazy(() => import('./ModalDefault'))

const UserTransaction = () => {
    const dispatch = useDispatch();
    const { list, detail, selected, receiptImg } = useSelector(({ userTransaction }) => userTransaction)
    const [showModalUpload, setShowModalUpload] = useState(false)
    const [showDetail, setShowDetail] = useState(false)

    useEffect(() => {
        dispatch(getUserTransactionList())
    }, [dispatch])

    const onBtnDetailClick = (id) => {
        dispatch(selectTransaction(id))
        dispatch(getUserTransactionDetailList(id))
        setShowDetail(true)
    }

    const onBtnUploadPaymentClick = (id) => {
        dispatch(selectTransaction(id))
        setShowModalUpload(true)
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
            setShowModalUpload(false)
        } else {
            alert('Please Upload Receipt Payment Image File!')
        }
    }

    const paidStatusList = ['Unpaid', 'Verifying Payment', 'Paid', 'Fail, check email for further information']
    const deliveredStatusList = ['Waiting', 'On Delivery', 'Delivered', 'Undelivered']

    const columns = [
        { id: 'id', label: '#', minWidth: 50, align: 'center' },
        { id: 'trCode', label: 'Transaction Code', minWidth: 50, align: 'center' },
        { id: 'trDate', label: 'Transaction Date', minWidth: 50, align: 'center' },
        { id: 'totalProduct', label: 'Total Product', minWidth: 50, align: 'center' },
        { id: 'totalQuantity', label: 'Total Quantity', minWidth: 50, align: 'center' },
        { id: 'totalWeight', label: 'Total Weight', minWidth: 50, align: 'center' },
        { id: 'totalPrice', label: 'Total Price', minWidth: 50, align: 'center' },
        { id: 'shippingCourier', label: 'Courier', minWidth: 50, align: 'center' },
        { id: 'deliveryAddress', label: 'Address', minWidth: 50, align: 'center' },
        { id: 'shippingCost', label: 'Shipping Cost', minWidth: 50, align: 'center' },
        { id: 'totalCost', label: 'Total Cost', minWidth: 50, align: 'center' },
        { id: 'paidStatus', label: 'Status', minWidth: 50, align: 'center' },
        { id: 'deliveredStatus', label: 'Delivery', minWidth: 50, align: 'center' },
        { id: 'option', label: 'Option', minWidth: 50, align: 'center' }
    ]

    const columnsDetail = [
        { id: 'id', label: '#', minWidth: 50, align: 'center' },
        { id: 'image', label: 'Image', minWidth: 50, align: 'center' },
        { id: 'product', label: 'Product', minWidth: 50, align: 'center' },
        { id: 'weight', label: 'Weight', minWidth: 50, align: 'center' },
        { id: 'price', label: 'Price', minWidth: 50, align: 'center' },
        { id: 'quantity', label: 'Quantity', minWidth: 50, align: 'center' },
        { id: 'totalPrice', label: 'Total Price', minWidth: 50, align: 'center' }
    ]

    const renderTransactionList = () => list && list.length > 0 ? list.map((i, index) => (
        <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{i.transactionCode}</TableCell>
            <TableCell>
                {new Date(i.transactionDate).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                })}
            </TableCell>
            <TableCell>{i.totalProduct}</TableCell>
            <TableCell>{i.totalQuantity}</TableCell>
            <TableCell>{i.totalWeight / 1000} Kg</TableCell>
            <TableCell>{formatter.format(i.totalPrice)}</TableCell>
            <TableCell>{i.shippingCourier}</TableCell>
            <TableCell>{i.deliveryAddress}</TableCell>
            <TableCell>{formatter.format(i.shippingCost)}</TableCell>
            <TableCell>{formatter.format(i.totalCost)}</TableCell>
            <TableCell>{paidStatusList[i.paidStatus]}</TableCell>
            <TableCell>{deliveredStatusList[i.deliveredStatus]}</TableCell>
            <TableCell>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton aria-label="Detail" onClick={() => onBtnDetailClick(i.id)}>
                        <FormatListBulletedIcon style={{ color: 'white' }} />
                    </IconButton>
                    <Button style={i.paidStatus !== 0 ? { backgroundColor: 'black', color: 'lightgrey' } : { backgroundColor: 'darkviolet', color: 'white' }}
                        onClick={() => onBtnUploadPaymentClick(i.id)} variant="contained" component="label"
                        disabled={i.paidStatus !== 0 ? true : false}
                    >
                        Upload Payment
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )) : (
            <TableRow>
                <TableCell colSpan={14}>Transaction Empty</TableCell>
            </TableRow>
        )

    const renderTransactionDetail = () => detail && detail.length > 0 ? detail.map((i, index) => (
        <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell><img src={`${API_URL}${i.image}`} alt={index} style={{ height: '80px' }} /></TableCell>
            <TableCell>{i.name}</TableCell>
            <TableCell>{i.weight / 1000} Kg</TableCell>
            <TableCell>{formatter.format(i.productPrice)}</TableCell>
            <TableCell>{i.quantity}</TableCell>
            <TableCell>{formatter.format(i.totalPrice)}</TableCell>
        </TableRow>
    )) : (
            <TableRow>
                <TableCell colSpan={7}>Detail Empty</TableCell>
            </TableRow>
        )

    const renderModalUpload = () => showModalUpload ? (
        <Suspense fallback={<Loading />}>
            <ModalTransactionSuccess
                show={showModalUpload}
                title='Upload Payment Receipt'
                btnNo='Back'
                cbNo={() => {
                    dispatch(selectTransaction(0));
                    setShowModalUpload(false);
                }}
                btnYes='Upload Payment Receipt'
                cbYes={upload}
                imgFileHandler={imgFileHandler}
            />
        </Suspense>
    ) : null


    const renderModalDetail = () => showDetail ? (
        <Suspense fallback={<Loading />}>
            <ModalDefault
                show={showDetail}
                title='Detail Transaction'
                size='lg'
            >
                <div style={{ width: '80%', height: '100%', margin: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableHeadRow columns={columnsDetail} />
                        </TableHead>
                        <TableBody>{renderTransactionDetail()}</TableBody>
                    </Table>
                </div>
                <DialogActions>
                    <Button variant='contained' style={{ backgroundColor: 'darkviolet', color: 'white' }}
                        onClick={() => {
                            dispatch(selectTransaction(0));
                            setShowDetail(false);
                        }
                        }>CLOSE</Button>
                </DialogActions>
            </ModalDefault>
        </Suspense>
    ) : null

    return (
        <div className='userCartContainer'>
            <div className="userCartWrapper">
                <Table>
                    <TableHead>
                        <TableHeadRow columns={columns} />
                    </TableHead>
                    <TableBody>{renderTransactionList()}</TableBody>
                </Table>
            </div>
            {renderModalUpload()}
            {renderModalDetail()}
        </div>
    )
}

export default UserTransaction
