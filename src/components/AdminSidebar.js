import React from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { userLogout } from '../redux/actions'

import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import HistoryIcon from '@material-ui/icons/History'
import SaveIcon from '@material-ui/icons/Save'
import ShopTwoIcon from '@material-ui/icons/ShopTwo'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'


const useStyles = makeStyles(theme => ({
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


const AdminSidebar = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { active, onDrawerListClick } = props
    const onLogoutClick = async () => {
        await dispatch(userLogout())
        props.history.push('/')
    }
    return (
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
                            <SaveIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary='User Saved Builds' />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button
                        className={active === 5 ? classes.listItemB : classes.listItemA}
                        onClick={() => onDrawerListClick(5)}>
                        <ListItemIcon>
                            <ShopTwoIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary='Active Transactions' />
                    </ListItem>
                    <ListItem button
                        className={active === 6 ? classes.listItemB : classes.listItemA}
                        onClick={() => onDrawerListClick(6)}>
                        <ListItemIcon>
                            <HistoryIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary='History' />
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
}

export default withRouter(AdminSidebar)
