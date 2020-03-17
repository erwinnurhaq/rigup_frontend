import { Switch, Route } from 'react-router-dom'
import React, { lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import './styles/App.scss'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'

//redux actions
import { userKeepLogin } from './redux/actions'

//components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loading from './components/Loading'

//public
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const Verification = lazy(() => import('./pages/Verification'))
const Verifying = lazy(() => import('./components/Verifying'))
const Store = lazy(() => import('./pages/Store'))
const OnDevelopment = lazy(() => import('./pages/OnDevelopment'))
const UserDashboard = lazy(() => import('./pages/UserDashboard'))
const InfoPayment = lazy(() => import('./pages/InfoPayment'))
const InfoDelivery = lazy(() => import('./pages/InfoDelivery'))
const InfoSupport = lazy(() => import('./pages/InfoSupport'))
const InfoAbout = lazy(() => import('./pages/InfoAbout'))
const InfoCareer = lazy(() => import('./pages/InfoCareer'))
const InfoPrivacyPolicy = lazy(() => import('./pages/InfoPrivacyPolicy'))

//admin area
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Barlow Semi Condensed, Poppins, Roboto, Arial',
    htmlFontSize: 10
  }
})

class App extends React.Component {

  componentDidMount() {
    this.props.userKeepLogin()
    // let mainCursor = this.refs.mainCursor
    // window.addEventListener('mousemove', (e) => {
    //   mainCursor.style.top = e.pageY + 'px';
    //   mainCursor.style.left = e.pageX + 'px';
    // })
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove')
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="main">
          {/* <div className="mainCursor" ref="mainCursor" /> */}
          <Navbar />
          <Switch>
            <Suspense fallback={<Loading />}>
              <Route exact path="/" component={Home} />
              <Route path="/news" component={OnDevelopment} />
              <Route path="/promo" component={OnDevelopment} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/resetpassword/:usertoken" component={ResetPassword} />
              <Route path="/verification" component={Verification} />
              <Route path="/verifying/:usertoken" component={Verifying} />
              <Route path="/store" component={Store} />
              <Route path="/build" component={OnDevelopment} />
              <Route path="/userdashboard" component={UserDashboard} />
              <Route path="/infopayment" component={InfoPayment} />
              <Route path="/infodelivery" component={InfoDelivery} />
              <Route path="/infosupport" component={InfoSupport} />
              <Route path="/infoabout" component={InfoAbout} />
              <Route path="/infocareer" component={InfoCareer} />
              <Route path="/infoprivacypolicy" component={InfoPrivacyPolicy} />
              {/* admin area */}
              <Route path="/admindashboard" component={AdminDashboard} />
            </Suspense>
          </Switch>
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default connect(null, { userKeepLogin })(App)