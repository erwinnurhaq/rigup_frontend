import React from 'react'
import { FormControlLabel, Checkbox, TextField, DialogContent, DialogActions, Button } from '@material-ui/core'

function FormEditBrand(props) {
    const { mostParent, state, setState, show, setShow, onSave } = props

    const onInputTextChange = e => {
        setState({
            ...state,
            selectedBrand: { ...state.selectedBrand, brand: e.target.value }
        })
    }

    const onCheckBoxChange = e => {
        let arr = state.selectedCategory
        let existing = arr.indexOf(parseInt(e.target.value))
        if (existing >= 0) {
            arr.splice(existing, 1)
            setState({
                ...state,
                selectedCategory: arr
            })
        } else {
            setState({
                ...state,
                selectedCategory: arr.concat([parseInt(e.target.value)])
            })
        }
    }

    const renderCheckBox = () => mostParent.map(cat => (
        <FormControlLabel key={cat.id}
            control={
                <Checkbox
                    checked={state.selectedCategory.indexOf(cat.id) >= 0 ? true : false}
                    value={cat.id}
                    onChange={onCheckBoxChange}
                />
            }
            label={cat.category}
        />
    ))

    return (
        <div>
            <DialogContent>
                <TextField
                    margin="dense" label="Brand Name" id="brand" type="text"
                    value={state.selectedBrand.brand}
                    onChange={onInputTextChange}
                    fullWidth required
                />
                <p style={{ margin: '20px 0' }}>Main Category: </p>
                <div style={{ width: '100%', flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between' }}>
                    {renderCheckBox()}
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={() => setShow(!show)} >CANCEL</Button>
                <Button color="secondary" onClick={onSave} >SAVE</Button>
            </DialogActions>
        </div>
    )
}

export default FormEditBrand
