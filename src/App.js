import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import './styles/App.scss'

//components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loading from './components/Loading'
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))


class App extends React.Component {
  render() {
    return (
      <div className="main">
        <Navbar />
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
          </Suspense>
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default App