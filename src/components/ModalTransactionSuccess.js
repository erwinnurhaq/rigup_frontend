import React from 'react';
import { useSelector } from 'react-redux'
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

function ModalTransactionSuccess(props) {
    const { show, title, cbYes, cbNo, btnYes, btnNo, imgFileHandler } = props
    const { receiptImg } = useSelector(({ userTransaction }) => userTransaction)

    return (
        <Dialog open={show} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="md">
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <div className='transactionSuccessContainer'>
                <p>Please confirm your payment and include your transaction receipt</p>
                <div className='transactionSuccessWrapper'>
                    <div className='bankContainer'>
                        <img src={require('../img/logoMandiri.png')} alt='mandiri' />
                        <div>
                            <p>Bank Mandiri</p>
                            <p>PT. RIGUP INDONESIA</p>
                            <h3>0700 000 899 992</h3>
                        </div>
                    </div>
                    <div className='bankContainer'>
                        <img src={require('../img/logoBCA.png')} alt='bca' />
                        <div>
                            <p>Bank BCA</p>
                            <p>PT. RIGUP INDONESIA</p>
                            <h3>731 025 2527</h3>
                        </div>
                    </div>
                    <div className='bankContainer'>
                        <img src={require('../img/logoBNI.png')} alt='bni' />
                        <div>
                            <p>Bank BNI</p>
                            <p>PT. RIGUP INDONESIA</p>
                            <h3>023 827 2088</h3>
                        </div>
                    </div>
                </div>
                <div style={{ paddingTop: '40px' }}>
                    <Button variant="outlined" component="label">
                        Select Receipt File Image
                        <input
                            accept="image/*"
                            type="file"
                            name="image"
                            style={{ display: 'none' }}
                            onChange={imgFileHandler}
                        />
                    </Button>
                    <p>{receiptImg ? 'File Image Selected' : ''}</p>
                </div>
            </div>
            <DialogActions>
                <Button variant='text' onClick={cbNo} >{btnNo || 'NO'}</Button>
                <Button variant='text' color='secondary' onClick={cbYes} >{btnYes || 'YES'}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalTransactionSuccess
