import React, { useEffect, useState, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TableRow, TableCell, Table, TableHead, TableBody, TableFooter, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'

import { getUserCount, getUserList, deleteUser } from '../redux/actions'

import Loading from '../components/Loading'
import TableHeadRow from '../components/TableHeadRow'
import Pagination from '../components/Pagination'
const ModalConfirm = lazy(() => import('../components/ModalConfirm'))

function ManageUser() {

    const dispatch = useDispatch()
    const userListsLoading = useSelector(({ manageUser }) => manageUser.loading)
    const userLists = useSelector(({ manageUser }) => manageUser.userLists)
    const userCount = useSelector(({ manageUser }) => manageUser.userCount)
    const initialState = {
        page: 1,
        totalPage: 1,
        limit: 10,
        offset: 0
    }
    const [state, setState] = useState(initialState)
    const [selectedUser, setSelectedUser] = useState(0)
    const [showModalConfirm, setShowModalConfirm] = useState(false)

    useEffect(() => {
        dispatch(getUserCount())
    }, [dispatch])

    useEffect(() => {
        dispatch(getUserList(state.limit, state.offset))
    }, [dispatch, state.limit, state.offset])

    useEffect(() => {
        setState(prev => {
            return { ...prev, totalPage: Math.ceil(userCount / state.limit) }
        })
    }, [userCount, state.limit])

    const deleteConfirmation = userId => {
        setSelectedUser(userId)
        setShowModalConfirm(!showModalConfirm)
    }

    const onDeleteUser = () => {
        dispatch(deleteUser(selectedUser))
        setShowModalConfirm(!showModalConfirm)
    }

    //table material
    const columns = [
        { id: 'id', label: '#', minWidth: 50, align: 'center' },
        { id: 'fullname', label: 'Full Name', minWidth: 150, align: 'center' },
        { id: 'gender', label: 'Gender', minWidth: 50, align: 'center' },
        { id: 'username', label: 'Username', minWidth: 150, align: 'center' },
        { id: 'email', label: 'Email', minWidth: 150, align: 'center' },
        { id: 'address', label: 'Address', minWidth: 250, align: 'center' },
        { id: 'city', label: 'City', minWidth: 100, align: 'center' },
        { id: 'phone', label: 'Phone', minWidth: 100, align: 'center' },
        { id: 'role', label: 'Role', minWidth: 50, align: 'center' },
        { id: 'verified', label: 'Verified', minWidth: 50, align: 'center' },
        { id: 'lastlogin', label: 'Last Login', minWidth: 50, align: 'center' },
        { id: 'options', label: 'Options', minWidth: 70, align: 'center' }
    ];
    //end table material

    const renderUserList = () => {
        if (userListsLoading) {
            return new Array(state.limit).fill(0).map((i, index) => (
                <TableRow key={index}>
                    {new Array(12).fill(0).map((j, index) => (
                        <TableCell key={index} style={{ position: 'relative', height: '50px' }}>
                            <Loading type='bar' />
                        </TableCell>
                    ))}
                </TableRow>
            ))
        } else if (userLists) {
            return userLists.map((i, index) => (
                <TableRow key={index}>
                    <TableCell align='center'>{state.offset + (index + 1)}</TableCell>
                    <TableCell>{i.fullname}</TableCell>
                    <TableCell>{i.gender || '-'}</TableCell>
                    <TableCell>{i.username}</TableCell>
                    <TableCell>{i.email}</TableCell>
                    <TableCell>{i.address || '-'}</TableCell>
                    <TableCell>{i.city || '-'}</TableCell>
                    <TableCell>{i.phone || '-'}</TableCell>
                    <TableCell>{i.role}</TableCell>
                    <TableCell>{i.verified === 1 ? 'Verified' : 'Not Verified'}</TableCell>
                    <TableCell>{new Date(i.lastLogin).toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                    })}</TableCell>
                    <TableCell>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton aria-label="Delete"
                                onClick={() => deleteConfirmation(i.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </TableCell>
                </TableRow>
            ))
        }
    }

    const renderPagination = () => (
        <TableRow>
            <TableCell colSpan={12} align='right'>
                <Pagination
                    totalProduct={userCount}
                    state={state}
                    setState={setState}
                    rangeLimit={[5, 10, 15, 20, 25, 50]}
                />
            </TableCell>
        </TableRow>
    )

    const renderModalConfim = () => showModalConfirm ? (
        <Suspense fallback={<Loading />}>
            <ModalConfirm
                show={showModalConfirm}
                setShow={setShowModalConfirm}
                title='Are you sure?'
                cb={onDeleteUser}
            />
        </Suspense>
    ) : null

    return (
        <div className="manageUserContainer">
            <div className='manageUserWrapper'>
                <div className='manageUserHeader'>
                    <h2>User Lists</h2>
                    <PeopleAltIcon style={{ color: 'dimgray', fontSize: '24px' }} />
                </div>
                <Table style={{ width: '80%', margin: 'auto' }}>
                    <TableHead>
                        <TableHeadRow columns={columns} />
                    </TableHead>
                    <TableBody>
                        {renderUserList()}
                    </TableBody>
                    <TableFooter>
                        {renderPagination()}
                    </TableFooter>
                </Table>
            </div>
            {renderModalConfim()}
        </div>
    )
}

export default ManageUser
