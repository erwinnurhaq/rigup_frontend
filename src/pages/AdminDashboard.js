import React, { useState, useEffect, lazy, Suspense } from 'react'
import { withRouter, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../components/Loading'
import AdminNavbar from '../components/AdminNavbar'
import { makeStyles } from '@material-ui/core/styles'
import { selectCat } from '../redux/actions';

const ManageProduct = lazy(() => import('./ManageProduct'))
const ManageBrandAndCategory = lazy(() => import('./ManageBrandAndCategory'))
const ManageUser = lazy(() => import('./ManageUser'))
const ManageTransaction = lazy(() => import('./ManageTransaction'))
const ManageHistory = lazy(() => import('./ManageHistory'))

const useStyles = makeStyles(theme => ({
    root: { display: 'flex' },
    content: {
        flexGrow: 1
    },
    contentWrapper: {
        width: '100%',
        minHeight: '100vh'
    },
    toolbar: theme.mixins.toolbar,
}))

const AdminDashboard = (props) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const pathLists = [
        { id: 1, path: '/admindashboard/manageproduct', name: 'Manage Product', comp: ManageProduct },
        { id: 2, path: '/admindashboard/managebrandcategory', name: 'Manage Brand & Category', comp: ManageBrandAndCategory },
        { id: 3, path: '/admindashboard/manageuser', name: 'Manage User', comp: ManageUser },
        { id: 4, path: '/admindashboard/managetransactions', name: 'Active Transaction', comp: ManageTransaction },
        { id: 5, path: '/admindashboard/managehistory', name: 'History', comp: ManageHistory }
    ]
    const [active, setActive] = useState('')
    const [title, setTitle] = useState('')
    const user = useSelector(({ user }) => user.user)
    const userLoading = useSelector(({ user }) => user.loading)

    useEffect(() => {
        document.title = 'Admin Dashboard - RIGUP!'
        let path = pathLists.filter(i => i.path.includes(props.location.pathname))
        setActive(path[0].id)
        setTitle(path[0].name)
        dispatch(selectCat(1))
    }, [pathLists, props.location.pathname])

    if (!user && userLoading) {
        return (<Loading />)
    } else {
        if (user && user.roleId === 1) {
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
                        <div className={classes.contentWrapper}>
                            <Suspense fallback={<Loading />}>
                                {pathLists.map(route => (
                                    <Route path={route.path} component={route.comp} key={route.id} />
                                ))}
                            </Suspense>
                        </div>
                    </main>
                </div>
            )
        } else {
            return (<Redirect to='/' />)
        }
    }
}

export default withRouter(AdminDashboard)
