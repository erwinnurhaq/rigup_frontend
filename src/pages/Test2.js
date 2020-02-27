import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    getCategories,
    addCategory,
    editCategory,
    deleteCategory
} from '../redux/actions'

import Loading from '../components/Loading'


const Test2 = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const initialState = {
        newCategory: "",
        newParentId: 0,
        editedId: 0,
        editCategoryName: "",
        editParentId: 0
    }

    const [state, setState] = useState(initialState)
    const categories = useSelector(({ categories }) => categories.categories)

    const onChangeSelectParentId = e => {
        setState({ ...state, newParentId: parseInt(e.target.value) })
    }

    const onAddClick = () => {
        if (state.newCategory === '') {
            return alert('Must fill category name')
        }
        let find = categories.filter(a => a.category === state.newCategory)
        if (find.length > 0) {
            return alert('Category exist!')
        }
        dispatch(addCategory({
            newCategory: state.newCategory,
            newParentId: state.newParentId === 0 ? null : state.newParentId
        }))
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
                newParentId: state.editParentId === 0 ? null : state.editParentId
            }))
            setState({ ...state, editedId: null })
        }
    }

    const renderCat = () => {
        if (categories) {
            return categories.map(i => {
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
        if (categories) {
            return categories.map(i => (
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
                                value={state.newCategory}
                                onChange={e => setState({ ...state, newCategory: e.target.value })}
                                placeholder="Category Name"
                            />
                        </td>
                        <td>
                            <select
                                value={state.newParentId}
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
