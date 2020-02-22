import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';

function ModalAddProduct(props) {
    const { show, setShow } = props
    return (
        <Dialog open={show} onClose={() => setShow(!show)} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth='lg'>
            <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
            {props.children}
        </Dialog>
    )
}

export default ModalAddProduct
