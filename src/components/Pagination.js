import React from 'react'
import { IconButton, Select, MenuItem } from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'

function Pagination(props) {
    const { totalProduct, state, setState } = props

    const onSetLimit = e => setState({
        ...state,
        limit: e.target.value
    })
    const onFirstPageClick = () => setState({
        ...state,
        page: 1,
        offset: 0
    })
    const onPrevPageClick = () => setState({
        ...state,
        page: state.page -= 1,
        offset: state.offset -= state.limit
    })
    const onNextPageClick = () => setState({
        ...state,
        page: state.page += 1,
        offset: state.offset += state.limit
    })
    const onLastPageClick = () => setState({
        ...state,
        page: state.totalPage,
        offset: (state.totalPage - 1) * state.limit
    })

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', padding: '0 15px' }}>
                Total Product: {totalProduct}
            </div>
            <div style={{ fontSize: '14px', padding: '0 15px' }}>
                Limit Row:
                    </div>
            <Select
                value={state.limit}
                onChange={onSetLimit}
            >
                <MenuItem value={0} disabled>Limit:</MenuItem>
                {[5, 10, 15, 20, 25, 50].map(i => (
                    <MenuItem key={i} value={i} >{i}</MenuItem>
                ))}
            </Select>
            <IconButton
                onClick={onFirstPageClick}
                disabled={state.page === 1}
                aria-label="first page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                onClick={onPrevPageClick}
                disabled={state.page === 1}
                aria-label="previous page"
            >
                <KeyboardArrowLeft />
            </IconButton>
            <div style={{ fontSize: '14px', padding: '0 15px' }}>
                Page {state.page} of {state.totalPage}
            </div>
            <IconButton
                onClick={onNextPageClick}
                disabled={state.page === state.totalPage}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={onLastPageClick}
                disabled={state.page === state.totalPage}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>
        </div>
    )
}

export default Pagination
