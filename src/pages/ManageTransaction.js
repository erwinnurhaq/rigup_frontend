import React, {useState, useEffect, lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, TableHead, TableBody, IconButton, TableRow, TableCell, TableFooter, Select, MenuItem, DialogActions, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'

import TableHeadRow from '../components/TableHeadRow'
import Pagination from '../components/Pagination';
import formatter from '../support/FormatterRupiah'
import Loading from '../components/Loading';
import { API_URL } from '../support/API_URL';
import {getAllTransactionList, selectTransaction, getUserTransactionDetailList, editTransaction} from '../redux/actions'

const ModalDefault = lazy(()=> import('../components/ModalDefault'))

const ManageTransaction = () => {

    const dispatch = useDispatch();
    const {list, detail, selected, listAllCount} = useSelector(({userTransaction})=>userTransaction)
    const initialState = {
		page: 1,
		totalPage: 1,
		limit: 10,
		offset: 0
	};
    const [state, setState] = useState(initialState);
    const sortList = [
        {id: 1, label: 'Last Updated'},
        {id: 2, label: 'Paid Status ASC'},
        {id: 3, label: 'Paid Status DESC'},
        {id: 4, label: 'Delivery Status ASC'},
        {id: 5, label: 'Delivery Status DESC'}
    ]
    const [sort, setSort] = useState(1)
    const [paidStatusChange, setPaidStatusChange] = useState(0)
    const [deliveredStatusChange, setDeliveredStatusChange] = useState(0)
    const [selImage, setSelImage] = useState('')
    const [showDetail, setShowDetail] = useState(false)
    const [showImage, setShowImage] = useState(false)

    const onDetailClick = async(item) => {
        dispatch(selectTransaction(item))
        await dispatch(getUserTransactionDetailList(item.id))
        setShowDetail(true)
    }

    const onEditClick = (item) => {
        setPaidStatusChange(item.paidStatus)
        setDeliveredStatusChange(item.deliveredStatus)
        dispatch(selectTransaction(item))
    }

    const onCancelClick = () => {
        setPaidStatusChange(0)
        setDeliveredStatusChange(0)
        dispatch(selectTransaction(0))
    }

    const onSaveClick = async() => {
        await dispatch(editTransaction(selected.id, selected.email, paidStatusChange, deliveredStatusChange))
        await dispatch(getAllTransactionList(sort, state.limit, state.offset))
        dispatch(selectTransaction(0))
        setPaidStatusChange(0)
        setDeliveredStatusChange(0)
    }

    const onModalDetailClose = () => {
        dispatch(selectTransaction(0));
        setShowDetail(false);
    }

    const onModalImageClose = () => {
        setSelImage('');
        setShowImage(false);
    }

    useEffect(()=> {
        dispatch(getAllTransactionList(sort, state.limit, state.offset))
    }, [dispatch, sort, state.limit, state.offset])

    useEffect(() => {
		setState((prev) => {
			return { ...prev, totalPage: Math.ceil(listAllCount / state.limit) };
		});
    }, [listAllCount, state.limit]);

    const paidStatusList = ['Unpaid', 'Verifying Payment', 'Paid', 'Fail, check email for further information']
    const deliveredStatusList = ['Waiting', 'On Delivery', 'Delivered', 'Undelivered']

    const columns = [
		{ id: 'id', label: '#', minWidth: 50, align: 'center' },
		{ id: 'trCode', label: 'Transaction Code', minWidth: 30, align: 'center' },
		{ id: 'trDate', label: 'Transaction Date', minWidth: 30, align: 'center' },
		{ id: 'username', label: 'Username', minWidth: 10, align: 'center' },
		{ id: 'deliveryAddress', label: 'Address', minWidth: 200, align: 'center' },
		{ id: 'shippingCourier', label: 'Courier', minWidth: 50, align: 'center' },
		{ id: 'totalPrice', label: 'Total Price', minWidth: 50, align: 'center' },
		{ id: 'shippingCost', label: 'Shipping Cost', minWidth: 50, align: 'center' },
		{ id: 'totalCost', label: 'Total Cost', minWidth: 50, align: 'center' },
		{ id: 'paidStatus', label: 'Status', minWidth: 50, align: 'center' },
		{ id: 'deliveredStatus', label: 'Delivery', minWidth: 50, align: 'center' },
		{ id: 'receiptImg', label: 'Receipt Image', minWidth: 50, align: 'center' },
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

    const imageReceiptRender = (i) => i.receiptImg ? (
        <img src={`${API_URL}${i.receiptImg}`} style={{height: '40px', cursor:'pointer'}} alt={i.id}
            onClick={()=>{
                setSelImage(`${API_URL}${i.receiptImg}`);
                setShowImage(true)
            }}
        />
    ) : 'none'

    const paidStatusSelectRender = () => (
        <Select value={paidStatusChange}
            onChange={e=>setPaidStatusChange(e.target.value)}
        >
            {paidStatusList.map((i,idx) => (
                <MenuItem key={idx} value={idx} >{i}</MenuItem>
            ))}
        </Select>
    )

    const deliveredStatusSelectRender = () => (
        <Select value={deliveredStatusChange}
            onChange={e=>setDeliveredStatusChange(e.target.value)}
        >
            {deliveredStatusList.map((i,idx) => (
                <MenuItem key={idx} value={idx} >{i}</MenuItem>
            ))}
        </Select>
    )

    const selectSortRender = () => (
        <Select value={sort}
            onChange={e=>setSort(e.target.value)}
        >
            {sortList.map(i => (
                <MenuItem key={i.id} value={i.id} >{i.label}</MenuItem>
            ))}
        </Select>
    )

    const renderTransactionList = () => list && list.length>0 ? list.map((i,index)=>(
        <TableRow key={index}>
            <TableCell>{state.offset + (index + 1)}</TableCell>
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
            <TableCell>{i.username}</TableCell>
            <TableCell>{i.deliveryAddress}</TableCell>
            <TableCell>{i.shippingCourier}</TableCell>
            <TableCell>{formatter.format(i.totalPrice)}</TableCell>
            <TableCell>{formatter.format(i.shippingCost)}</TableCell>
            <TableCell>{formatter.format(i.totalCost)}</TableCell>
            <TableCell>{selected.id === i.id ? paidStatusSelectRender() : paidStatusList[i.paidStatus]}</TableCell>
            <TableCell>{selected.id === i.id ? deliveredStatusSelectRender() : deliveredStatusList[i.deliveredStatus]}</TableCell>
            <TableCell>{imageReceiptRender(i)}</TableCell>
            <TableCell>
                {selected.id === i.id ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton aria-label="Save" onClick={onSaveClick} >
                            <SaveIcon />
                        </IconButton>
                        <IconButton aria-label="Cancel" onClick={onCancelClick} >
                            <CancelIcon />
                        </IconButton>
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton aria-label="Detail" onClick={()=> onDetailClick(i)}>
                            <FormatListBulletedIcon />
                        </IconButton>
                        <IconButton aria-label="Edit" onClick={() => onEditClick(i)}>
                            <EditIcon />
                        </IconButton>
                    </div>
                )}
            </TableCell>
        </TableRow>
    )) : (
        <TableRow>
            <TableCell colSpan={14}>Transaction Empty</TableCell>
        </TableRow>
    )

    const renderTransactionDetail = () => detail && detail.length>0 ? detail.map((i,index)=>(
        <TableRow key={index}>
            <TableCell>{index+1}</TableCell>
            <TableCell><img src={`${API_URL}${i.image}`} alt={index} style={{height: '80px'}} /></TableCell>
            <TableCell>{i.name}</TableCell>
            <TableCell>{i.weight/1000} Kg</TableCell>
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
        <Suspense fallback={<Loading/>}>
            <ModalDefault
                show={showDetail}
                title='Detail Transaction'
                size='lg'
            >
                <div style={{width: '80%', height: '100%', margin: 'auto'}}>
                    <h3>Total Product: {selected.totalProduct}</h3>
                    <h3>Total Quantity: {selected.totalQuantity}</h3>
                    <h3>Total Weight: {selected.totalWeight/1000} Kg</h3>
                    <Table>
                        <TableHead>
                            <TableHeadRow columns={columnsDetail}/>
                        </TableHead>
                        <TableBody>{renderTransactionDetail()}</TableBody>
                    </Table>
                </div>
                <DialogActions>
                    <Button variant='contained' style={{backgroundColor: 'darkviolet', color: 'white'}}
                        onClick={onModalDetailClose}>CLOSE</Button>
                </DialogActions>
            </ModalDefault>
        </Suspense>
    ):null

    const renderModalImage = () => showImage ? (
        <Suspense fallback={<Loading/>}>
            <ModalDefault
                show={showImage}
                title='Receipt Image'
                size='lg'
            >
                <div style={{width: '100%', height: '100%'}}>
                    <img src={selImage} alt='receipt image' style={{width: '100%'}}/>
                </div>
                <DialogActions>
                    <Button variant='contained' style={{backgroundColor: 'darkviolet', color: 'white'}}
                        onClick={onModalImageClose}>
                        CLOSE
                    </Button>
                </DialogActions>
            </ModalDefault>
        </Suspense>
    ):null

    return (
        <div className='manageTransactionContainer'>
            <div className="manageTransactionWrapper">
                <div className='manageTransactionHeader'>
                    <h2>Transaction Lists</h2>
                    <ShoppingCartIcon style={{ color: 'dimgray', fontSize: '24px' }} />
                </div>
                <Table>
                    <TableHead>
                        <TableHeadRow columns={columns}/>
                    </TableHead>
                    <TableBody>{renderTransactionList()}</TableBody>
                    <TableFooter>
						<TableRow>
							<TableCell colSpan={14}>
                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    {selectSortRender()}
                                    <Pagination
                                        totalProduct={listAllCount}
                                        rangeLimit={[5, 10, 15, 20, 25, 50]}
                                        state={state}
                                        setState={setState}
                                        />
                                </div>
							</TableCell>
						</TableRow>
					</TableFooter>
                </Table>
            </div>
            {renderModalImage()}
            {renderModalDetail()}
        </div>
    )
}

export default ManageTransaction
