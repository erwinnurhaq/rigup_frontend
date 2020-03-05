import React from 'react'
import { withRouter } from 'react-router-dom'

class Home extends React.Component {

    state = {
        clicked: true
    }

    componentDidMount() {
        document.title = 'Home - RIGUP!'
    }

    onMouseOverSide = (e) => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return (
            <div className="homeContainer">
                <div
                    className={`leftContainer ${this.state.clicked ? `show` : ''}`}
                    onClick={() => this.props.history.push('/store')}
                >
                    <div className="title" onMouseOver={this.onMouseOverSide}>
                        <p>Take me to</p>
                        <div className="jumbo" >S T O R E</div>
                    </div>

                </div>
                <div
                    className={`rightContainer ${this.state.clicked ? '' : `show`}`}
                    onClick={() => this.props.history.push('/build')}
                >
                    <div className="title" onMouseOver={this.onMouseOverSide}>
                        <p>I'm ready to</p>
                        <div className="jumbo" >B U I L D</div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(Home)