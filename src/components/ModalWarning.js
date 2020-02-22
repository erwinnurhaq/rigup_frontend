import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

function ModalWarning(props) {
    const { show, setShow } = props
    return (
        <Dialog open={show} onClose={setShow} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Warning</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.children}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={setShow} >OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalWarning
