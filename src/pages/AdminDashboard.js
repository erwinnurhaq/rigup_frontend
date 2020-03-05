import React, { useState, useEffect, lazy, Suspense } from 'react'
import { withRouter, Route } from 'react-router-dom'
import Loading from '../components/Loading'
import AdminNavbar from '../components/AdminNavbar'
import { makeStyles } from '@material-ui/core/styles'

const ManageProduct = lazy(() => import('./ManageProduct'))
const ManageBrandAndCategory = lazy(() => import('./ManageBrandAndCategory'))
const ManageUser = lazy(() => import('./ManageUser'))

const useStyles = makeStyles(theme => ({
    root: { display: 'flex' },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
}))

const AdminDashboard = (props) => {

    const classes = useStyles()
    const pathLists = [
        { id: 1, path: '/admindashboard/manageproduct', name: 'Manage Product', comp: ManageProduct },
        { id: 2, path: '/admindashboard/managebrandcategory', name: 'Manage Brand & Category', comp: ManageBrandAndCategory },
        { id: 3, path: '/admindashboard/manageuser', name: 'Manage User', comp: ManageUser },
        { id: 4, path: '/admindashboard/manageusersavedbuild', name: 'Manage User Saved Build', comp: ManageProduct },
        { id: 5, path: '/admindashboard/transactionhistory', name: 'Transaction History', comp: ManageProduct }
    ]
    const [active, setActive] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        document.title = 'Admin Dashboard - RIGUP!'
        let path = pathLists.filter(i => i.path.includes(props.location.pathname))
        setActive(path[0].id)
        setTitle(path[0].name)
    }, [pathLists, props.location.pathname])

    return (
        <div className={classes.root}>
            <AdminNavbar
                active={active}
                setActive={setActive}
                title={title}
                setTitle={setTitle}
                pathLists={pathLists}
            />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div>
                    <Suspense fallback={<Loading />}>
                        {pathLists.map(route => (
                            <Route path={route.path} component={route.comp} key={route.id} />
                        ))}
                    </Suspense>
                </div>
            </main>
        </div>
    )
}

export default withRouter(AdminDashboard)
