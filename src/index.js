import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Header} from './Components/index.js'
import './globals.scss'

class App extends Component {
    constructor(...args) {
        super(...args)  
    }
render() {
    return (
        <div className="container-fluid">
 <Header/>
</div>
    )
}
}

ReactDOM.render(<App />, document.getElementById('app') )