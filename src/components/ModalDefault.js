import React from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';

function ModalDefault(props) {
    const { show, setShow, title } = props
    return (
        <Dialog open={show} onClose={() => setShow(!show)} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth='md'>
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            {props.children}
        </Dialog>
    )
}

export default ModalDefault
