import React, { useState, useEffect, lazy, Suspense } from 'react'
import { withRouter, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { Button } from '@material-ui/core'

const UserProfile = lazy(()=> import('../components/UserProfile'))
const UserCart = lazy(()=> import('../components/UserCart'))
const UserTransaction = lazy(()=> import('../components/UserTransaction'))

const UserDashboard = (props) => {

    const sideBarList = [
        { id: 1, path: '/userdashboard/profile', name: 'My Profile', component: UserProfile, shortTitle: 'P R O F I L E'},
        { id: 2, path: '/userdashboard/cart', name: 'My Cart', component: UserCart, shortTitle: 'C A R T'},
        { id: 3, path: '/userdashboard/transaction', name: 'My Transaction', component: UserTransaction, shortTitle: 'T R A N S'}
    ]
    const [active, setActive] = useState('')
    const [title, setTitle] = useState('')
    const [shortTitle, setShortTitle] = useState('')
    const user = useSelector(({ user }) => user.user)

    useEffect(() => {
        document.title = 'User Dashboard - RIGUP!'
        let path = sideBarList.filter(i => i.path.includes(props.location.pathname))
        setActive(path[0].id)
        setTitle(path[0].name)
        setShortTitle(path[0].shortTitle)
    }, [sideBarList, props.location.pathname])

    const renderListSideBar = () => sideBarList.map(i=> (
        <Button
            variant='text' key={i.id}
            style={active===i.id? {backgroundColor: 'darkviolet'}: null}
            onClick={()=>props.history.push(i.path)} 
        >
            {i.name}
        </Button>
    ))

    if (!user || user.verified !== 1) {
        return <Redirect to='/' />
    }
    return (
        <div className="userDashboardContainer">
            <div className="title">{shortTitle}</div>
            <div className="sideBarContainer">
                <h3>USER DASHBOARD</h3>
                <div className="sideBarWrapper">
                    {renderListSideBar()}
                </div>
            </div>
            <div className="userDashboardContentContainer">
                <h3>{title}</h3>
                <div className="userDashboardContentWrapper">
                    <Suspense fallback={<Loading />}>
                        {sideBarList.map(route => (
                            <Route path={route.path} component={route.component} key={route.id} />
                        ))}
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default withRouter(UserDashboard)
