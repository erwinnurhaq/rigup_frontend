import React, {useState, lazy, Suspense} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import TableHeadRow from '../components/TableHeadRow'
import Loading from '../components/Loading'
import { API_URL } from '../support/API_URL';
import formatter from '../support/FormatterRupiah'
import {editCart, deleteCart} from '../redux/actions'

const ModalConfirm = lazy(()=>import('./ModalConfirm'))

const UserCart = () => {
    const dispatch = useDispatch()
    const userCart = useSelector(({userCart})=>userCart.cart)
    const [quantity, setQuantity] = useState(0)
    const [selected, setSelected] = useState(0)
    const [showModalConfirm, setShowModalConfirm] = useState(0)

    const columns = [
		{ id: 'id', label: '#', minWidth: 50, align: 'center' },
		{ id: 'mainImage', label: 'Image', minWidth: 50, align: 'center' },
		{ id: 'productName', label: 'Product', minWidth: 150, align: 'center' },
		{ id: 'quantity', label: 'Quantity', minWidth: 100, align: 'center' },
		{ id: 'price', label: 'Price', minWidth: 100, align: 'center' },
		{ id: 'options', label: 'Options', minWidth: 100, align: 'center' }
    ];
    
    const onEditCartClick = item => {
        setSelected(item.id)
        setQuantity(item.quantity)
    }

    const saveEditItemCart = async() => {
        if(quantity===0){
            alert('Minimum purchase 1 pcs')
        } else {
            await dispatch(editCart(selected, quantity))
            setSelected(0)
            setQuantity(0)
        }
    }

    const onDeleteCartClick = item => {
        setSelected(item.id)
        setShowModalConfirm(true)
    }

    const deleteItemCart = async() => {
        await dispatch(deleteCart(selected))
        setSelected(0)
        setShowModalConfirm(false)
    }

    const renderTextBox = () => (
        <div className='itemCartQuantity'>
            <TextField margin="dense" label="Qty" id="itemCartQuantity"
                type="number" fullWidth required
                value={quantity}
                onChange={e=> setQuantity(parseInt(e.target.value))}
            />
        </div>
    )
    
    const renderCartList = () => userCart && userCart.length>0 ? userCart.map((i,index)=>(
        <TableRow key={index}>
            <TableCell>{index+1}</TableCell>
            <TableCell>
                <img src={`${API_URL}${i.image}`} alt={i.name} style={{ width: '50px' }} />
            </TableCell>
            <TableCell>{i.name}</TableCell>
            <TableCell>{selected === i.id ? renderTextBox() : i.quantity}</TableCell>
            <TableCell>{formatter.format(i.price*i.quantity)}</TableCell>
            <TableCell>
                {selected === i.id ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton aria-label="Save" onClick={saveEditItemCart}>
                            <SaveIcon style={{color: 'white'}} />
                        </IconButton>
                        <IconButton aria-label="Cancel" onClick={() => setSelected(0)}>
                            <CancelIcon style={{color: 'white'}} />
                        </IconButton>
                    </div>
                ):(
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton aria-label="Edit" onClick={() => onEditCartClick(i)}>
                            <EditIcon style={{color: 'white'}} />
                        </IconButton>
                        <IconButton aria-label="Delete" onClick={() => onDeleteCartClick(i)}>
                            <DeleteIcon style={{color: 'white'}} />
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

    const renderModalConfirmDelete = () => showModalConfirm ? (
        <Suspense fallback={<Loading/>}>
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

    return (
        <div className='userCartContainer'>
            <div className="userCartWrapper">
                <Table>
                    <TableHead>
                        <TableHeadRow columns={columns}/>
                    </TableHead>
                    <TableBody>{renderCartList()}</TableBody>
                </Table>
            </div>
            <div className="userDataWrapper">
                <p>test</p>
            </div>
            {renderModalConfirmDelete()}
        </div>
    )
}

export default UserCart
