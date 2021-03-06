import React from 'react'
import ReactDOM from 'react-dom'
import fastclick from 'fastclick'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'


fastclick.attach(document.body)
ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

window.oncontextmenu = function(event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}