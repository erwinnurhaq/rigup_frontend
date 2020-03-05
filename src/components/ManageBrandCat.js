import React from 'react'
import { useSelector } from 'react-redux'
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

import Loading from './Loading'
import TableHeadRow from './TableHeadRow'

function ManageBrandCat() {

    const mostParent = useSelector(({ categories }) => categories.mostParent)
    const brandCats = useSelector(({ brandCats }) => brandCats.brandCats)

    const columns = [
        { id: 'id', label: '#', minWidth: 50, align: 'center' },
        { id: 'maincategory', label: 'Main Category', minWidth: 100, align: 'center' },
        { id: 'brands', label: 'Brands', minWidth: 70, align: 'center' }
    ]

    const renderAllBrandCats = () => {
        if (mostParent && brandCats) {
            return mostParent.map((cat, idx) => (
                <TableRow key={cat.id}>
                    <TableCell align='center'>{idx + 1}</TableCell>
                    <TableCell>{cat.category}</TableCell>
                    <TableCell><ul>{brandCats.filter(i => i.categoryId === cat.id).map((i, index) => (<li key={index}>{i.brand}</li>))}</ul></TableCell>
                </TableRow>
            ))
        } else {
            return (
                <TableRow>
                    <TableCell><Loading /></TableCell>
                </TableRow>
            )
        }
    }

    return (
        <div className='brandCatContainer'>
            <div className="brandCatHeader">
                <h2>Assigned Brand Category</h2>
                <BrandingWatermarkIcon style={{ color: 'dimgray', fontSize: '24px' }} />
            </div>
            <Table>
                <TableHead>
                    <TableHeadRow columns={columns} />
                </TableHead>
                <TableBody>
                    {renderAllBrandCats()}
                </TableBody>
            </Table>
        </div>
    )
}

export default ManageBrandCat
