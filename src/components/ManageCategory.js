import React, { useState, useEffect, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button, Select, MenuItem, TextField } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'

import {
    getCategories,
    addCategory,
    editCategory,
    deleteCategory
} from '../redux/actions'

import TableHeadRow from './TableHeadRow'
import Loading from './Loading'

const ModalDefault = lazy(() => import('./ModalDefault'))
const FormCategoryData = lazy(() => import('./forms/FormCategoryData'))

function ManageCategory(props) {
    const { showModalWarning, setShowModalWarning } = props
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const initialState = {
        newCategory: "",
        newParentId: 0,
        newMainParentId: 0,
        editedId: 0,
        editCategoryName: "",
        editParentId: 0,
        editMainParentId: 0
    }

    const [state, setState] = useState(initialState)
    const [showModalAdd, setShowModalAdd] = useState(false)
    const categories = useSelector(({ categories }) => categories.categories)
    const mostParent = useSelector(({ categories }) => categories.mostParent)

    //table material
    const categoryColumns = [
        { id: 'id', label: '#', minWidth: 50, align: 'center' },
        { id: 'category', label: 'Category', minWidth: 100, align: 'center' },
        { id: 'parentcategory', label: 'Parent Category', minWidth: 100, align: 'center' },
        { id: 'mainparentcategory', label: 'Main Category', minWidth: 100, align: 'center' },
        { id: 'options', label: 'Options', minWidth: 70, align: 'center' }
    ];
    //end table material

    const onAddClick = async () => {
        if (state.newCategory === '') {
            return setShowModalWarning(!showModalWarning)
        }
        let find = categories.filter(a => a.category === state.newCategory)
        if (find.length > 0) {
            return alert('Category exist!')
        }
        await dispatch(addCategory({
            newCategory: state.newCategory,
            newParentId: state.newParentId === 0 ? null : state.newParentId,
            newMainParentId: state.newMainParentId === 0 ? null : state.newMainParentId
        }))
        setShowModalAdd(!showModalAdd)
    }

    const onEditClick = row => {
        setState({
            ...state,
            editedId: row.id,
            editCategoryName: row.category,
            editParentId: row.parentId == null ? 0 : row.parentId,
            editMainParentId: row.mainParentId == null ? 0 : row.mainParentId
        })
    }

    const onDeleteClick = categoryId => {
        if (window.confirm('Are you sure to delete')) {
            dispatch(deleteCategory(categoryId))
        }
    }

    const onSaveClick = () => {
        if (window.confirm('Are you sure to update?')) {
            dispatch(editCategory({
                categoryId: state.editedId,
                newCategory: state.editCategoryName,
                newParentId: state.editParentId === 0 ? null : state.editParentId,
                newMainParentId: state.editMainParentId === 0 ? null : state.editMainParentId
            }))
            setState({ ...state, editedId: null })
        }
    }

    const renderSelect = () => categories.map(i => (
        <MenuItem key={i.id} value={i.id}>{i.category}</MenuItem>
    ))

    const renderSelectMain = () => mostParent.map(i => (
        <MenuItem key={i.id} value={i.id}>{i.category}</MenuItem>
    ))

    const renderCat = () => {
        if (categories) {
            return categories.map(i => {
                if (state.editedId === i.id) {
                    return (
                        <TableRow key={i.id}>
                            <TableCell align='center'>{i.id}</TableCell>
                            <TableCell>
                                <TextField
                                    margin="dense" label="Category Name" type="text"
                                    value={state.editCategoryName}
                                    onChange={e => setState({
                                        ...state, editCategoryName: e.target.value
                                    })}
                                    fullWidth required
                                />
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={state.editParentId ? state.editParentId : 0}
                                    onChange={e => setState({
                                        ...state, editParentId: parseInt(e.target.value)
                                    })}
                                >
                                    <MenuItem value={0}>Choose Category:</MenuItem>
                                    {renderSelect()}
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={state.editMainParentId ? state.editMainParentId : 0}
                                    onChange={e => setState({
                                        ...state, editMainParentId: parseInt(e.target.value)
                                    })}
                                >
                                    <MenuItem value={0}>Choose Main Category:</MenuItem>
                                    {renderSelectMain()}
                                </Select>
                            </TableCell>
                            <TableCell>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <IconButton aria-label="Save"
                                        onClick={onSaveClick}
                                    >
                                        <SaveIcon />
                                    </IconButton>
                                    <IconButton aria-label="Cancel"
                                        onClick={() => setState({ ...state, editedId: null })}
                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                }
                return (
                    <TableRow key={i.id}>
                        <TableCell align='center'>{i.id}</TableCell>
                        <TableCell>{i.category}</TableCell>
                        <TableCell>{i.parentCategory}</TableCell>
                        <TableCell>{i.mainParentCategory}</TableCell>
                        <TableCell>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <IconButton aria-label="Edit"
                                    onClick={() => onEditClick(i)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="Delete"
                                    onClick={() => onDeleteClick(i.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </TableCell>
                    </TableRow>
                )
            })
        } else {
            return (
                <TableRow>
                    <TableCell><Loading /></TableCell>
                </TableRow>
            )
        }
    }

    const renderFormAddCategory = () => showModalAdd ? (
        <Suspense fallback={<Loading />}>
            <ModalDefault
                show={showModalAdd}
                setShow={setShowModalAdd}
                title='Add Category'
            >
                <Suspense fallback={<Loading />}>
                    <FormCategoryData
                        state={state}
                        setState={setState}
                        show={showModalAdd}
                        setShow={setShowModalAdd}
                        onSave={onAddClick}
                        renderSelect={renderSelect}
                        renderSelectMain={renderSelectMain}
                    />
                </Suspense>
            </ModalDefault>
        </Suspense>
    ) : null

    return (
        <div className='categoryContainer'>
            <div className="categoryHeader">
                <h2>Categories</h2>
                <Button variant='outlined'
                    onClick={() => setShowModalAdd(!showModalAdd)}
                >
                    <p style={{ padding: '0 5px' }}>ADD CATEGORIES</p>
                    <AddCircleOutlineIcon />
                </Button>
            </div>
            <Table>
                <TableHead>
                    <TableHeadRow columns={categoryColumns} />
                </TableHead>
                <TableBody>
                    {renderCat()}
                </TableBody>
            </Table>
            {renderFormAddCategory()}
        </div>
    )
}

export default ManageCategory
