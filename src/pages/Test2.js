import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    getAllCategories,
    addCategory,
    editCategory,
    deleteCategory
} from '../redux/actions'

import Loading from '../components/Loading'


const Test2 = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])

    const initialState = {
        inputCategoryName: "",
        addParentId: 0,
        editedId: 0,
        editCategoryName: "",
        editParentId: 0
    }

    const [state, setState] = useState(initialState)
    const listCategory = useSelector(({ categories }) => categories.categories)

    const onChangeSelectParentId = e => {
        setState({ ...state, addParentId: parseInt(e.target.value) })
    }

    const onAddClick = () => {
        if (state.inputCategoryName === '') {
            return alert('Must fill category name')
        }
        let find = listCategory.filter(a => a.category === state.inputCategoryName)
        if (find.length > 0) {
            return alert('Category exist!')
        }
        dispatch(addCategory({
            category: state.inputCategoryName,
            parentId: state.addParentId === 0 ? null : state.addParentId
        }))
    }

    const onDeleteClick = id => {
        if (window.confirm('Are you sure to delete')) {
            dispatch(deleteCategory(id))
        }
    }

    const onSaveClick = () => {
        if (window.confirm('Are you sure to update?')) {
            dispatch(editCategory(state.editedId, {
                category: state.editCategoryName,
                parentId: state.editParentId === 0 ? null : state.editParentId
            }))
            setState({ ...state, editedId: null })
        }
    }

    const renderCat = () => {
        if (listCategory) {
            return listCategory.map(i => {
                if (state.editedId === i.id) {
                    return (
                        <tr key={i.id}>
                            <td>{i.id}</td>
                            <td>
                                <input type="text" value={state.editCategoryName}
                                    onChange={e => setState({ ...state, editCategoryName: e.target.value })}
                                />
                            </td>
                            <td>
                                <select value={state.editParentId}
                                    onChange={e => setState({ ...state, editParentId: parseInt(e.target.value) })}
                                >
                                    <option value={0}>Choose Category:</option>
                                    {renderSelect()}
                                </select>
                            </td>
                            <td>
                                <input type="button" value="SAVE" onClick={onSaveClick} />
                            </td>
                            <td>
                                <input type="button" value="CANCEL"
                                    onClick={() => setState({ ...state, editedId: null })}
                                />
                            </td>
                        </tr>
                    )
                }
                return (
                    <tr key={i.id}>
                        <td>{i.id}</td>
                        <td>{i.category}</td>
                        <td>{i.parentCategory}</td>
                        <td>
                            <input type="button" value="EDIT" onClick={() => setState({
                                ...state,
                                editedId: i.id,
                                editCategoryName: i.category,
                                editParentId: i.parentId == null ? 0 : i.parentId
                            })} />
                        </td>
                        <td>
                            <input type="button" value="DELETE" onClick={() => onDeleteClick(i.id)} />
                        </td>
                    </tr>
                )
            })
        } else {
            return <Loading />
        }
    }

    const renderSelect = () => {
        if (listCategory) {
            return listCategory.map(i => (
                <option value={i.id} key={i.id}>
                    {i.category}
                </option>
            ))
        } else {
            return <Loading />
        }
    }

    return (
        <div className="testContainer">
            <table >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Category</th>
                        <th>Parent Category</th>
                        <th colSpan="2">Option</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCat()}
                </tbody>
                <tfoot>
                    <tr>
                        <td />
                        <td>
                            <input
                                type="text"
                                value={state.inputCategoryName}
                                onChange={e => setState({ ...state, inputCategoryName: e.target.value })}
                                placeholder="Category Name"
                            />
                        </td>
                        <td>
                            <select
                                value={state.addParentId}
                                onChange={onChangeSelectParentId}
                            >
                                <option value={0}>Choose Category:</option>
                                {renderSelect()}
                            </select>
                        </td>
                        <td colSpan="2">
                            <input type="button" value="ADD" onClick={onAddClick} />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Test2
