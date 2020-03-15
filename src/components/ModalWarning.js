import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

function ModalWarning(props) {
    const { show, setShow, title, size } = props
    return (
        <Dialog open={show} onClose={() => setShow(!show)} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={size || "sm"}>
            <DialogTitle id="form-dialog-title">{title || 'Warning'}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.children}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='text' onClick={() => setShow(!show)} >OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalWarning
