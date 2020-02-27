import React from 'react'
import { TableRow, TableCell } from '@material-ui/core'

function TableHead({ columns }) {
    return (
        <TableRow >
            {columns.map(column => (

                <TableCell
                    key={column.id} align={column.align}
                    style={{ minWidth: column.minWidth }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    )
}

export default TableHead
