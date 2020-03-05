import React from 'react'
import { MenuItem, Select, TextField, DialogContent, DialogActions, Button } from '@material-ui/core'

function FormCategoryData(props) {
    const { state, setState, show, setShow, onSave, renderSelect, renderSelectMain } = props
    return (
        <div>
            <DialogContent>
                <TextField
                    margin="dense" label="Category Name" id="category" type="text"
                    value={state.newCategory}
                    onChange={e => setState({ ...state, newCategory: e.target.value })}
                    fullWidth required
                />
                <div style={{ width: '100%', display: 'flex' }}>
                    <div style={{ display: 'flex' }}>
                        <p style={{ margin: '20px 20px' }}>Parent Category: </p>
                        <Select
                            value={state.newParentId ? state.newParentId : 0}
                            onChange={e => setState({
                                ...state, newParentId: parseInt(e.target.value)
                            })}
                        >
                            <MenuItem value={0}>Choose Category:</MenuItem>
                            {renderSelect()}
                        </Select>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <p style={{ margin: '20px 20px' }}>Main Category: </p>
                        <Select
                            value={state.newMainParentId ? state.newMainParentId : 0}
                            onChange={e => setState({
                                ...state, newMainParentId: parseInt(e.target.value)
                            })}
                        >
                            <MenuItem value={0}>Choose Main Category:</MenuItem>
                            {renderSelectMain()}
                        </Select>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={() => setShow(!show)} >CANCEL</Button>
                <Button color="secondary" onClick={onSave} >SAVE</Button>
            </DialogActions>
        </div>
    )
}

export default FormCategoryData
