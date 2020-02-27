import React, { useState, useEffect, lazy, Suspense } from 'react'
import { withRouter, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Loading from '../components/Loading'

import { userLogout } from '../redux/actions'

//material
import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    InputLabel,
    FormLabel
} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/Inbox'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SaveIcon from '@material-ui/icons/Save'
import ShopTwoIcon from '@material-ui/icons/ShopTwo'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const drawerWidth = 280
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0
        },
    },
    appBar: {
        backgroundColor: 'white',
        color: '#222',
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    appBarContent: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    appBarContentLeft: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            alignItems: 'center'
        }
    },
    appBarContentRight: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    label: {
        marginTop: theme.spacing(3)
    },
    drawerContent: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#222',
        color: 'white'
    },
    drawerIcon: {
        color: 'white'
    },
    divider: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    listItemA: {
        '&:hover': {
            background: "darkviolet",
        }
    },
    listItemB: {
        background: "darkviolet",
        '&:hover': {
            background: "darkviolet",
        }
    }
}))
//end material

const ManageProduct = lazy(() => import('./ManageProduct'))
const ManageBrandAndCategory = lazy(() => import('./ManageBrandAndCategory'))

const AdminDashboard = (props) => {

    const classes = useStyles()
    const theme = useTheme()
    const dispatch = useDispatch()

    const pathLists = [
        { id: 1, path: '/admindashboard/manageproduct', name: 'Manage Product' },
        { id: 2, path: '/admindashboard/managebrandcategory', name: 'Manage Brand & Category' },
        { id: 3, path: '/admindashboard/manageuser', name: 'Manage User' },
        { id: 4, path: '/admindashboard/manageusercart', name: 'Manage User Cart' },
        { id: 5, path: '/admindashboard/manageusersavedbuild', name: 'Manage User Saved Build' },
        { id: 6, path: '/admindashboard/transactionhistory', name: 'Transaction History' }
    ]

    const [active, setActive] = useState('')
    const [title, setTitle] = useState('')
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        setActive(pathLists[0].id)
        setTitle(pathLists[0].name)
        props.history.push(pathLists[0].path)
    }, [])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const onDrawerListClick = id => {
        let path = pathLists.filter(i => i.id === id)[0]
        setActive(id)
        setTitle(path.name)
        props.history.push(path.path)
    }

    const onLogoutClick = async () => {
        await dispatch(userLogout())
        props.history.push('/')
    }

    const drawer = (
        <div className={classes.drawerContent}>
            <div>
                <List>
                    <ListItem button className={classes.listItemA}
                        onClick={() => props.history.push('/')} >
                        <ListItemIcon><ArrowBackIosIcon style={{ color: 'white' }} /></ListItemIcon>
                        <ListItemText primary='Back to Home' />
                    </ListItem>
                </List>
                <Divider className={classes.divider} />
                <List>
                    <ListItem button
                        className={active === 1 ? classes.listItemB : classes.listItemA}
                        onClick={() => onDrawerListClick(1)}>
                        <ListItemIcon>
                            <LocalMallIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary='Products' />
                    </ListItem>
                    <ListItem button
                        className={active === 2 ? classes.listItemB : classes.listItemA}
                        onClick={() => onDrawerListClick(2)}>
                        <ListItemIcon>
                            <BrandingWatermarkIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary='Brands &amp; Categories' />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button
                        className={active === 3 ? classes.listItemB : classes.listItemA}
                        onClick={() => onDrawerListClick(3)}>
                        <ListItemIcon>
                            <PeopleAltIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary='User Lists' />
                    </ListItem>
                    <ListItem button
                        className={active === 4 ? classes.listItemB : classes.listItemA}
                        onClick={() => onDrawerListClick(4)}>
                        <ListItemIcon>
                            <ShoppingCartIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary='User Carts' />
                    </ListItem>
                    <ListItem button
                        className={active === 5 ? classes.listItemB : classes.listItemA}
                        onClick={() => onDrawerListClick(5)}>
                        <ListItemIcon>
                            <SaveIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary='User Saved Builds' />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button
                        className={active === 6 ? classes.listItemB : classes.listItemA}
                        onClick={() => onDrawerListClick(6)}>
                        <ListItemIcon>
                            <ShopTwoIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary='Transaction History' />
                    </ListItem>
                </List>
            </div>
            <div>
                <Divider className={classes.divider} />
                <List>
                    <ListItem button className={classes.listItemA}
                        onClick={onLogoutClick}>
                        <ListItemIcon>
                            <ExitToAppIcon style={{ color: 'white', transform: 'rotateY(180deg)' }} />
                        </ListItemIcon>
                        <ListItemText primary='Log Out' />
                    </ListItem>
                </List>
            </div>
        </div>
    )

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.appBarContent}>
                    <div className={classes.appBarContentLeft} >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Admin Dashboard
                        </Typography>
                    </div>
                    <div className={classes.appBarContentRight}>
                        <Typography variant="h6" noWrap>
                            {title}
                        </Typography>
                    </div>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                        // container={container}
                        variant="temporary"
                        anchor='left'
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{ paper: classes.drawerPaper }}
                        ModalProps={{ keepMounted: true }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{ paper: classes.drawerPaper }}
                        variant="permanent" anchor='left' open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div>
                    <Suspense fallback={<Loading />}>
                        <Route path="/admindashboard/manageproduct" component={ManageProduct} />
                        <Route path="/admindashboard/managebrandcategory" component={ManageBrandAndCategory} />
                    </Suspense>
                </div>
            </main>
        </div>
    )
}

export default withRouter(AdminDashboard)
