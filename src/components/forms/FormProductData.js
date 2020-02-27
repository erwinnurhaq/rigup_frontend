import React from 'react'
import { TextField, Select, MenuItem, InputLabel } from '@material-ui/core'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const FormProductData = ({ product, brand, onSelectBrand, onInputChange, onInputDescChange }) => {
    return (
        <div>
            <Select
                value={product.brandId ? product.brandId : 0}
                onChange={onSelectBrand}
            >
                <MenuItem value={0}>Choose Brand:</MenuItem>
                {brand ? brand.map(i => (
                    <MenuItem key={i.brandId} value={i.brandId}>{i.brand}</MenuItem>
                )) : null}
            </Select>
            <TextField
                margin="dense" label="Product Name" id="name" type="text"
                value={product.name ? product.name : ''}
                onChange={onInputChange}
                fullWidth required
            />
            {/* <TextField
                margin="dense" label="Description" id="description" type="text"
                value={product.description}
                onChange={onInputChange}
                fullWidth multiline
            /> */}
            <br />
            <InputLabel style={{ paddingTop: '24px' }}>Description:</InputLabel>
            <CKEditor
                editor={ClassicEditor}
                data={product.description ? product.description : ''}
                onInit={editor => {
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onInputDescChange(data)
                }}
            />
            <TextField
                margin="dense" label="Package Weight (Gram)" id="weight" type="number"
                value={product.weight ? product.weight : 0}
                onChange={onInputChange}
                required
            />
            <TextField
                margin="dense" label="Wattage (Watt)" id="wattage" type="number"
                value={product.wattage ? product.wattage : 0}
                onChange={onInputChange}
                required
            />
            <TextField
                margin="dense" label="Price" id="price" type="number"
                value={product.price ? product.price : 0}
                onChange={onInputChange}
                required
            />
            <TextField
                margin="dense" label="Stock" id="stock" type="number"
                value={product.stock ? product.stock : 0}
                onChange={onInputChange}
                required
            />

        </div>
    )
}

export default FormProductData
