import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import './styles/App.scss'
import { userKeepLogin } from './redux/actions'

//components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loading from './components/Loading'
const OnDevelopment = lazy(() => import('./pages/OnDevelopment'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))


class App extends React.Component {

  componentDidMount() {
    this.props.userKeepLogin()
  }

  render() {
    return (
      <div className="main">
        <Navbar />
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route exact path="/" component={Home} />
            <Route path="/news" component={OnDevelopment} />
            <Route path="/promo" component={OnDevelopment} />
            <Route path="/login" component={Login} />
            <Route path="/store" component={OnDevelopment} />
            <Route path="/build" component={OnDevelopment} />
            <Route path="/admindashboard" component={OnDevelopment} />
            <Route path="/userprofile" component={OnDevelopment} />
            <Route path="/usercart" component={OnDevelopment} />
            <Route path="/usertransactions" component={OnDevelopment} />
          </Suspense>
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default connect(null, { userKeepLogin })(App)