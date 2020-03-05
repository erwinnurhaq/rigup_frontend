import React, { useState, lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { editBrandById, addBrand, deleteBrandById } from '../redux/actions'

import TableHeadRow from '../components/TableHeadRow'
import Loading from '../components/Loading'
const ModalConfirm = lazy(() => import('../components/ModalConfirm'))
const ModalDefault = lazy(() => import('../components/ModalDefault'))
const FormBrandData = lazy(() => import('../components/forms/FormBrandData'))

function ManageBrand(props) {

    const { showModalWarning, setShowModalWarning } = props
    const dispatch = useDispatch()
    const mostParent = useSelector(({ categories }) => categories.mostParent)
    const brandCats = useSelector(({ brandCats }) => brandCats.brandCats)
    const brandList = useSelector(({ brands }) => brands.brandList)

    const initialState = {
        selectedBrand: { id: 0, brand: '' },
        selectedCategory: []
    }
    const [state, setState] = useState(initialState)
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalConfirm, setShowModalConfirm] = useState(false)

    //table material
    const brandColumns = [
        { id: 'id', label: '#', minWidth: 50, align: 'center' },
        { id: 'brand', label: 'Brand', minWidth: 120, align: 'center' },
        { id: 'options', label: 'Options', minWidth: 70, align: 'center' }
    ];
    //end table material

    const onEditBrandClick = brandId => {
        let selected = brandList.filter(i => i.id === brandId)[0]
        let arr = []
        brandCats.forEach(i => {
            if (i.brandId === brandId) {
                arr.push(i.categoryId)
            }
        })
        setState({ selectedBrand: selected, selectedCategory: arr })
        setShowModalEdit(!showModalEdit)
    }

    const onAddBrandClick = () => {
        setState(initialState)
        setShowModalAdd(!showModalAdd)
    }

    const onEditBrandSaveClick = async () => {
        if (state.selectedBrand.brand === '' || state.selectedCategory.length === 0) {
            return setShowModalWarning(!showModalWarning)
        }
        await dispatch(editBrandById({
            brandId: state.selectedBrand.id,
            brand: state.selectedBrand.brand,
            categoryId: state.selectedCategory
        }))
        setShowModalEdit(!showModalEdit)
        setState(initialState)
    }

    const onAddBrandSaveClick = async () => {
        if (state.selectedBrand.brand === '' || state.selectedCategory.length === 0) {
            return setShowModalWarning(!showModalWarning)
        }
        await dispatch(addBrand({
            brand: state.selectedBrand.brand,
            categoryId: state.selectedCategory
        }))
        setShowModalAdd(!showModalAdd)
        setState(initialState)
    }

    const deleteBrandConfirmation = brandId => {
        setState({ ...state, selectedBrand: { ...state.selectedBrand, id: brandId } })
        setShowModalConfirm(!showModalConfirm)
    }

    const onDeleteClick = async () => {
        await dispatch(deleteBrandById(state.selectedBrand.id))
        setShowModalConfirm(!showModalConfirm)
    }

    const renderBrandTableRow = () => {
        if (!brandList) {
            return (
                <TableRow>
                    {new Array(3).fill(0).map((i, idx) => (
                        <TableCell key={idx}><Loading type='bar' /></TableCell>
                    ))}
                </TableRow>
            )
        } else {
            return (
                brandList.map((brand, index) => (
                    <TableRow key={brand.id}>
                        <TableCell align='center'>{index + 1}</TableCell>
                        <TableCell>{brand.brand}</TableCell>
                        <TableCell>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <IconButton aria-label="Edit"
                                    onClick={() => onEditBrandClick(brand.id)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="Delete"
                                    onClick={() => deleteBrandConfirmation(brand.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </TableCell>
                    </TableRow>
                ))
            )
        }
    }

    const renderFormAddBrand = () => showModalAdd ? (
        <Suspense fallback={<Loading />}>
            <ModalDefault
                show={showModalAdd}
                setShow={setShowModalAdd}
                title='Add Brand'
            >
                <Suspense fallback={<Loading />}>
                    <FormBrandData
                        state={state}
                        setState={setState}
                        mostParent={mostParent}
                        show={showModalAdd}
                        setShow={setShowModalAdd}
                        onSave={onAddBrandSaveClick}
                    />
                </Suspense>
            </ModalDefault>
        </Suspense>
    ) : null

    const renderFormEditBrand = () => showModalEdit ? (
        <Suspense fallback={<Loading />}>
            <ModalDefault
                show={showModalEdit}
                setShow={setShowModalEdit}
                title='Edit Brand'
            >
                <Suspense fallback={<Loading />}>
                    <FormBrandData
                        state={state}
                        setState={setState}
                        mostParent={mostParent}
                        show={showModalEdit}
                        setShow={setShowModalEdit}
                        onSave={onEditBrandSaveClick}
                    />
                </Suspense>
            </ModalDefault>
        </Suspense>
    ) : null

    const renderModalConfimBrand = () => showModalConfirm ? (
        <Suspense fallback={<Loading />}>
            <ModalConfirm
                show={showModalConfirm}
                setShow={setShowModalConfirm}
                title='Are you sure?'
                cb={onDeleteClick}
            />
        </Suspense>
    ) : null

    return (
        <div className="brandContainer">
            <div className="brandHeader">
                <h2>Brands</h2>
                <Button onClick={onAddBrandClick} variant='outlined'>
                    <p style={{ padding: '0 5px' }}>ADD BRAND</p>
                    <AddCircleOutlineIcon />
                </Button>
            </div>
            <Table>
                <TableHead>
                    <TableHeadRow columns={brandColumns} />
                </TableHead>
                <TableBody>
                    {renderBrandTableRow()}
                </TableBody>
            </Table>
            {renderFormAddBrand()}
            {renderFormEditBrand()}
            {renderModalConfimBrand()}
        </div>
    )
}

export default ManageBrand
