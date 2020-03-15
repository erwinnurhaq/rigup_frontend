import React, { useState, useEffect, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, TableHead, TableBody, IconButton, TableRow, TableCell, Button, DialogActions } from '@material-ui/core';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TableHeadRow from '../components/TableHeadRow'
import formatter from '../support/FormatterRupiah'
import Loading from '../components/Loading';
import { getUserHistoryList, getUserTransactionDetailList } from '../redux/actions'
import { API_URL } from '../support/API_URL';

const ModalDefault = lazy(() => import('../components/ModalDefault'))

const UserHistory = () => {
    const dispatch = useDispatch();
    const { list, detail } = useSelector(({ userTransaction }) => userTransaction)
    const [showDetail, setShowDetail] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const [selImage, setSelImage] = useState('')

    useEffect(() => {
        dispatch(getUserHistoryList())
    }, [dispatch])

    const onBtnDetailClick = (id) => {
        dispatch(getUserTransactionDetailList(id))
        setShowDetail(true)
    }

    const onModalImageClose = () => {
        setSelImage('');
        setShowImage(false);
    }

    const imageReceiptRender = (i) => i.receiptImg ? (
        <img src={`${API_URL}${i.receiptImg}`} style={{ height: '40px', cursor: 'pointer' }} alt={i.id}
            onClick={() => {
                setSelImage(`${API_URL}${i.receiptImg}`);
                setShowImage(true)
            }}
        />
    ) : 'none'

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
        { id: 'receiptImg', label: 'Receipt', minWidth: 50, align: 'center' },
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
            <TableCell>{imageReceiptRender(i)}</TableCell>
            <TableCell>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton aria-label="Detail" onClick={() => onBtnDetailClick(i.id)}>
                        <FormatListBulletedIcon style={{ color: 'white' }} />
                    </IconButton>
                </div>
            </TableCell>
        </TableRow>
    )) : (
            <TableRow>
                <TableCell colSpan={15}>Transaction Empty</TableCell>
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
                        onClick={() => setShowDetail(false)}>CLOSE</Button>
                </DialogActions>
            </ModalDefault>
        </Suspense>
    ) : null

    const renderModalImage = () => showImage ? (
        <Suspense fallback={<Loading />}>
            <ModalDefault
                show={showImage}
                title='Receipt Image'
                size='lg'
            >
                <div style={{ width: '100%', height: '100%' }}>
                    <img src={selImage} alt='receipt image' style={{ width: '100%' }} />
                </div>
                <DialogActions>
                    <Button variant='contained' style={{ backgroundColor: 'darkviolet', color: 'white' }}
                        onClick={onModalImageClose}>
                        CLOSE
                    </Button>
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
            {renderModalDetail()}
            {renderModalImage()}
        </div>
    )
}

export default UserHistory
