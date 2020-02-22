import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import './styles/App.scss'
import { userKeepLogin } from './redux/actions'

//components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loading from './components/Loading'
const Test = lazy(() => import('./pages/Test'))
const Test2 = lazy(() => import('./pages/Test2'))
const Test3 = lazy(() => import('./pages/Test3'))
const Register = lazy(() => import('./pages/Register'))
const OnDevelopment = lazy(() => import('./pages/OnDevelopment'))
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))

//admin area
const ManageProduct = lazy(() => import('./pages/ManageProduct'))


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
            <Route path="/register" component={Register} />
            <Route path="/store" component={OnDevelopment} />
            <Route path="/build" component={OnDevelopment} />
            <Route path="/userprofile" component={OnDevelopment} />
            <Route path="/usercart" component={OnDevelopment} />
            <Route path="/usertransactions" component={OnDevelopment} />
            <Route path="/test" component={Test} />
            <Route path="/test2" component={Test2} />
            <Route path="/test3" component={Test3} />

            {/* admin area */}
            <Route path="/admindashboard" component={OnDevelopment} />
            <Route path="/productmanagement" component={ManageProduct} />

          </Suspense>
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default connect(null, { userKeepLogin })(App)