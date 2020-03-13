import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

function ModalConfirm(props) {
    const { show, setShow, title, cb, btnYes, btnNo } = props
    return (
        <Dialog open={show} onClose={() => setShow(!show)} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.children}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={() => setShow(!show)} >{btnNo || 'NO'}</Button>
                <Button variant='text' color='secondary' onClick={cb} >{btnYes || 'YES'}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalConfirm
