import React from 'react'
import { TextField, Select, MenuItem } from '@material-ui/core'

const FormProductData = ({ product, brand, onSelectBrand, onInputChange }) => {
    return (
        <div>
            <Select
                value={product.brand}
                onChange={onSelectBrand}
            >
                <MenuItem value={0}>Choose Brand:</MenuItem>
                {brand ? brand.map(i => (
                    <MenuItem key={i.brandId} value={i.brandId}>{i.brand}</MenuItem>
                )) : null}
            </Select>
            <TextField
                margin="dense" label="Product Name" id="name" type="text"
                value={product.name}
                onChange={onInputChange}
                fullWidth required
            />
            <TextField
                margin="dense" label="Price" id="price" type="number"
                value={product.price}
                onChange={onInputChange}
                required
            />
            <TextField
                margin="dense" label="Stock" id="stock" type="number"
                value={product.stock}
                onChange={onInputChange}
                required
            />
        </div>
    )
}

export default FormProductData
