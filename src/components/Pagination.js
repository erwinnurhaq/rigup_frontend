import React from 'react'
import { IconButton, Select, MenuItem } from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'

function Pagination(props) {
    const { totalProduct, limit, page, totalPage, onFirstPageClick, onPrevPageClick, onNextPageClick, onLastPageClick, onSetLimit } = props
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', padding: '0 15px' }}>
                Total Product: {totalProduct}
            </div>
            <div style={{ fontSize: '14px', padding: '0 15px' }}>
                Limit Row:
                    </div>
            <Select
                value={limit}
                onChange={onSetLimit}
            >
                <MenuItem value={0} disabled>Limit:</MenuItem>
                {[5, 10, 15, 20, 25, 50].map(i => (
                    <MenuItem key={i} value={i} >{i}</MenuItem>
                ))}
            </Select>
            <IconButton
                onClick={onFirstPageClick}
                disabled={page === 1}
                aria-label="first page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                onClick={onPrevPageClick}
                disabled={page === 1}
                aria-label="previous page"
            >
                <KeyboardArrowLeft />
            </IconButton>
            <div style={{ fontSize: '14px', padding: '0 15px' }}>
                Page {page} of {totalPage}
            </div>
            <IconButton
                onClick={onNextPageClick}
                disabled={page === totalPage}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={onLastPageClick}
                disabled={page === totalPage}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>
        </div>
    )
}

export default Pagination
