import React, { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'

//material
import { Drawer, Hidden, AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

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
        minHeight: '7vh',
        backgroundColor: 'white',
        color: '#222',
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    appBarContent: {
        height: '7vh',
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
    drawerPaper: {
        width: drawerWidth,
    },
    label: {
        marginTop: theme.spacing(3)
    }
}))
//end material


function AdminNavbar(props) {

    const classes = useStyles()
    const { active, setActive, title, setTitle, pathLists } = props
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const onDrawerListClick = id => {
        let path = pathLists.filter(i => i.id === id)[0]
        setActive(id)
        setTitle(path.name)
        props.history.push(path.path)
    }

    return (
        <>
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
                        variant="temporary"
                        anchor='left'
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{ paper: classes.drawerPaper }}
                        ModalProps={{ keepMounted: true }}
                    >
                        <AdminSidebar
                            onDrawerListClick={onDrawerListClick}
                            active={active}
                        />
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{ paper: classes.drawerPaper }}
                        variant="permanent" anchor='left' open
                    >
                        <AdminSidebar
                            onDrawerListClick={onDrawerListClick}
                            active={active}
                        />
                    </Drawer>
                </Hidden>
            </nav>
        </>
    )
}

export default withRouter(AdminNavbar)
